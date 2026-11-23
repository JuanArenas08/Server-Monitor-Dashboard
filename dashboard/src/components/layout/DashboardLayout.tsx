import type { ReactNode } from 'react'
import Container from '@mui/material/Container'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 } }}>
      {children}
    </Container>
  )
}
