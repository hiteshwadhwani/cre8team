"use client";

import ProjectCard from "@/components/project-card";
import { useUser } from "@/hooks/use-user";
import { ProjectWithUserWithRequirementsWithTechWithApplicants } from "@/type";
import { Plus } from "lucide-react";
import React from "react";

interface ProjectClientProps {
  projects: ProjectWithUserWithRequirementsWithTechWithApplicants[];
}

const ProjectClient: React.FC<ProjectClientProps> = ({ projects }) => {
  const userData = useUser();
  const filteredProjects = projects.filter(
    (project) => project.userId !== userData?.profile?.id
  );

  const NoProjectCreated = () => {
    return (
      <p className="flex items-center text-muted-foreground justify-center h-[50vh]">
        No projects to show
      </p>
    );
  };
  const ShowProjects = () => {
    return (
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[40px] gap-y-[40px]">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    );
  };

  return (
    <div>{filteredProjects.length === 0 ? <NoProjectCreated /> : <ShowProjects />}</div>
  );
};
export default ProjectClient;
