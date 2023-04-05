'use client'

import Image from 'next/image'
import { useState } from 'react'

type EditProps = {
    id: string
    avatar: string
    name: string
    title: string
    comments?: {
        id: string
        postId: string
        userId: string
    }[]
}

export default function EditPost({avatar, name, title, comments, id}: EditProps) {

    const deletePost = (id: string) => {
        console.log('deletePost', id)
    }
    return (
        <div className="p-8 my-8 bg-white rounded-lg">
            <div className="flex items-center gap-2">
                <Image
                    className="rounded-full"
                    src={avatar}
                    alt={name}
                    width={32}
                    height={32}
                />
                <h3 className="font-bold text-gray-700">{name}</h3>
            </div>
            <div className="my-8">
                <p className="break-all">{title}</p>
            </div>
            <div className="flex items-center gap-4">
                <p className="text-sm text-gray-700">{comments?.length} comments</p>
                <button 
                    className="text-red-500 hover:text-red-600"
                    onClick={() => deletePost(id)}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}