"use client";

import Card from "@/components/card";
import { Button } from "@/components/ui/button";
import useModal from "@/hooks/use-modal";
import { ProjectWithApplicantsWithRequirementsWithTech } from "@/type";
import { Plus } from "lucide-react";
import React from "react";

interface DashboardClientProps {
  projects: ProjectWithApplicantsWithRequirementsWithTech[];
}

const DashboardClient: React.FC<DashboardClientProps> = ({ projects }) => {
  const { setOpen } = useModal();

  const NoProjectCreated = () => {
    return (
      <p className="flex items-center text-muted-foreground justify-center h-[50vh]">
        You have not created any post click on{" "}
        <span className="flex items-center bg-muted px-2 py-1 mx-1 rounded-lg">
          <Plus className="h-4 w-4" /> add post{" "}
        </span>
        to create a new one
      </p>
    );
  };
  const ShowProjects = () => {
    return (
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-[40px] gap-y-[40px]">
        {projects.map((project) => (
          <Card key={project.id} project={project} />
        ))}
      </div>
    );
  };
  return (
    <div>
      <Button
        onClick={() => setOpen("add-post")}
        className="flex flex-row gap-x-2 text-[#014DA1] border-2 bg-white border-[#014DA1] mx-auto text-[16px] rounded-[10px] mt-6 p-6 hover:bg-blue-50"
      >
        <Plus className="h-5 w-5" /> Add post
      </Button>
      {projects.length === 0 ? <NoProjectCreated /> : <ShowProjects />}
    </div>
  );
};

export default DashboardClient;
