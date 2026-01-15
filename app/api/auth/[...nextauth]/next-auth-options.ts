import CredentialsProvider from "next-auth/providers/credentials"
// import { login, LoginResponse } from "@/actions/auth"
import authApi from '@/api/auth'
import { AuthOptions } from "next-auth"


export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // const response = await login(credentials!)
                // if (response.ok){
                //     const body = await response.json() as HTTPResponse<LoginResponse>
                //     const { id, email, name } = body.data.user
                //     return { id, email, name , accessToken: body.data.accessToken }
                // }
                try {
                    const response = await authApi.login(credentials!)
                    const { id, email, name } = response.data.user
                    console.log("fetcher...", { id, email, name, accessToken: response.data.accessToken })
                    return { id, email, name, accessToken: response.data.accessToken }
                } catch (error) {
                    console.log(error, 'err............')
                    return null
                }

                return null
            },

        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            // if (user) {
            // 	token.accessToken = user.accessToken
            // }
            return { ...user, ...token }
        },
        async session({ session, token }) {
            if (token) {
                session.user = token
            }
            return session
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
    },
}