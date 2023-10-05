import {
  ProjectWithApplicantsWithRequirementsWithTech,
  ProjectWithUserWithRequirementsWithTech,
} from "@/type";
import React from "react";
import { Button } from "./ui/button";
import { useProjectPageCard } from "@/hooks/use-card";
import Image from "next/image";

export default function ProjectCard({
  project,
}: {
  project: ProjectWithUserWithRequirementsWithTech;
}) {
  const { setOpen, isOpen } = useProjectPageCard();
  const onClickProject = () => {
    if (!isOpen) {
      setOpen(project);
    }
  };

  return (
    <div className="min-h-[320px] h-full rounded-[20px] border border-[#ECECEC] hover:bg-[#F4FAFF] transition py-6 px-5 flex flex-col gap-y-2 justify-between">
      <div>
        <div onClick={onClickProject} className="cursor-pointer">
          <h2 className=" mb-[5px] text-[20px] font-semibold leading-[28px] uppercase">
            {project.title}
          </h2>
          <p className="text-[#747474] text-[12px] leading-[28px]">
            {project.description.length > 300
              ? project.description.slice(0, 300) + "..."
              : project.description}
          </p>
        </div>
      </div>
      <div>
        <div className="flex flex-row gap-[10px] flex-wrap m-1">
          {project.techs.map((tech) => (
            <div
              key={tech.id}
              className="px-[10px] py-[5px] text-[#49A8FF] rounded-[50px] bg-[#49A8FF21] text-[12px] font-medium"
            >
              {tech.name}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          <div className="flex items-center flex-row gap-x-2">
            <Image
              src={project.user.imageUrl || "/public/user.png"}
              alt="user image"
              className="rounded-full"
              width={43}
              height={43}
            />
            <p className="text-[16px] font-semibold">{project.user.name}</p>
          </div>
          <Button className="text-white bg-[#014DA1] text-[16px] font-semibold hover:bg-[#014DA1] w-[149px] h-full hover:opacity-80 transition">
            Interested
          </Button>
        </div>
      </div>
    </div>
  );
}
