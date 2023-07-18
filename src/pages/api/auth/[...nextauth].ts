import {
  CreateAuthorDocument,
  GetAuthorByEmailDocument,
} from "@/generated/graphql";
import { client } from "@/lib/urql";
import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      const email = user.email!;
      const avatar = user.image!;
      const name = user.name!;

      const {
        data: { authors },
      } = await client.query(GetAuthorByEmailDocument, { email }).toPromise();

      if (authors.length === 0) {
        // customer doesn't exists
        await client
          .mutation(CreateAuthorDocument, { email, name })
          .toPromise();
      } else {
        // if customer exists
        console.log("authors", authors);
      }

      return true;
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET!,
  },
});

// async function createMember(email: string, avatar: string, name: string) {
//   try {
//     const data = await fetch(
//       `https://api-sa-east-1.hygraph.com/v2/clh4y479g5mig01taa2s5djfl/master`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${process.env.API_ACCESS_TOKEN}`,
//         },
//         body: JSON.stringify({
//           query: `
//           mutation CrateMember {
//             createMember(data: {email: "${email}", name: "${name}", image: "${avatar}"}) { id },
//             publishMember (where: {email: "${email}"}) { id }
//           }`,
//         }),
//       }
//     );

//     const response = await data.json();
//     return response;
//   } catch (err) {
//     console.log(err);
//   }
// }
