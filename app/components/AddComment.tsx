'use client'

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'

type AddProps = {
    id?: string
}

type Comment = {
    postId?: string
    comment: string
}

export default function AddComment({id}: AddProps) {
    const [comment, setComment] = useState('')
    const [isDisabled, setIsDisabled] = useState(false)
    const queryClient = useQueryClient()
    let commentToastId: string

    const { mutate } = useMutation(
        // Follow prisma schema and add Comment type here
        async (data: Comment) => {
            await axios.post("/api/posts/addComment", {data}),
            {
                onError: (error: any) => {
                    if (error instanceof AxiosError) {
                        toast.error(error?.response?.data.message, {id: commentToastId})
                    }
                    setIsDisabled(false)
                },
                onSuccess: (data: any) => {
                    setComment('')
                    setIsDisabled(false)
                    queryClient.invalidateQueries(['detail-post'])
                    toast.success("Added your comment 🔥", {id: commentToastId})
                }
            }
        }
    )
    const addComment = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsDisabled(true)
        commentToastId = toast.loading("Adding your comment", {id: commentToastId})
        mutate({
            comment,
            postId: id
        })
    }

    return (
        <form onSubmit={addComment}>
            <div className="my-8">
                <h3>Add a comment</h3>
                <div className="flex flex-col my-2">
                    <textarea 
                        className="p-4 my-2 text-lg rounded-md"
                        name="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                </div>
                <div className="flex items-center justify-between gap-2">
                    <p
                        className={` ${
                            comment.length > 300 ? "text-red-700" : "text-gray-700"
                        }`}
                    >
                        {`${comment.length}/300`}
                    </p>
                    <button 
                        disabled={isDisabled}
                        className="px-4 py-2 text-sm text-white bg-teal-600 rounded-md"
                        type="submit"
                    >
                        Add Comment 🚀
                    </button>
                </div>
            </div>
        </form>
    )
}