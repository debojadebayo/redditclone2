import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from "./components/SessionProvider";
import { getServerSession } from "next-auth";
import Header from "./components/Header";
import ApolloWrapper from "../../lib/apollo-wrapper";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession()

  return (
    <html lang="en">
      <ApolloWrapper>
        <SessionProvider session={session}>
          <Toaster />
            <body className={inter.className}>
            <div className="h-screen bg-slate-200 overflow-y-scroll">
              <Header />
              {children}
            </div>
          </body>
        </SessionProvider>
      </ApolloWrapper>
    </html>
  );
}
