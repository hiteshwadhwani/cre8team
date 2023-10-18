"use client";

import { Applicant, User } from "@prisma/client";
import Image from "next/image";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { ApplcicantWithUser } from "@/type";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import React, { useEffect } from "react";
import { Progress } from "./ui/progress";

interface ApplicantListItemProps {
  applicant: ApplcicantWithUser;
  onClickAccepted: (id: string) => void;
}

const ApplicantListItem = ({
  applicant,
  onClickAccepted,
}: ApplicantListItemProps) => {
  const supabase = createClientComponentClient();
  const score = Math.round(applicant.score * 100);
  const getWidth = (score: number) => {
    return `w-[${score}%]`;
  };

  const getColor = (score: number) => {
    if (score <= 30) {
      return "#FF4E4E";
    } else if (score > 30 && score <= 60) {
      return "#ffe836";
    } else {
      return "#52BB00";
    }
  };

  const getClass = () => {
    return `h-full ${getWidth(score)} ${getColor(score)} rounded-3xl`;
  };

  const onClickResume = async () => {
    const bucket_name = "resume";
    const { data, error } = await supabase.storage
      .from(bucket_name)
      .download(applicant.user.resume!);
    if (error) {
      toast.error("Failed to donwload resume");
    } else {
      const url = URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${applicant.user.name}.pdf` || "resume.pdf";

      document.body.appendChild(link);
      link.click();
    }
  };


  return (
    <div className="w-full flex justify-between items-center flex-row">
      <div className="flex items-center gap-x-2 flex-row">
        <Image
          src={applicant.user.imageUrl || "/public/people.png"}
          alt="user image"
          width={36}
          height={36}
          className="rounded-full"
        />
        <p className="text-[14px] font-semibold">{applicant.user.name}</p>
      </div>
      <div className="w-[100px] md:w-[150px] lg:w-[200px] h-[10px] bg-[#D9D9D9] rounded-3xl">
        <div
          id="progress-bar"
          style={{
            height: "100%",
            borderRadius: "24px",
            width: score + "%",
            backgroundColor: getColor(score),
          }}
        />
      </div>
      {/* <Progress value={score}  /> */}
      <div className="flex items-center gap-x-2 flex-row">
        <Button
          onClick={onClickResume}
          className="bg-white border border-[#014DA1] font-semibold rounded-[8px] text-[#014DA1] hover:bg-white hover:opacity-80 w-fit transition"
        >
          Resume <Download className="w-4 h-4 ml-1" />
        </Button>
        <Button
          onClick={() => onClickAccepted(applicant.id)}
          disabled={applicant.accepted}
          className={cn(applicant.accepted ? "bg-white text-[#52BB00] border border-[#52BB00] hover:bg-white" : "bg-[#014DA1] text-white hover:bg-[#014DA1]", "font-semibold hover:opacity-80 transition")}
        >
          {applicant.accepted ? "Approved" : "Approve"}
        </Button>
      </div>
    </div>

  );
};
export default ApplicantListItem;
