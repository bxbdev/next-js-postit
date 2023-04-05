"use client"

import Image from "next/image"
import { signOut } from "next-auth/react"
import Link from "next/link"

type User = {
    image: string
}

export default function Logged({ image }: User) {
    return (
        <li className="flex items-center gap-8">
            <button 
                className="px-6 py-2 text-sm text-white transition-all bg-gray-700 rounded-md hover:bg-gray-800" 
                onClick={() => signOut()}
            >
                Sign Out
            </button>
            <Link href="/dashboard">
                <Image
                    className="rounded-full"
                    width={48} 
                    height={48} 
                    src={image}
                    alt=""
                />
            </Link>
        </li>
    )
}