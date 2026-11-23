import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

interface DashboardHeaderProps {
  title: string
  subtitle: string
  dataInfo: string
}

export default function DashboardHeader({
  title,
  subtitle,
  dataInfo,
}: DashboardHeaderProps) {
  return (
    <Stack
      direction="row"
      spacing={0.5}
      sx={{ justifyContent: 'space-between', alignItems: 'flex-end' }}
    >
      <div>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      </div>
      <Typography variant="caption" color="text.secondary">
        {dataInfo}
      </Typography>
    </Stack>
  )
}
