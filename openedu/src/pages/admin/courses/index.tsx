import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useSession, signIn, signOut } from "next-auth/react"
import ImageDepthMap from '../../../components/depth-map/ImageDepthMap'
import { useEffect } from 'react'
import Main from '@/components/layout/main'
import Link from 'next/link'
import Button from '@mui/material/Button';
import { 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  CardMedia, 
  CardActionArea, 
  CardActions, 
  Grid, 
  Stack, 
  Chip
} from '@mui/material'
import { PageHeading } from '@/components/headings'


import { useCourses } from '@/OpenEdu-UI/hooks/courses'

const inter = Inter({ subsets: ['latin'] })

export default function Courses() {
  const { data: session } = useSession(),
    { courses, getCourses, pages, page } = useCourses()

  useEffect(() => {
    getCourses()
  }, [])

  return (
    <Main>
      <Container>
        <PageHeading>Courses</PageHeading>
        <Grid container spacing={2} className='mt-5'>
          {courses.map(course => (
            <Grid item md={4} key={course.id}>
              <Card>
                <CardActionArea component="div">
                  <Link href={"/admin/course/" + course.id}>
                    <CardMedia
                      component="img"
                      height="100"
                      image="/images/stock/course.jpg"
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {course.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {course.description}
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ pt: 2}}>
                        {course.categories?.map(category => <Chip label={category.name} size='small' />)}
                      </Stack>
                    </CardContent>
                  </Link>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
            Page {page} of {pages}
        </Typography>
      </Container>
    </Main>
  )
}
