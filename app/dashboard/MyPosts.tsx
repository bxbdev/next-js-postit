'use client'
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { AuthPosts } from "../types/AuthPosts"
import EditPost from "./EditPost"
import { useState, useEffect } from 'react'

const fetchAuthPosts = async () => {
    const response = await axios.get('/api/posts/authPosts')
    return response.data
}

export default function MyPosts() {

    const {data, isLoading} = useQuery<AuthPosts>({
        queryFn: fetchAuthPosts, 
        queryKey: ['auth-posts'],
    })
    
    if (isLoading) return <h1>Posts are loading...</h1>
    return (
        <div>
            {
                // Rendered posts content and injected user information
                // Must to check the columns if existed before rendering the data
                // Make sure schema in prisma is corrected for each columns in the table
                data?.posts?.map( 
                (post) => 
                    <EditPost
                        key={post.id} 
                        id={post.id}
                        avatar={data?.image}
                        name={data?.name}
                        title={post.title}
                        comments={post.comments}
                    />
                )
            }
        </div>
    )
}