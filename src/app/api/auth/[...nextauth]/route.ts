import NextAuth from "next-auth"
import RedditProvider from "next-auth/providers/reddit"

const handler = NextAuth({

        // Configure Reddit authentication provider
    providers: [ 
        RedditProvider({
            clientId: process.env.REDDIT_CLIENT_ID,
            clientSecret: process.env.REDDIT_CLIENT_SECRET,
            authorization: {
                params: {
                duration: "permanent",
                },
              },
            }),
          ]

})

export { handler as GET, handler as POST}