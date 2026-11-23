import Chip from '@mui/material/Chip'

interface StatusBadgeProps {
  code: number
}

function colorFor(code: number) {
  if (code >= 500) return 'error'
  if (code >= 400) return 'warning'
  if (code >= 300) return 'info'
  return 'success'
}

export default function StatusBadge({ code }: StatusBadgeProps) {
  return <Chip label={code} size="small" color={colorFor(code)} variant="outlined" />
}
