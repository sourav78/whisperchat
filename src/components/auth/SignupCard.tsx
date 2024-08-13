"use client"

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { useForm } from "react-hook-form";
import * as z from "zod"
import { SignupSchema } from "@/schema/signupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import {useDebounceCallback} from 'usehooks-ts'
import axios, { AxiosError } from 'axios'
import { ApiResponse } from "@/types/Apiresponse";
import { Loader2 } from "lucide-react";

const SignupCard = () => {

  const router = useRouter()
  const {toast} = useToast()

  const [username, setUsername] = useState<string>('')
  const [usernameMessage, setUsernameMessage] = useState<string>('')
  const [isCheckingUsername, setIsCheckingUsername] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const debouncedUsername = useDebounceCallback(setUsername, 300)

  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: "",
      username: "",
      password: ""
    }
  })

  useEffect(() => {
    async function checkUsernameIsUnique(){
      if(username){
        console.log("check");
        
        setIsCheckingUsername(true)
        setUsernameMessage("")

        try{

          const response = await axios.get<ApiResponse>(`/api/unique-username?username=${username}`)
          setUsernameMessage(response.data.message)

        }catch(error){
          const axiosError = error as AxiosError<ApiResponse>;

          setUsernameMessage(
            axiosError.response?.data.message ?? "Error checking username."
          );
        }finally{
          setIsCheckingUsername(false)
        }
      }
    }

    checkUsernameIsUnique()
  }, [username])

  const onSubmit = async (data: z.infer<typeof SignupSchema>) => {

    setIsSubmitting(true)
    try{
      const response = await axios.post<ApiResponse>("/api/signup", data)

      toast({
        title: "Success",
        description: response.data.message
      })

      router.replace("/onboarding")
    }catch(error){
      const axiosError = error as AxiosError<ApiResponse>

      toast({
        title: "Error",
        description: axiosError.response?.data.message ?? "There was a problem with your sign-up. Please try again.",
        variant: "destructive"
      })
    }finally{
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Signup</CardTitle>
        <CardDescription>
          Let's create your account on whisper.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
      <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input 
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        debouncedUsername(e.target.value)
                      }}
                    />
                  </FormControl>
                  {isCheckingUsername && <Loader2 className="animate-spin"/>}
                  {!isCheckingUsername && usernameMessage && (
                    <p
                      className={`text-sm ${
                        usernameMessage === "Username is unique."
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {usernameMessage}
                    </p>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">{isSubmitting ? (<Loader2 className="animate-spin"/>) : "Signup"}</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignupCard;
