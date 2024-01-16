import { app } from '@/lib/firebase/init'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  const firebaseApp = app
  return <Component {...pageProps} />
}
