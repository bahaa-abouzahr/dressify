import NextAuth from "next-auth";
import Google from "next-auth/providers/google"
import { createUser, getUser } from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    })
  ],

  callbacks: {
    
    async signIn({ user}) {
      try {
        // if user exists, fetch from DB
        const existingUser = await getUser(user.email);

        // if user doesn't exist, create user and add to DB
        if(!existingUser) await createUser({ email: user.email, fullName: user.name})
        
        return true;
      } catch {
        return false;
      }
    },

    async session({ session }) {
      
      const user = await getUser(session.user.email)
      session.user.userId = user.id;
      session.user.name = user.fullName
      session.user.nationality = user.nationality;
      session.user.countryFlag = user.countryFlag
      
      return session;
    }
  },

  pages: {
    signIn: '/login',
  }
};


export const {
  auth, 
  signIn, 
  signOut, 
  handlers: {GET, POST}
} = NextAuth(authConfig)