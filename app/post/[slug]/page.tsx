'use client'

import Post from '@/app/components/Post'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Link from 'next/link'

const fetchDetails = async (slug: string) => {
    const response = await axios.get(`/api/posts/${slug}`)
    return response.data
}

type URL = {
    params: {
        slug: string
    }
}

export default function PostDetail(url: URL) {
    const { data, isLoading} = useQuery({
        queryKey: ['detail-post'],
        queryFn: () => fetchDetails(url.params.slug)
    })

    if (isLoading) return <div>Loading...</div>
    return (
        <div className="">
            <Link  
                className="text-blue-500 hover:underline"
                href="/dashboard"
            >
                Back to Dashboard
            </Link>
            <Post 
                id={data.id} 
                avatar={data.user.image}  
                name={data.user.name} 
                postTitle={data.title}
                comments={data.comments} 
            />
        </div>
    )
}