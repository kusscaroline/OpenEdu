import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useSession, signIn, signOut } from "next-auth/react"
import ImageDepthMap from '../components/depth-map/ImageDepthMap'
import { useEffect } from 'react'
import { redirect } from 'next/navigation';
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { data: session } = useSession(),
    router = useRouter()

  if(session) router.push('/admin/dashboard')

  return (
    <div className='w-screen h-screen flex'>
      <div className='m-auto'>
        {!session && (
          <>
            Not signed in <br />
            <button onClick={() => signIn(undefined, { callbackUrl: '/admin/dashboard' })}>Sign in</button>
          </>
        )}
      </div>
    </div>
  )
}
