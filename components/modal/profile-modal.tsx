import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "../ui/modal";
import useModal from "@/hooks/use-modal";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@/hooks/use-user";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Rocket } from "lucide-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {BeatLoader} from 'react-spinners'

const MAX_SIZE_MB = 1;

const formSchema = z.object({
  name: z.string().optional(),
  imageUrl: z
    .custom<FileList>()
    .optional()
    .transform((file) => file && file.length > 0 && file.item(0))
    .refine(
      (file) => !file || (!!file && file.size <= MAX_SIZE_MB * 1024 * 1024),
      {
        message: `The profile picture must be a maximum of ${MAX_SIZE_MB}MB.`,
      }
    ),
  profession: z.string().optional(),
  about: z.string().optional(),
  resume: z
    .custom<FileList>()
    .optional()
    .transform((file) => file && file.length > 0 && file.item(0))
    .refine(
      (file) => !file || (!!file && file.type?.startsWith("application/pdf")),
      {
        message: "Only PDFs are allowed to be sent.",
      }
    ),
});

const ProfilePage = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const { isOpen, type, setClose } = useModal();
  const userData = useUser();
  const [loading, setLoading] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userData?.profile?.name ?? undefined,
      profession: userData?.profile?.profession ?? undefined,
      about: userData?.profile?.about ?? undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)
      let formData: any = {
        name: values?.name,
        about: values?.about,
        profession: values?.profession,
      };
      if (values.imageUrl) {
        const file_name = uuidv4();
        await supabase.storage
          .from("profile photo")
          .upload(file_name, values.imageUrl);
        const { data } = supabase.storage
          .from("profile photo")
          .getPublicUrl(file_name);
        formData = { ...formData, imageUrl: data.publicUrl };
      }
      if (values.resume) {
        const fileName = uuidv4();
        const data = await supabase.storage
          .from("resume")
          .upload(fileName, values.resume);
        formData = { ...formData, resume: data.data?.path };
      }

      const res = await axios.post("/api/update-user", formData);
      toast.success("profile updated");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    } finally {
      setLoading(false)
      setClose();
    }
  };

  return (
    <Modal
      title="Profile"
      isOpen={isOpen && type === "profile-modal"}
      onClose={setClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your full name"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="profession"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profession</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your profession"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem>
                <FormLabel>About Me</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little about yourself..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field: { onChange }, ...field }) => (
              <FormItem>
                <FormLabel>Change your profile photo</FormLabel>
                <FormControl>
                  <Input
                    className="cursor-pointer"
                    accept=".jpg,.png,.jpeg"
                    type="file"
                    {...field}
                    onChange={(e) => onChange(e.target.files)}
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="resume"
            render={({ field: { onChange }, ...field }) => (
              <FormItem>
                <FormLabel>Upload your resume</FormLabel>
                <FormControl>
                  <Input
                    className="cursor-pointer"
                    accept=".pdf"
                    type="file"
                    {...field}
                    onChange={(e) => onChange(e.target.files)}
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={loading}>
            Lets Go <Rocket className="ml-1 h-4 w-4" />
          </Button>
        </form>
      </Form>
    </Modal>
  );
};

export default ProfilePage;
