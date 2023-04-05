"use client"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import AddPost from "./components/AddPost"
import Post from "./components/Post"
import { PostType } from './types/Posts'

// Fetch all posts
const allPosts = async () => {
  const response = await axios.get("/api/posts/getPost")
  return response.data
}

export default function Home() {
  const {data, error, isLoading} = useQuery<PostType[]>({
    queryFn: allPosts,
    // queryKey can be any
    queryKey: ['posts']
  })

  if (error) return error
  if (isLoading) return "Loading..."

  console.log(data)

  return (
    <main>
      <AddPost />
      {
        data?.map((post: any) => (
          <Post 
            key={post.id}
            id={post.id}
            name={post.user.name} 
            avatar={post.user.image}
            postTitle={post.title} 
            comments={post.comments}
          />
        ))
      }
    </main>
  )
}
