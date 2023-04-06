'use client'

import AddComment from '@/app/components/AddComment'
import Post from '@/app/components/Post'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Comment from '@/app/components/Comment'

const fetchDetails = async (slug: string) => {
    const response = await axios.get(`/api/posts/${slug}`)
    return response.data
}

type URL = {
    params: {
        slug: string
    }
}

type Comment = {
    id: string
    message: string
    createdAt: string
    user: {
        name: string
        image: string
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
            <Post 
                id={data.id} 
                avatar={data.user.image}  
                name={data.user.name} 
                postTitle={data.title}
                comments={data.comments} 
            />
            <AddComment id={data.id} />
            {data?.comments?.map( (comment: Comment) => {
                return (
                    <Comment 
                        key={comment.id}
                        id={comment.id} 
                        name={comment.user?.name} 
                        avatar={comment.user?.image}
                        comment={comment.message}
                        time={comment.createdAt}
                    />
                )
               
            })}
        </div>
    )
}