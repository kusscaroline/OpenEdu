import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useSession, signIn, signOut } from "next-auth/react"
import ImageDepthMap from '../../components/depth-map/ImageDepthMap'
import { useEffect } from 'react'
import Main from '@/components/layout/main'
import { Container, Typography } from '@mui/material'
import { PageHeading } from '@/components/headings'
import OpenEduLogo from '@/components/OpenEduLogo'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { data: session } = useSession()
  if(!session) return null;

  const { user } = session

  return (
    <Main>
        <Container>
          <PageHeading>
            <span style={{ display: 'inline-block' }} className='me-2'><OpenEduLogo width={40} height={40} /></span>
            OpenEdu
          </PageHeading>
          <Typography variant='subtitle1' color='text.secondary' gutterBottom>
            Hello {user.email}
          </Typography>
        </Container>
    </Main>
  )
}
