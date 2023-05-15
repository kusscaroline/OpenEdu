import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next"
import { PrismaClient, Prisma } from '@prisma/client'
import { Course } from "@prisma/client";
import { getToken } from "next-auth/jwt"

const prisma = new PrismaClient()

const module = Prisma.validator<Prisma.ModuleArgs>()({
    select: {
        assignmentId: true,
        name: true,
        type: true,
        data: true
    }
})

type Module = Prisma.AssignmentGetPayload<typeof module>

interface ModuleRequest extends NextApiRequest {
    query: {
        id?: string,
        page?: number
    },
    body: Module
}

export default async function handler(req: ModuleRequest, res: NextApiResponse) {
    try {
        switch(req.method){
            case 'POST': return await CreateAssignment(req, res); break;
        }
    }
    catch(e){
        console.error(e)
        return res.status(500);
    }
}

const CreateAssignment = async (req: ModuleRequest, res: NextApiResponse) => {
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