import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import client from "@/lib/db";
import ProjectClient from "./project-client";

export const dynamic = "force-dynamic";

interface SearchProps{
  searchParams: {
    search: string
  }
}

const Project = async ({searchParams}: SearchProps) => {
  // get the user made projects
  const projects = await client.project.findMany({
    where: {
      OR: [
        {
          title: {
            contains: searchParams.search
          }
        },
        {
          description: {
            contains: searchParams.search
          }
        },
        {
          techs: {
            some: {
              name: {
                contains: searchParams.search
              }
            }
          }
        }
      ],
    },
    include: {
      requirements: true,
      techs: true,
      user: true,
    },
  });
  return <ProjectClient projects={projects}/>;
};
export default Project;
