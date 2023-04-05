import prisma from "@/prisma/client"
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        // Get Auth Users Posts
        try {
            console.log(req.query)
            const data = await prisma.post.findUnique({
                where: {
                    id: req.query.details as string,
                },
                include: {
                    user: true,
                    comments: {
                        orderBy: {
                            createdAt: 'desc'
                        },
                        include: {
                            user: true
                        }
                    }
                }
            })
            res.status(200).json(data)
        } catch(err) {
            res.status(403).json({err: 'Error has occurred whilst get post'})
        }
    }
}