"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { SignupSchema } from "@/schema/signupSchema";
import { ApiResponse } from "@/types/Apiresponse";
import axios, { AxiosError } from "axios";
import { ImagePlus, Loader2 } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import * as z from "zod"

const Onboarding = () => {

  const router = useRouter()
  
  const [authData, setAuthData] = useState<z.infer<typeof SignupSchema> | null>(null);
  const [name, setName] = useState<string | undefined>("");

  useEffect(() => {
    const authData: z.infer<typeof SignupSchema> = JSON.parse(atob(localStorage.getItem("adenc")!))
    setAuthData(authData)
    setName(authData.name)
  }, [])

  const [bio, setBio] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    null
  );
  const [isSaving, setIsSaving] = useState(false)

  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);

      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        setImagePreview(e.target?.result!);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleOnboardingSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsSaving(true)
    try{
      const formData = new FormData()
      if(image){
        formData.append('image', image)
      }
      if(!name){
        toast({
          title: "Name shoud not be empty",
          variant: "destructive"
        })
        return
      }
      formData.append('name', authData?.name!)
      formData.append('username', authData?.username!)
      formData.append('bio', bio)

      const response = await axios.post<ApiResponse>("/api/onboarding", formData)
      
      toast({
        title: response.data.message
      })

      const userSignin = await signIn("credentials", {
        redirect: false,
        username: authData?.username,
        password: authData?.password
      })
      

      if(userSignin?.error){
        if(userSignin.error === "CredentialsSignin"){
          toast({
            title: "Invalid username or password",
            variant: "destructive"
          })
        }else{
          toast({
            title: userSignin.error,
            variant: "destructive"
          })
        }
      }

      if(userSignin?.url){
        localStorage.removeItem("adenc")
        router.replace("/")
      }

    }catch(error: any){
      const axiosError = error as AxiosError<ApiResponse>

      toast({
        title: axiosError.response?.data.message ?? "There is a problem while updating. try again later.",
        variant: "destructive",
      })
    }finally{
      setIsSaving(false)
    }
  };

  return (
    <div className="w-full h-screen">
      <div className="w-full flex flex-col">
        <div className=" mt-12">
          <h1 className="text-4xl font-semibold text-center">Onboarding</h1>
        </div>
        <form onSubmit={handleOnboardingSave}>
          <div className="mt-8 flex justify-center">
            <div className="w-4/5 lg:w-1/2 xl:w-1/3 py-4">
              <div className="flex justify-center">
                <div className="w-40 h-40 relative">
                  <div className="w-full h-full border border-white rounded-full  overflow-hidden">
                    <img
                      className="w-full h-full"
                      src={
                        imagePreview
                          ? (imagePreview as string)
                          : "https://res.cloudinary.com/sourav78/image/upload/v1720806850/whishper/users/dmrfftkzammnayfczffx.png"
                      }
                      alt=""
                    />
                  </div>
                  <div className="absolute bottom-2 right-0">
                    <Label
                      htmlFor="avtar"
                      className="bg-primaryblue p-2 inline-block rounded-full cursor-pointer"
                    >
                      {<ImagePlus />}
                    </Label>
                    <Input
                      type="file"
                      className="hidden"
                      id="avtar"
                      onChange={onImageChange}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <div className="space-y-4">
                  <div className=" px-4 space-y-2">
                    <Label>Name</Label>
                    <Input
                      className="border-gray-400 focus:border-transparent"
                      placeholder="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className=" px-4 space-y-2">
                    <Label>Bio</Label>
                    <Textarea
                      className="border-gray-400 focus:border-transparent"
                      rows={5}
                      placeholder="Your Bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-center">
                <Button className="min-w-32" type="submit">
                  {
                    isSaving ? (<><Loader2 className="animate-spin"/> Saving...</>) : "Save"
                  }
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;
