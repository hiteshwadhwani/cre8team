import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "../ui/modal";
import useModal from "@/hooks/use-modal";
import * as z from "zod"
 
const formSchema = z.object({
  email: z.string(),
  name: z.string(),
  imageUrl: z.string()
})

const ProfilePage = () => {
    const {isOpen, type, setClose} = useModal()

  return (
    <Modal isOpen={isOpen && type === 'profile-modal'} onClose={setClose}>
        <div>
            
        </div>
    </Modal>
  );
};

export default ProfilePage;
