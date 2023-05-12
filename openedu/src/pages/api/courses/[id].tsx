import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client'
import { Course } from "@prisma/client";
import { getToken } from "next-auth/jwt"

const prisma = new PrismaClient()

interface CourseRequest extends NextApiRequest {
    query: {
        id: string
    },
    body: Course
}

export default async function handler(request: CourseRequest, response: NextApiResponse) {
    console.log(request.query)
    try {
        switch(request.method){
            case 'GET': return await GetCourse(request, response); break;
            case 'PUT': return await UpdateCourse(request, response); break;
            // create in course/index.tsx because it takes no URL param
            case 'DELETE': return await DeleteCourse(request, response); break;
        }
    }
    catch(e){
        return response.status(500);
    }
}

const GetCourse = async (request: CourseRequest, response: NextApiResponse) => {
    const courseId = request.query.id
    if(!courseId || typeof courseId !== 'string') return response.status(404);

    return response.status(200).json(
        await prisma.course.findFirst({
            where: {
                id: courseId
            },
            include: {
                assignments: {
                    include: {
                        modules: true
                    }
                },
                categories: true,
                contributors: {
                    select: {
                        user: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true
                            }
                        }
                    }
                }
            }
        })
    )
}

const UpdateCourse = async (request: CourseRequest, response: NextApiResponse) => {
    const courseId = request.query.id
    return response.status(501);
}

const DeleteCourse = async (request: CourseRequest, response: NextApiResponse) => {
    const courseId = request.query.id
    return response.status(501);
}