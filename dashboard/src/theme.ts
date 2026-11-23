import { createTheme } from '@mui/material/styles'

// El punto de quiebre de escritorio/móvil definido en Planificación es 768px:
// "md" arriba = escritorio, "md" abajo = móvil.
const theme = createTheme({
  breakpoints: {
    values: { xs: 0, sm: 600, md: 768, lg: 1200, xl: 1536 },
  },
  palette: {
    background: { default: '#f1f3f8' },
  },
  shape: { borderRadius: 12 },
  // Ajustar colores y tipografía según el Figma
})

export default theme
