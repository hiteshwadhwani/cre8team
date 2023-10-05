"use client";

import AddPost from "@/components/modal/add-post-modal";
import AuthModal from "@/components/modal/auth-modal";
import ProfilePage from "@/components/modal/profile-modal";
import ProjctDescription from "@/components/modal/project-description-modal";
import ProjectDetails from "@/components/modal/project-details-modal";
import { useEffect, useState } from "react";

const ModalProvider = () => {
  const [mounted, isMounted] = useState(false);
  useEffect(() => {
    isMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <AuthModal />
      <AddPost />
      <ProjectDetails />
      <ProjctDescription />
      <ProfilePage />
    </>
  );
};
export default ModalProvider;
