
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export default async function handler(req, res) {
    await prisma.user.create({
        data: {
            firstName: 'Darryl',
            lastName: 'Huffman',
            email: 'darryl@gmail.com',
            password: 'test123'
        }
    })
    res.status(200).json({ name: 'John Doe' })
}