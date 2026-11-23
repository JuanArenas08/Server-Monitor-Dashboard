import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import type { KpiVariant } from '../../types/dashboard'

interface KpiCardProps {
  title: string
  value: string
  subtitle?: string
  variant?: KpiVariant
}

export default function KpiCard({
  title,
  value,
  subtitle,
  variant = 'default',
}: KpiCardProps) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
        <Typography
          variant="h4"
          component="div"
          sx={{
            fontWeight: 'bold',
            color: variant === 'error' ? 'error.main' : 'text.primary',
          }}
        >
          {value}
        </Typography>
        {subtitle && (
          <Typography variant="caption" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}
