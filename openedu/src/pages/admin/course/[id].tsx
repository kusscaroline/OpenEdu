import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useSession, signIn, signOut } from "next-auth/react"
import ImageDepthMap from '../../../components/depth-map/ImageDepthMap'
import { useEffect } from 'react'
import Main from '@/components/layout/main'
import NextLink from 'next/link'
import Button from '@mui/material/Button';
import { Container, Typography, Breadcrumbs, Link } from '@mui/material'
import { PageHeading } from '@/components/headings'
import { useRouter } from 'next/router';

import NavigateNextIcon from '@mui/icons-material'

import Course from '@/OpenEdu-UI/course'

import { useCourses } from '@/OpenEdu-UI/hooks/courses'

const inter = Inter({ subsets: ['latin'] })

export default function CourseDetails() {
  const router = useRouter(),
        { data: session } = useSession()

  return (
    <Main>
      <Container>
        <Course 
          mode='edit'
          topContent={({course}) => (
            <>
              <Breadcrumbs aria-label="breadcrumb">
                <NextLink href='/admin/courses'>
                  <Link 
                    underline="hover"
                    color="inherit"
                  >
                    Courses
                  </Link>
                </NextLink>
                <NextLink href={'/admin/course/' + course.id}>
                  <Link 
                    underline="hover"
                    color="inherit"
                  >
                    {course.name}
                  </Link>
                </NextLink>
              </Breadcrumbs>
            <PageHeading>{course.name}</PageHeading>
          </>
          )}
          courseId={router.query.id} 
        />
      </Container>
    </Main>
  )
}
