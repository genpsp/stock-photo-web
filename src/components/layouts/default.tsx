import Footer from '@/components/parts/Footer'
import Navbar from '@/components/parts/Navbar'
import { css } from '@mui/material'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function DefaultLayout({ children }: Props) {
  return (
    <>
      <Navbar />
      <main css={mainStyle}>{children}</main>
      <Footer />
    </>
  )
}

const mainStyle = css`
  background-image: url('/top_background.png');
  background-size: contain;
  background-repeat: no-repeat;
  min-height: 100vw;
`
