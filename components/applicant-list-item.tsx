"use client";

import { Applicant, User } from "@prisma/client";
import Image from "next/image";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { ApplcicantWithUser } from "@/type";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import toast from "react-hot-toast";

const ApplicantListItem = ({
  applicant,
  onClickAccepted,
}: {
  applicant: ApplcicantWithUser;
  onClickAccepted: (id: string) => void;
}) => {
  const supabase = createClientComponentClient()
  const score = Math.round(applicant.score * 100)

  const getColor = (score: number) => {
    if(score <= 30){
      return "bg-red-500"
    }
    else if(score > 30 && score <= 60){
      return "bg-yellow-500"
    }
    else{
      return "bg-green-500"
    }
  }

  // const onClickResume = async () => {
  //   const bucket_name = "resume"
  //   const {data, error} =  await supabase.storage.from(bucket_name).download(applicant.user.resume!)
  //   if(error){
  //     toast.error("Failed to donwload resume")
  //   }
  //   else{
  //     const file = new File([data], applicant.userId)
  //     file.save()
  //   }
    
  // }
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
      <div className="w-[100px] md:w-[150px] lg:w-[200px] h-[10px] bg-slate-300 rounded-3xl">
        <div
          className={`h-full w-[${score}%] ${getColor(score)} rounded-3xl`}
        />
      </div>
      <div className="flex items-center gap-x-2 flex-row">
        <Button className="bg-white border border-[#014DA1] font-semibold rounded-[8px] text-[#014DA1] hover:bg-white hover:opacity-80 w-fit transition">
          Resume <Download className="w-4 h-4 ml-1" />
        </Button>
        <Button className="bg-[#014DA1] text-white font-semibold hover:bg-[#014DA1] hover:opacity-80 transition">Approve</Button>
      </div>
    </div>
  );
};
export default ApplicantListItem;
