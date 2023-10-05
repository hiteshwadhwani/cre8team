import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "../ui/modal";
import useModal from "@/hooks/use-modal";

const ProfilePage = () => {
    const {isOpen, type, setClose} = useModal()
  const { register, handleSubmit, reset } = useForm();

  const [email, setEmail] = useState("kalashjain54@gmail.com");
  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [resume, setResume] = useState(null);

  const handleUploadProfileImage = (e: any) => {
    setProfileImage(e.target.files[0]);
  };

  const onSubmit = () => {
    reset();
  };

  return (
    <Modal isOpen={isOpen && type === 'profile-modal'} onClose={setClose}>
    <div>
      <div className="max-w-md mx-auto mt-8">
        <h1 className="text-3xl font-semibold mb-4">Profile Form</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 ">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: true })}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-200 cursor-not-allowed "
              value={email}
              disabled
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: true })}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-200"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="profileImage" className="block text-gray-600">
              Profile Image
            </label>
            <input
              type="file"
              id="profileImage"
              {...register("profileImage")}
              accept="image/*"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-200"
              onChange={handleUploadProfileImage}
            />

            {profileImage && (
              <Image
                src={URL.createObjectURL(profileImage)}
                alt="Profile Image"
                className="w-20 h-20 rounded-full"
              />
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="resume" className="block text-gray-600">
              Resume
            </label>
            <input
              type="file"
              id="resume"
              {...register("resume")}
              accept=".pdf"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-200"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
    </Modal>
  );
};

export default ProfilePage;
