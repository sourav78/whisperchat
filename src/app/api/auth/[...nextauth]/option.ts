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
            async authorize(credentials: any): Promise<any> {
                await dbConnect()

                try{

                    
                    
                    const user = await UserModel.findOne({username: credentials.username}).select("+password")
                    
                    if(!user){
                        throw new Error("Username not found.")
                    }
                    
                    const validatePassword = await bcrypt.compare(credentials.password, user.password)
                    console.log(credentials.username);
                    console.log(credentials.password);
                    
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
                token.name = user.name,
                token.avatar = user.avatar
            }
            return token
        },

        async session({session, token}){
            if(token){
                session.user._id = token._id,
                session.user.username = token.username,
                session.user.name = token.name,
                session.user.avatar = token.avatar
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