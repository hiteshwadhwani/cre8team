"use client";

import Modal from "@/components/ui/modal";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import useModal from "@/hooks/use-modal";


const AddPost = () => {
  const { isOpen, setClose, type } = useModal();
  const authOpened = type === "add-post" && isOpen;
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState<string[]>([]);
  const [newRequirement, setNewRequirement] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");

  const handleAddRequirement = () => {
    if (newRequirement.trim() !== "") {
      setRequirements([...requirements, newRequirement]);
      setNewRequirement("");
    }
  };

  const handleRemoveRequirement = (index: number) => {
    const updatedRequirements = [...requirements];
    updatedRequirements.splice(index, 1);
    setRequirements(updatedRequirements);
  };

  const handleAddSkill = () => {
    if (newSkill.trim() !== "") {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (index: number) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  const onClickSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()

    if(!title || !description || requirements.length === 0 || skills.length === 0){
      toast.error('Fill all the details')
      return
    }
    
    try{
      const values = {
        title, description, requirements, skills
      }
      setLoading(true)
      await axios.post('/api/add-post', values)
      toast.success('post created')
    }
    catch(error){
     
      toast.error("something went wrong")
    }
    finally{
      setTitle("")
      setDescription("")
      setRequirements([])
      setNewRequirement("")
      setSkills([])
      setNewSkill("")
      setClose()
      router.refresh()
      setLoading(false)
    }
  };

  return (
    <Modal title="CREATE POST" isOpen={authOpened} onClose={setClose}>
      <div>
        <form>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium">
              Title
            </label>
            <Input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-200"
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="requirements" className="block text-sm font-medium">
              Requirements
            </label>
            <ul className="list-disc pl-5">
              {requirements.map((requirement, index) => (
                <li key={index} className="mb-1 flex flex-row items-center">
                  {requirement}
                  <button
                    type="button"
                    onClick={() => handleRemoveRequirement(index)}
                    disabled={loading}
                    className="ml-2 text-red-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex items-center mt-2">
              <Input
                type="text"
                placeholder="Add a requirement..."
                value={newRequirement}
                disabled={loading}
                onChange={(e) => setNewRequirement(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddRequirement();
                  }
                }}
              />
              <Button
                type="button"
                onClick={() => handleAddRequirement()}
                disabled={loading}
                className="px-4 py-2 ml-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Add
              </Button>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="skills" className="block text-sm font-medium">
              Skills
            </label>
            <div className="flex flex-wrap">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-blue-100 px-2 py-1 m-1 rounded-lg flex items-center"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(index)}
                    disabled={loading}
                    className="ml-2 text-red-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            <div className="flex items-center mt-2">
              <Input
                type="text"
                placeholder="Add a skill..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
              />
              <Button
                type="button"
                onClick={() => handleAddSkill()}
                disabled={loading}
                className="px-4 py-2 ml-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Add
              </Button>
            </div>
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={(e) => onClickSubmit(e)}
          >
            Submit
          </Button>
        </form>
      </div>
    </Modal>
  );
};
export default AddPost;
