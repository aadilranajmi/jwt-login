import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
const authOption = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };

        const res = await authenticate({
          email: credentials.email,
          password: credentials.password,
        });
        if (typeof res !== "undefined") {
          if (res.error === "invalid_password") {
            throw new Error("Invalid Password");
          } else if (res.error === "invalid_user") {
            throw new Error("Invalid User");
          } else {
            return { ...res };
          }
        } else {
          throw new Error("Unknown Error");
        }
      },
    }),
  ],
  session: {strategy: "jwt"},
  secret: "thiswillbesecretkey",
  callbacks: {
    async jwt({token, user, account}) {
        if(user && account) {
            return {
                ...token, ...user
            }
        }
        return token
    },
    async session({session, token}) {
        session.user = token;
        return session
    }
  }
};

const handler = NextAuth(authOption);
export { handler as GET, handler as POST };
