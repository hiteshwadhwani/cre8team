import { ProjectWithApplicantsWithRequirementsWithTech } from "@/type";
import React from "react";
import { Button } from "./ui/button";
import { useDashboardPageCard } from "@/hooks/use-card";
import Image from "next/image";

export default function Card({
  project,
}: {
  project: ProjectWithApplicantsWithRequirementsWithTech;
}) {
  const { setOpen } = useDashboardPageCard();

  // Truncate description to 40 words and add "..." if it's longer
  const truncatedDescription =
    project.description.length > 300
      ? project.description.slice(0, 300) + "..."
      : project.description;

  return (
    <div className="rounded-[20px] border border-[#ECECEC] hover:bg-[#F4FAFF] transition py-6 px-5 flex flex-col h-[320px]">
      {/* Title */}
      <h2 className="text-[20px] font-semibold leading-[28px] cursor-pointer uppercase">
        {project.title}
      </h2>

      {/* Description */}
      <p className="text-[#747474] text-[12px] leading-[16px] flex-grow mt-2">
        {truncatedDescription}
      </p>

      {/* Technologies */}
      <div className="flex gap-x-2 gap-y-1 mt-2 flex-wrap">
        {project.techs.map((tech) => (
          <div
            key={tech.id}
            className="flex items-center px-2 py-1 text-[#49A8FF] rounded-[50px] bg-[#49A8FF21] text-[12px] font-medium"
          >
            {tech.name}
          </div>
        ))}
      </div>

      {/* View Applicants Button */}
      <Button
        onClick={() => {
          setOpen(project);
        }}
        className="text-white bg-[#014DA1] text-[12px] font-semibold hover:bg-[#014DA1] mt-auto hover:opacity-80 transition mt-4"
      >
        View Applicants
      </Button>
    </div>
  );
}
