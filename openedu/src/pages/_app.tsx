import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { OpenEduProvider } from '@/OpenEdu-UI/provider'
import { SettingsContextProvider } from '@/components/contexts/settingsContext'

export default function App({ 
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <OpenEduProvider API_URL='http://localhost:3000/api' session={session}>
        <SettingsContextProvider>
          <Component {...pageProps} />
        </SettingsContextProvider>
      </OpenEduProvider>
    </SessionProvider>
  )
}
