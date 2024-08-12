import dbConnect from "@/lib/db";
import UserModel from "@/model/user.model";
import { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"

export const autProvider: NextAuthOptions = {
    providers: [
        CredentialProvider({
            name: "Credentials",
            credentials: {
                username: {label: "Username", type: "text"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credential: any): Promise<any> {
                await dbConnect()

                try{

                    const user = await UserModel.findOne({username: credential.username})

                    if(!user){
                        throw new Error("Username not found.")
                    }

                    const validatePassword = await bcrypt.compare(credential.password, user.password)

                    if(validatePassword){
                        return user
                    }else{
                        throw new Error("Incorrect password.")
                    }

                }catch(error: any){
                    throw new Error(error)
                }
            }
        })
    ],
    callbacks:{
        async jwt({token, user}){
            if(user){
                token._id = user._id,
                token.username = user.username,
                token.name = user.name
            }
            return token
        },

        async session({session, token}){
            if(token){
                session.user._id = token._id,
                session.user.username = token.username,
                session.user.name = token.name
            }
            return session
        }
    },
    pages: {
        signIn: "/auth"
    },
    session:{
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
}