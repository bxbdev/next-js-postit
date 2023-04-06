'use client'

import Image from 'next/image'
import { useState } from 'react'
import Toggle from './Toggle'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { redirect } from "next/navigation"
import Link from 'next/link'

type EditProps = {
    id: string
    avatar: string
    name: string
    title: string
    comments?: {
        id: string
        postId: string
        userId: string
    }[],
}

export default function EditPost({avatar, name, title, comments, id}: EditProps) {

    const [toggle, setToggle] = useState(false)
    let deleteToastID: string
    const queryClient = useQueryClient()

    // Delete post
    const { mutate } = useMutation(
       async (id: string) => {
            await axios.delete("/api/posts/deletePost", {
                data: id
            }),
            {
                onError: (error: any) => {
                    if (error instanceof AxiosError) {
                        toast.error(error?.response?.data.message, {id: deleteToastID})
                    }
                },
                onSuccess: (data: any) => {
                    // console.log(data)
                    // TODO: to fix toast was not showing up after deleted post
                    queryClient.invalidateQueries(['auth-posts'])
                    toast.success("Post has been deleted", {id: deleteToastID})
                },
            }
       }
    )
    const deletePost = () => {
        // TODO: fix toast loading issue after delete but keep stuck
        deleteToastID = toast.loading("Deleting your post", {id: deleteToastID})
        mutate(id)
    }

    return (
        <>
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
                <p className="break-all" >{title}</p>
            </div>
            <div className="flex items-center gap-4">
                <Link href={`/post/${id}`} className="text-sm font-bold text-gray-700">{comments?.length} comments</Link>
                <button 
                    className="text-red-500 hover:text-red-600"
                    onClick={(e) => {
                        e.stopPropagation()
                        setToggle(true)
                    }}
                >
                    Delete
                </button>
            </div>
        </div>
        { toggle && <Toggle deletePost={deletePost} setToggle={setToggle} /> }
        </>
    )
}