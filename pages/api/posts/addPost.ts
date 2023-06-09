import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import prisma from "../../../prisma/client"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        const session = await getServerSession(req, res, authOptions)
        if (!session) 
            return res.status(403).json({message: 'Please sign in to make a post'})

        // console.log('POST', req.body)

        const title: string = req.body.title
        const prismaUser = await prisma.user.findUnique({
            where: {
                email: session?.user?.email ?? '',
            }
        })

        // Check title
        if (title.length > 300) 
            // message will send to frontend
            return res.status(403).json({message: 'Please write a shorter post'})

        // Check title is empty
        if (!title.length)
            // message will send to frontend
            return res.status(403).json({message: 'Please do not leave this empty'})

        // Create post
        try {
            const result = await prisma.post.create({
                data: {
                    title,
                    userId: prismaUser?.id ?? ''
                }
            })
            res.status(200).json(result)
        } catch(err) {
            res.status(403).json({err: 'Error has occurred whilst creating post'})
        }
    }
}