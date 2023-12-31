"use client";

import {useDashboardPageCard} from "@/hooks/use-card";
import Modal from "@/components/ui/modal";
import { Dot, Frown } from "lucide-react";
import ApplicantListItem from "../applicant-list-item";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const ProjectDetails = () => {
  const router = useRouter()
  const { isOpen, data, setClose } = useDashboardPageCard();
  const NoApplicants = () => (
    <p className="text-[#747474] leading-[28px] text-[14px] text-center flex items-center flex-row">
        No Applicants <Frown className="h-4 w-4 ml-1" />
    </p>
  )

  const onClickAccepted = async (applicant_id: string) => {
    try{
      const res = await axios.post("/api/accept-user", {
        project_id: data?.id,
        applicant_id: applicant_id
      })
      toast.success("user accepted")
      router.refresh()
    }
    catch(error){
      console.log(error)
      toast.error("Something went wrong")
    }
      

  }
  const ShowApplicants = () => (
    <div>
        {data?.applicants.map((item) => (
            <ApplicantListItem key={item.id} applicant={item} onClickAccepted={onClickAccepted} />
          ))}
    </div>
  )
  return (
    <Modal title="Project Details" className="max-h-[500px] overflow-y-auto max-w-fit" isOpen={isOpen} onClose={setClose}>
      <div className="flex flex-col gap-y-4">
        <h2 className="text-[20px] font-semibold uppercase">{data?.title}</h2>
        <div>
          <h4 className="text-[12px] uppercase mb-1">description</h4>
          <p className="text-[#747474] leading-[28px] text-[14px]">
            {data?.description}
          </p>
        </div>
        <div>
          <h4 className="text-[12px] uppercase mb-1">requirements</h4>
          <ul>
            {data?.requirements.map((item) => (
              <li
                key={item.id}
                className="text-[#747474] leading-[28px] text-[14px] flex flex-row items-center"
              >
                {" "}
                <Dot className="h-4 w-4" /> {item.text}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-row gap-x-[10px]">
          {data?.techs.map((tech) => (
            <div
              key={tech.id}
              className="px-[10px] py-[5px] text-[#49A8FF] rounded-[50px] bg-[#49A8FF21] text-[12px] font-medium"
            >
              {tech.name}
            </div>
          ))}
        </div>
        <div>
          <h4 className="text-[12px] uppercase mb-1">Applicants</h4>
          {
            data?.applicants.length === 0 ? (
                <NoApplicants />
            ) : (
                <ShowApplicants />
            )
          }
        </div>
      </div>
    </Modal>
  );
};
export default ProjectDetails;
