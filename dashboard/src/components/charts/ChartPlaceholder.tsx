import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

interface ChartPlaceholderProps {
  name: string
  itemCount: number
  height?: number
}

export default function ChartPlaceholder({
  name,
  itemCount,
  height = 200,
}: ChartPlaceholderProps) {
  return (
    <Box
      sx={{
        height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px dashed',
        borderColor: 'divider',
        borderRadius: 2,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {name}: {itemCount} elementos recibidos
      </Typography>
    </Box>
  )
}
