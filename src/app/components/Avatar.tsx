import { useSession } from "next-auth/react";
import React from "react";
import Image from "next/image";

type Props = {
    seed?:string
    large?:boolean
}


function Avatar({seed, large}:Props) {
    const { data: session } = useSession();

    return (
        <div className="relative h-10 w-10 rounded-full border-gray-300 bg-white overflow-hidden">
            <Image  
                src={`https://api.dicebear.com/8.x/avataaars/svg?seed=${seed || session?.user?.email || 'placeholder'}`}
                style={{width: large ? '100px' : '40px', height: large ? '100px' : '40px' }}
                alt="avatar"
                width={40}
                height={40}
            />
        </div>
    )
}


export default Avatar;