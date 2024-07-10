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

const SigninCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Signin</CardTitle>
        <CardDescription>
          Signin to chat with your favorite persons.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
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

export default SigninCard;
