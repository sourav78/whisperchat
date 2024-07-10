import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import SigninCard from "@/components/auth/SigninCard";
import SignupCard from "@/components/auth/SignupCard";

const Auth = () => {
  return (
    <>
      <div className="min-h-screen flex items-start justify-center p-2">
        <div className="mt-16">
          <img className="w-96" src="whisper-full.svg" alt="" />
          <div className="mt-8">
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Signin</TabsTrigger>
                <TabsTrigger value="signup">Signup</TabsTrigger>
              </TabsList>
              <TabsContent value="signin">
                <SigninCard />
              </TabsContent>
              <TabsContent value="signup">
                <SignupCard />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
