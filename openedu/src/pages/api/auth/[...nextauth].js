import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials"
import { Prisma, PrismaClient } from '@prisma/client'


export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
              email: { label: "Email", type: "text", placeholder: "Email" },
              password: { label: "Password", type: "password", placeholder: 'Password' }
            },
            async authorize(credentials, req) {
                const prisma = new PrismaClient()
                const user = await prisma.user.findFirst({
                    where: {
                        email: credentials.email,
                        password: credentials.password
                    }
                })

                if (user) return user
                return null
            }
        }),
        /*GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),*/
    ],
    /*callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.accessToken = user.access_token
        }
        return token;
      },
  
      async session({ session, token }) {
        session.accessToken = accessToken
        return session;
      },
    },*/
})