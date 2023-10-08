import {
  ProjectWithApplicantsWithRequirementsWithTech,
  ProjectWithUserWithRequirementsWithTech,
} from "@/type";
import React from "react";
import { Button } from "./ui/button";
import { useProjectPageCard } from "@/hooks/use-card";
import Image from "next/image";
import { useUser } from "@/hooks/use-user";
import toast from "react-hot-toast";

export default function ProjectCard({
  project,
}: {
  project: ProjectWithUserWithRequirementsWithTech;
}) {
  const userData = useUser()
  const { setOpen, isOpen } = useProjectPageCard();
  const onClickProject = () => {
    if (!isOpen) {
      setOpen(project);
    }
  };
  const onClickInterested = () => {
    if(!userData?.session){
      toast.error('login to continue')
    }
    else if(userData.profile && !userData.profile.profileCompleted){
      toast.error('complete your profile to apply')
    }
    else{
      toast.success('applied')
    }
  }

  return (
    <div className="min-h-[320px] rounded-[20px] border border-[#ECECEC] hover:bg-[#F4FAFF] transition py-6 px-5 flex flex-col gap-y-2 justify-between">
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
        <div className="flex gap-x-2 gap-y-1 mt-2 flex-wrap">
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
          <Button disabled={userData?.loading} onClick={onClickInterested} className="text-white bg-[#014DA1] text-[16px] font-semibold hover:bg-[#014DA1] w-[149px] h-full hover:opacity-80 transition">
            Interested
          </Button>
        </div>
      </div>
    </div>
  );
}
