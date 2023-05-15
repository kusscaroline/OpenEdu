import React, { useContext } from 'react'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useSession, signIn, signOut } from "next-auth/react"
import ImageDepthMap from '../../../components/depth-map/ImageDepthMap'
import { useEffect } from 'react'
import Main from '@/components/layout/main'
import Link from 'next/link'
import Button from '@mui/material/Button';
import { Container, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { PageHeading } from '@/components/headings'
import { SettingsContext } from '@/components/contexts/settingsContext'

import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';

const inter = Inter({ subsets: ['latin'] })

export default function Settings() {
  const { data: session } = useSession()
  const { appSettings, setAppSettings } = useContext(SettingsContext)


  return (
    <Main className='w-screen h-screen flex'>
      <Container>
        <PageHeading>Settings</PageHeading>
        <Typography variant='subtitle1' color='text.secondary' gutterBottom>
          More content will come to this page soon, but for now you can just...
        </Typography>
        <Button onClick={() => signOut()}>Sign out</Button>

        <Typography color='text.secondary'>Mode</Typography>
        <ToggleButtonGroup 
          value={appSettings.theme}
          exclusive
          onChange={(event: React.MouseEvent<HTMLElement>, theme: string) => {
            if(!theme) return;
            setAppSettings({ ...appSettings, theme })
          }}
        >
          <ToggleButton value="light" key="light">
            <LightModeIcon/>
          </ToggleButton>
          <ToggleButton value="system" key="system">
            <SettingsBrightnessIcon/>
          </ToggleButton>
          <ToggleButton value="dark" key="dark">
            <DarkModeIcon/>
          </ToggleButton>
        </ToggleButtonGroup>
      </Container>
    </Main>
  )
  
}
