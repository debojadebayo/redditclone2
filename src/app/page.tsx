import Head from "next/head";
import type { NextPage } from "next";
import PostBox from "./components/PostBox";


export default function Home() {
  return (
    <>
      <div className=" max-w-5xl my-7 mx-auto p-4">
        <Head>
          <title>Reddit 2.0 clone</title>
          <meta name="description" content="Home page" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <PostBox />
      </div>
    </>
  )}