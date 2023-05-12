import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next"
import { PrismaClient, Prisma } from '@prisma/client'
import { Course } from "@prisma/client";
import { getToken } from "next-auth/jwt"

const prisma = new PrismaClient()

const assignment = Prisma.validator<Prisma.AssignmentArgs>()({
    select: {
        courseId: true,
        name: true,
        type: true
    }
})

type Assignment = Prisma.AssignmentGetPayload<typeof assignment>

interface AssignmentRequest extends NextApiRequest {
    query: {
        id?: string,
        page?: number
    },
    body: Assignment
}

export default async function handler(req: AssignmentRequest, res: NextApiResponse) {
    try {
        switch(req.method){
            case 'GET': return await GetAssignments(req, res); break;
            case 'POST': return await CreateAssignment(req, res); break;
        }
    }
    catch(e){
        console.error(e)
        return res.status(500);
    }
}

const GetAssignments = async (req: AssignmentRequest, res: NextApiResponse) => {
    const token = await getToken({ req })
    if(!token || !token.email) return res.status(401);
    
    const user = await prisma.user.findFirst({
        where: { email: token.email }
    })

    if(!user) return res.status(401);

    const assignments = await prisma.assignment.findMany({
        orderBy: { name: 'asc' },
        include: {
            modules: {
                select: {
                    id: true,
                    name: true,
                    type: true
                }
            }
        },
        where: {
            courseId: req.body.courseId
        }
    })

    return res.status(200).json(assignments)
}

const CreateAssignment = async (req: AssignmentRequest, res: NextApiResponse) => {
    const token = await getToken({ req })
    if(!token || !token.email) return res.status(401);
    
    const creator = await prisma.user.findFirst({
        where: { email: token.email }
    })

    if(!creator) return res.status(401);

    const newAssignment = await prisma.assignment.create({
        data: {
            courseId: req.body.courseId,
            name: req.body.name,
            type: req.body.type
        }
    })

    return res.status(200).json(newAssignment)
}