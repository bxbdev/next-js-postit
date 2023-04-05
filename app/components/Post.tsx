'use client'

import Image from "next/image"
import Link from "next/link"

export default function Post({id, avatar, name, postTitle, comments}: any) {
    return (
        <div className="px-8 py-6 my-6 bg-white rounded-lg my8">
            <div className="flex items-center gap-2">
                <Image 
                    className="rounded-full"
                    width={32} 
                    height={32}
                    src={avatar}
                    alt="Avatar" 
                />
                <h3 className="font-bold text-gray-700">{name}</h3>

            </div>
            <div className="py-4">
                <p className="break-all">{postTitle}</p>
            </div>
            <div className="flex items-center gap-4 cursor-pointer">
                <Link href={`/post/${id}`}>
                    <p className="text-sm font-bold text-gray-700">{comments?.length} Comments</p>
                </Link>
            </div>
        </div>
    )
}