import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next"
import { PrismaClient } from '@prisma/client'
import { Course } from "@prisma/client";
import { getToken } from "next-auth/jwt"

const prisma = new PrismaClient()

interface NewCourse extends Course {
    categories: string[]
}

interface CourseRequest extends NextApiRequest {
    query: {
        id?: string,
        page?: number
    },
    body: NewCourse
}

export default async function handler(req: CourseRequest, res: NextApiResponse) {
    try {
        switch(req.method){
            case 'GET': return await GetCourses(req, res); break;
            case 'POST': return await CreateCourse(req, res); break;
        }
    }
    catch(e){
        console.error(e)
        return res.status(500);
    }
}

const GetCourses = async (req: CourseRequest, res: NextApiResponse) => {
    const token = await getToken({ req })
    if(!token || !token.email) return res.status(401);
    
    const user = await prisma.user.findFirst({
        where: { email: token.email }
    })

    if(!user) return res.status(401);
    
    const page = Math.max((req.query.page || 1), 1) - 1,
        pageSize = 6

    const courses = await prisma.course.findMany({
        skip: page * 10,
        take: pageSize,
        orderBy: { name: 'desc' },
        include: {
            categories: true
        },
        where: {
            OR: [
                { // if user is a contributor to the course
                    contributors: {
                        every: {
                            userId: user.id
                        }
                    }
                }
                // if user is a member of the course
                // if user has access to course via a class
            ]
        }
    })

    const totalCourses = await prisma.course.count({
        where: {
            OR: [
                { // if user is a contributor to the course
                    contributors: {
                        every: {
                            userId: user.id
                        }
                    }
                }
                // if user is a member of the course
                // if user has access to course via a class
            ]
        }
    })

    return res.status(200).json({
        courses: courses,
        pageSize,
        pages: Math.round(totalCourses / pageSize)
    })
}

const CreateCourse = async (req: CourseRequest, res: NextApiResponse) => {
    const token = await getToken({ req })
    if(!token || !token.email) return res.status(401);
    
    const creator = await prisma.user.findFirst({
        where: { email: token.email }
    })

    if(!creator) return res.status(401);

    const newCourse = await prisma.course.create({
        data: {
            name: req.body.name,
            description: req.body.description,
            categories: {
                create: req.body.categories?.map(category => ({ name: category }))
            },
            contributors: {
                create: [{ userId: creator.id }]
            }
        }
    })

    return res.status(200).json(newCourse)
}