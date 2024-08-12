"use client"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {

  const router = useRouter()

  const {data: session, status} = useSession()

  useEffect(() => {
    console.log(session);
    console.log(status);
    
    if (status === "unauthenticated") {
      router.replace("/auth");
    }
    
  }, [status, router]);

  // if (status === "loading") {
  //   return <div>Loading...</div>; // Or some other loading state
  // }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    </main>
  );
}
