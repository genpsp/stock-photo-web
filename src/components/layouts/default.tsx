import Navbar from '@/components/parts/Navbar'
import Footer from '@/components/parts/Footer'
import { ReactNode } from 'react'
import { css } from '@emotion/react'

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
`
