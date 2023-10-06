"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import React from "react";

interface ModalProps {
  title?: string;
  description?: string;
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
  className?: string
}

const Modal: React.FC<ModalProps> = ({
  title,
  description,
  isOpen,
  children,
  onClose,
  className
}) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent className={className}>
        <DialogHeader>
          <DialogTitle>
            {" "}
            {title ? (
              <p>{title}</p>
            ) : (
              <Image src={"/logo.svg"} alt="logo" width={150} height={40} />
            )}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
export default Modal;
