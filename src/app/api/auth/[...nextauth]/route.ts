import NextAuth from "next-auth/next";
import {autProvider} from "./option"

const handler = NextAuth(autProvider)

export {handler as GET, handler as POST}