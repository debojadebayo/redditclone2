"use client"

import { ApolloLink, HttpLink } from "@apollo/client"
import {
    ApolloNextAppProvider,
    NextSSRInMemoryCache,
    SSRMultipartLink,
    NextSSRApolloClient,
  } from "@apollo/experimental-nextjs-app-support/ssr";

  
  function makeClient(){
    const httpLink = new HttpLink({
      uri: "https://venegonosuperiore.stepzen.net/api/orbiting-antelope/__graphql ",
      headers: {
        Authorization: `ApiKey ${process.env.NEXT_PUBLIC_STEPZEN_API_KEY}`,
      }
    });

    return new NextSSRApolloClient({
        cache: new NextSSRInMemoryCache(),
        link:
            typeof window === "undefined" ? ApolloLink.from([new SSRMultipartLink({stripDefer: true}), httpLink]) : httpLink,
  })}
  
  export default function ApolloWrapper({children}){
    return (
        <ApolloNextAppProvider makeClient={makeClient} connectToDevTools={true}>{children}</ApolloNextAppProvider>
    )
  }
