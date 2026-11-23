import ChartPlaceholder from './ChartPlaceholder'
import type { CodeStat } from '../../types/dashboard'

interface StatusCodeBarsProps {
  items: CodeStat[]
}

export default function StatusCodeBars({ items }: StatusCodeBarsProps) {
  // Barras horizontales por código HTTP
  return <ChartPlaceholder name="StatusCodeBars" itemCount={items.length} />
}
