import NextAuth, { NextAuthOptions, Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import Providers from 'next-auth/providers'
import { NextApiRequest, NextApiResponse } from 'next-auth/_next'
import { WithAdditionalParams } from 'next-auth/_utils'

const options: NextAuthOptions = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  database: process.env.NEXT_PUBLIC_DATABASE_URL,
  session: {
    jwt: true,
  },
  debug: true,
  callbacks: {
    session: async (session, user: JWT) => {
      const newSession: WithAdditionalParams<Session> = {
        ...session,
        jwt: user.jwt,
        id: user.id,
      }

      return Promise.resolve(newSession)
    },
    jwt: async (token, user, account) => {
      const isSignIn = user ? true : false

      if (isSignIn) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/${account.provider}/callback?access_token=${account?.accessToken}`
        )

        const data = await response.json()

        token.jwt = data.jwt
        token.id = data.user.id
      }

      return Promise.resolve(token)
    },
  },
}

const Auth = (req: NextApiRequest, res: NextApiResponse<unknown>) => NextAuth(req, res, options)

export default Auth
