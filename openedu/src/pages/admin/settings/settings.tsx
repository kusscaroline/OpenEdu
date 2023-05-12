import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useSession, signIn, signOut } from "next-auth/react"
import ImageDepthMap from '../../../components/depth-map/ImageDepthMap'
import { useEffect } from 'react'
import Main from '@/components/layout/main'
import Link from 'next/link'
import Button from '@mui/material/Button';
import { Container, Typography } from '@mui/material'
import { PageHeading } from '@/components/headings'

const inter = Inter({ subsets: ['latin'] })

export default function Settings() {
  const { data: session } = useSession()

  return (
    <Main className='w-screen h-screen flex'>
      <Container>
        <PageHeading>Settings</PageHeading>
        <Typography variant='subtitle1' color='text.secondary' gutterBottom>
          More content will come to this page soon, but for now you can just...
        </Typography>
        <Button onClick={() => signOut()}>Sign out</Button>
      </Container>
    </Main>
  )
}
