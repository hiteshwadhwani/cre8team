import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import client from "@/lib/db";
import DashboardClient from "./dashboard-client";

export const dynamic = "force-dynamic";

interface SearchProps {
  searchParams: {
    search: string;
  };
}

const Dashboard = async ({ searchParams }: SearchProps) => {
  const supabase = createServerComponentClient({ cookies });

  // check if the user exist
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // if user does not exist redirect to project page
  if (!user) {
    return redirect("/projects");
  }

  // get the user
  const userProfile = await client.user.findUnique({
    where: {
      authId: user.id,
    },
  });

  if (!userProfile) {
    return redirect("/projects");
  }

  // get the user made projects
  // const projects = await client.project.findMany({
  //     where: {
  //         userId: userProfile.id,
  //     },
  //     include: {
  //         applicants: true,
  //         requirements: true,
  //         techs: true
  //     }
  // })

  const projects = await client.project.findMany({
    where: {
      userId: userProfile.id,
      OR: [
        {
          title: {
            contains: searchParams.search,
          },
        },
        {
          description: {
            contains: searchParams.search,
          },
        },
        {
          techs: {
            some: {
              name: {
                contains: searchParams.search,
              },
            },
          },
        },
      ],
    },
    include: {
      applicants: {
        include: {
          user: true
        }
      },
      requirements: true,
      techs: true,
    },
  });

  return <DashboardClient projects={projects} />;
};
export default Dashboard;
