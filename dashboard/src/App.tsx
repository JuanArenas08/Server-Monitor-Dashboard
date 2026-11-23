import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

// Verificar que Vite + TypeScript + Material UI funcionan.
export default function App() {
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
        Web Server Monitoring
      </Typography>
      <Button variant="contained" sx={{ mt: 2 }}>
        Material UI listo
      </Button>
    </Container>
  )
}
