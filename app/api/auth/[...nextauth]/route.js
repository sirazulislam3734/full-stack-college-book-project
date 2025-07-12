import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Mock user validation (replace with real database check)
        const mockUsers = [
          {
            id: "1",
            email: "test@example.com",
            password: "password123",
            name: "Test User",
            image: "https://i.ibb.co/QXvTMzp/user1.jpg",
          },
          {
            id: "2",
            email: "admin@collegebook.com",
            password: "admin123",
            name: "Admin User",
            image: "https://i.ibb.co/7XzQzKp/user2.jpg",
          },
        ]

        const user = mockUsers.find((u) => u.email === credentials.email && u.password === credentials.password)

        if (user) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          }
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signUp: "/register",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
      }
      return session
    },
  },
})

export { handler as GET, handler as POST }
