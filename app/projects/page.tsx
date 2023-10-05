import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import client from "@/lib/db";
import ProjectClient from "./project-client";

export const dynamic = "force-dynamic";

const Project = async () => {
  const supabase = createServerComponentClient({ cookies });

  // check if the user exist
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // if user does not exist redirect to project page
  if (!user) {
    redirect("/projects");
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
  const projects = await client.project.findMany({
    include: {
      requirements: true,
      techs: true,
      user: true,
    },
  });
  return <ProjectClient projects={projects}/>;
};
export default Project;
