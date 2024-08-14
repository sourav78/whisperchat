"use client"

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import * as z from 'zod'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SigninSchema } from "@/schema/signinSchema";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { signIn } from "next-auth/react";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const SigninCard = () => {

  const {toast} = useToast()
  const router = useRouter()

  const [isLoggingin, setIsLoggingin] = useState<boolean>(false)

  const form = useForm<z.infer<typeof SigninSchema>>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      username: "",
      password: "",
    }
  });

  const onSubmit = async (data: z.infer<typeof SigninSchema>) => {
    
    setIsLoggingin(true)

    const result = await signIn("credentials", {
      redirect: false,
      username: data.username,
      password: data.password
    })

    if(result?.error){
      if(result.error === "CredentialsSignin"){
        toast({
          title: "Error",
          description: "Invalid username or password",
          variant: "destructive"
        })
      }else{
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive"
        })
      }
    }
    setIsLoggingin(false)

    if(result?.url){
      router.replace("/")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Signin</CardTitle>
        <CardDescription>
          Signin to chat with your favorite persons.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
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
                    <Input type="password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">{isLoggingin ? (<Loader2 className="animate-spin"/>) : "Signin"}</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SigninCard;
