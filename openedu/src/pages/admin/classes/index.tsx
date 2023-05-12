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

export default function Classes() {
  const { data: session } = useSession()

  return (
    <Main>
      <Container>
        <PageHeading>Classes</PageHeading>
        <Typography variant='subtitle1' color='text.secondary' gutterBottom>
            Info coming soon...
        </Typography>
      </Container>
    </Main>
  )
}
