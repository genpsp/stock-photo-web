import Footer from '@/components/parts/Footer'
import { Container } from '@mui/material'
import { ReactNode } from 'react'

export default function AccountLayout({ children }: { children: ReactNode }) {
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
