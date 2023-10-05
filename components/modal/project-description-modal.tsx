import React from "react";
import Modal from "@/components/ui/modal";
import { Dot } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useProjectPageCard } from "@/hooks/use-card";

const ProjctDescription = () => {
  const { isOpen, data, setClose } = useProjectPageCard();
  return (
    <Modal title="Project Details" isOpen={isOpen} onClose={setClose}>
      <div className="flex flex-col gap-y-4">
        <h2 className="text-[20px] font-semibold uppercase">{data?.title}</h2>
       
          <h4 className="text-[12px] uppercase mb-1">description</h4>
          <div className="max-h-80 overflow-y-auto"> 
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
        <div className="flex justify-between mt-2">
          <div className="flex items-center flex-row gap-x-2">
            <Image
              src={data?.user.imageUrl || "/public/user.png"}
              alt="user image"
              className="rounded-full"
              width={43}
              height={43}
            />
            <p className="text-[16px] font-semibold">{data?.user.name}</p>
          </div>
          <Button className="text-white bg-[#014DA1] text-[16px] font-semibold hover:bg-[#014DA1] w-[149px] h-full hover:opacity-80 transition">
            Interested
          </Button>
        </div>
      </div>
    </Modal>
  );
};
export default ProjctDescription;
