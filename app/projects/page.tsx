import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import client from "@/lib/db";
import ProjectClient from "./project-client";

export const dynamic = "force-dynamic";

const Project = async () => {
  const supabase = createServerComponentClient({ cookies });
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
