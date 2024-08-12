"use client"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter()

  const {data: session} = useSession()

  if(!session){
    router.replace("/auth")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    </main>
  );
}
