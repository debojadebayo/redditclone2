"use client";
import Image from "next/image"
import React from "react"
import redditImg from "../images/reddit-logo-2436.svg"
import { HomeIcon, 
        BellIcon,
        ChatBubbleLeftIcon,
        PlusIcon,
        SparklesIcon,   
        SpeakerWaveIcon, 
        VideoCameraIcon, 
        MagnifyingGlassIcon, 
        GlobeAltIcon,
        StarIcon,
        UserCircleIcon,
 } from "@heroicons/react/24/outline"

 import { ChevronDownIcon,
        Bars3Icon, 
 } from "@heroicons/react/24/solid"
 
 import { signIn, signOut, useSession } from "next-auth/react"

function Header() {

    const { data: session } = useSession()

    return (
        <div className="stick top-0 z-50 flex bg-white px-4 py-2 shadow-sm">

            <div className="relative h-10 w-20 flex-shrink-0 cursor-pointer ">
                <Image 
                    src={redditImg}
                    alt="reddit-img"
                    height={20}
                    width={40}
                    />
            </div>

            <div className="mx-0 flex items-center xl:min-w-[300px]">
                <HomeIcon className="h-5 w-5 stroke-black" />
                <p className="text-black flex-1 ml-2 hidden lg:inline">Home</p>
                <ChevronDownIcon className="h-5 w-5 stroke-black" />
            </div>


            <form className="flex flex-1 border-gray-200 items-center space-x-2 rounded-sm bg-gray-100 px3 py-1 ">
                <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
                <input
                    className="flex-1 bg-transparent outline-none"
                    type="text"
                    placeholder="Search Reddit"
                />
                <button type="submit" hidden>Search</button>
            </form>

            <div className="flex text-gray-500 space-x-2 items-center mx-5 lg:inline-flex">
                <SparklesIcon className="icon" />
                <GlobeAltIcon className="icon" />
                <VideoCameraIcon className="icon" />
                <hr className="h-10 border border-gray-200" />
                <ChatBubbleLeftIcon className="icon" />
                <BellIcon className="icon" />   
                <PlusIcon className="icon" />
                <SpeakerWaveIcon className="icon" />
            </div>  

            {session ? (
                <div onClick={() => signOut()} className="flex flex-row gap-3 justify-center align-middle">
                    <UserCircleIcon className="icon text-gray-400" />
                    <div className="flex flex-col text-xs">
                        <p className="truncate">{session?.user?.name}</p>
                        <p className="text-gray-400 cursor-pointer">Sign Out</p>
                        <p className="text-gray-400 cursor-pointer">1 karma</p>
                    </div>

                    <ChevronDownIcon className="h-5 w-5 flex-shrink-0 text-gray-400" />
                </div>

            ) : ( 
                <div onClick={() => signIn()} className="flex flex-row gap-3 justify-center align-middle">
                    <UserCircleIcon className="icon text-gray-400 " />
                    <p className="text-gray-400 cursor-pointer icon">Sign In</p>
                </div>)}

            <div className="ml-5 flex items-center lg:hidden">
                <Bars3Icon className="icon" />
            </div>

        </div>
    )
}

export default Header