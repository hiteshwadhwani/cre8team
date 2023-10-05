import React from "react";
import { LuNetwork } from "react-icons/lu";
import { FiMessageSquare } from "react-icons/fi";


const ServiceCard = () => {
  return (
    <div className="flex flex-col xl:flex-row md:m-4 items-center justify-center">
      <div className="h-full w-full bg-[#f8fbff] shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] p-5 px-12 m-6 text-center flex flex-col items-center justify-center hover:bg-[#ffffff] rounded-xl cursor-pointer ">
        <LuNetwork size="80" className="text-blue-500" />
        <div>Lorem Ipsum ki ma</div>
      </div>
      <div className="h-full w-full bg-[#f8fbff] shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] p-5 px-12 m-6 text-center flex flex-col items-center justify-center hover:bg-[#ffffff] rounded-xl cursor-pointer ">
        <LuNetwork size="80" className="text-blue-500" />
        <div>Lorem Ipsum ki ma</div>
      </div>
      <div className="h-full w-full bg-[#f8fbff] shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] p-5 px-12 m-6 text-center flex flex-col items-center justify-center hover:bg-[#ffffff] rounded-xl cursor-pointer ">
        <LuNetwork size="80" className="text-blue-500" />
        <div>Lorem Ipsum ki ma</div>
      </div>
      <div className="h-full w-full bg-[#f8fbff] shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] p-5 px-12 m-6 text-center flex flex-col items-center justify-center hover:bg-[#ffffff] rounded-xl cursor-pointer ">
        <FiMessageSquare size="80" className="text-blue-500" />
        <div>Lorem Ipsum ki ma</div>
      </div>
    </div>
  );
};

export default ServiceCard;
