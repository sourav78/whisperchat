import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SignupCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Signup</CardTitle>
        <CardDescription>
          Let's create your account on whisper.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input id="name" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="username">Username</Label>
          <Input id="username" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="pawword">Password</Label>
          <Input id="pawword" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Signin</Button>
      </CardFooter>
    </Card>
  );
};

export default SignupCard;
