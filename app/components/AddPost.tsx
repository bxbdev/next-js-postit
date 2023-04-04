"use client"

import { useState, useEffect } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from 'axios'
import toast from "react-hot-toast"

export default function CreatePost() {
    const [title, setTitle] = useState("")
    const [isDisabled, setIsDisabled] = useState(false)

    // Check title length before send to server
    // useEffect(() => {
    //     if (title.length > 300 || title.length === 0) setIsDisabled(true)
    //     else setIsDisabled(false)
    // })

    // Create a post
    const { mutate } = useMutation(
        async (title: string) => await axios.post('/api/posts/addPost', { title }), 
        {
            onError: (error) => {
                if (error instanceof AxiosError) {
                    toast.error(error?.response?.data.message)
                }
                setIsDisabled(false)
            },
            onSuccess: (data) => {
                toast.success("Post has been made 🔥")
                setTitle('')
                setIsDisabled(false)
            },
        }
    )

    const submitPost = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsDisabled(true)
        await mutate(title)
    }
    
    return (
        <form className="p-8 bg-white rounded-md" onSubmit={submitPost}>
            <div className="flex flex-col my-4">
                <textarea 
                    className="h-24 p-4 my-2 text-lg bg-gray-200 border-none rounded-md outline-none"
                    name="title" 
                    value={title}
                    placeholder="What's on your mind?"
                    onChange={(e) => setTitle(e.target.value)} 
                ></textarea>
            </div>
            <div className="flex items-center justify-between gap-2">
                <p className={`font-bold text-sm ${title.length > 300 ? "text-red-700" : "text-gray-700"}`}>{`${title.length}/300`}</p>
                <button
                    disabled={isDisabled}
                    className="px-6 py-2 text-sm text-white transition-all bg-teal-600 rounded-xl disabled:opacity-25 hover:bg-teal-700"
                    type="submit"
                >
                    Create a Post
                </button>
            </div>
        </form>
    )
}