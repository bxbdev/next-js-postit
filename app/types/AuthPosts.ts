export type AuthPosts = {
    id: string
    name: string
    email: string
    image: string
    posts: {
        id: string
        createdAt: string
        title: string
        comments?: {
            id: string
            createdAt: string
            postId: string
            title: string
            userId: string
        }[]
    }[]
}