"use client";

import React from "react";
import Link from "next/link";
// import ServiceCard from "./ServiceCard";
// import IMG from "../../public/about.svg"
import { BsFacebook } from "react-icons/bs";
import { BsTelegram } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";

import {IoMdPeople} from "react-icons/io"
import people from "../../public/people.png"
import Image from "next/image";


function AboutPage() {
  return (
    <>
      <div className=" border-solid border-2 border-gray-100  mt-4 rounded-3xl">
        <div className="flex flex-col lg:flex-row">
          <div className="flex flex-col p-10  ">
             <div className="">
              <h1 className="text-3xl font-[600] text-[#0051A9]">About Us</h1>
              <div className="pt-4 ">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Laboriosam blanditiis deleniti unde rerum minus! Aliquid, sed
                dolorem. Enim voluptate quasi labore doloribus, adipisci
                exercitationem obcaecati quaerat ut voluptatibus sapiente
                doloremque. Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Facere nemo blanditiis, repellendus quam odit dolorum!
                Illo, enim quidem! Amet, quia deleniti. Sunt nesciunt minima rem
                asperiores tempore eligendi voluptate a. Velit rem, nostrum
                accusantium, hic repellendus laborum tempore ipsa, quidem
                temporibus est id. Facilis tenetur earum in ipsum provident
                quidem rem consequuntur nulla repellendus. Beatae cupiditate
                cumque aliquid ad reiciendis. Quibusdam delectus aspernatur nam
                magnam recusandae atque in libero veritatis fuga blanditiis
                error, animi a, laboriosam eos ad voluptatum placeat! Rem porro
            
              </div>
            </div>

            <div className="p-2 mt-10">
              <h1 className="text-2xl font-bold">Our Services</h1>
              <div>
                {/* <ServiceCard /> */}
              </div>
            </div>
          </div>

          {/* right component */}
          <div className="h-full xl:h-screen xl:ml-16 p-16 bg-[#F8FBFF] xl:rounded-r-3xl ">
            {/* icons */}

            <div className="flex flex-row space-x-5 mt-16 text-center justify-center ">
              <div className="p-2">
                {" "}
                <BsFacebook
                  size="30"
                  className="text-[#0671e0] hover:cursor-pointer  hover:text-blue-800"
                />{" "}
              </div>
              <div className="p-2">
                {" "}
                <BsInstagram size="30" className="text-[#0671e0]  hover:cursor-pointer hover:text-blue-800" />{" "}
              </div>
              <div className="p-2">
                {" "}
                <BsTelegram size="30" className="text-[#0671e0] hover:cursor-pointer  hover:text-blue-800" />{" "}
              </div>
            </div>
            <div className="text-center justify-center mt-6 text-blue-700 text-xl font-semibold ">
              Connect With us{" "}
            </div>

            <div className= "flex xl:mt-44 text-center justify-center ">
              <Image src={people} height={400} width={400} alt="none" />
            </div>
          </div>
        </div>
      </div>
    </>
  
  );
}

export default AboutPage;
