export type PostType = {
    id: string
    title: string
    updatedAt?: string
    user: {
        emai: string
        id: string
        image: string
        name: string
    }
    comments?: {
        createdAt?: string
        id: string
        postId: string
        title: string
        userId: string
        user: {
            emai: string
            id: string
            image: string
            name: string
        }
    }[]
}
