import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "../ui/modal";
import useModal from "@/hooks/use-modal";
import { BiCloudUpload, BiTrash, BiFileBlank } from "react-icons/bi"; // Import the react-icons library

const ProfilePage: React.FC = () => {
  const { isOpen, type, setClose } = useModal();
  const { register, handleSubmit, reset } = useForm();

  const [email, setEmail] = useState<string>("kalashjain54@gmail.com");
  const [name, setName] = useState<string>("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [resume, setResume] = useState<File | undefined>(undefined);

  const handleUploadProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleDeleteProfileImage = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the click event from propagating
    setProfileImage(null);
  };

  const handleUploadResume = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setResume(e.target.files[0]);
    }
  };

  const handleDeleteResume = () => {
    setResume(undefined);
  };

  const handleImageDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setProfileImage(e.dataTransfer.files[0]);
    }
  };

  const handleResumeDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setResume(e.dataTransfer.files[0]);
    }
  };

  const onSubmit = () => {
    reset();
  };

  return (
    <Modal isOpen={isOpen && type === "profile-modal"} onClose={setClose}>
      <div>
        <div className="max-w-md mx-auto mt-8">
          <h1 className="text-3xl font-semibold mb-4">Profile Form</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600">
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
              <label
                htmlFor="profileImage"
                className="w-full px-4 py-2 cursor-pointer text-center"
                onDragOver={handleImageDrop}
                onDrop={handleImageDrop}
              >
                {profileImage ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={URL.createObjectURL(profileImage)}
                      alt="Profile Image"
                      className="w-20 h-20 rounded-full mb-2"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center border-dashed border-2 border-black">
                    <BiCloudUpload size={32} />
                    <span>Drag & Drop or Click to Upload</span>
                  </div>
                )}
              </label>
              {profileImage ? (
                <span className="flex justify-center items-center">
                  <button
                    type="button"
                    onClick={handleDeleteProfileImage}
                    className="text-red-600 hover:text-red-800"
                  >
                    <BiTrash size={20} />
                  </button>
                </span>
              ) : (
                ""
              )}
              <input
                type="file"
                id="profileImage"
                {...register("profileImage")}
                accept="image/*"
                className="hidden"
                onChange={handleUploadProfileImage}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="resume" className="block text-gray-600">
                Resume
              </label>
              <label
                htmlFor="resume"
                className="w-full px-4 py-2 cursor-pointer text-center"
                onDragOver={handleResumeDrop}
                onDrop={handleResumeDrop}
              >
                {resume ? (
                  <div className="flex flex-col items-center">
                    <BiFileBlank size={32} />
                    <span>{resume.name}</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center border-dashed border-2 border-black">
                    <BiCloudUpload size={32} />
                    <span>Drag & Drop or Click to Upload Resume (PDF only)</span>
                  </div>
                )}
              </label>
              {resume ? (
                <span className="flex justify-center items-center">
                  <button
                    type="button"
                    onClick={handleDeleteResume}
                    className="text-red-600 hover:text-red-800"
                  >
                    <BiTrash size={20} />
                  </button>
                </span>
              ) : (
                ""
              )}
              <input
                type="file"
                id="resume"
                {...register("resume")}
                accept=".pdf"
                className="hidden"
                onChange={handleUploadResume}
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
