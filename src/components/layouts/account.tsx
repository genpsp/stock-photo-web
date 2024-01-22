import Footer from '@/components/parts/Footer'
import { Container } from '@mui/material'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function AccountLayout({ children }: Props) {
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ mb: 4, minHeight: '100vh' }}
    >
      <main>{children}</main>
      <Footer />
    </Container>
  )
}
