import ChartPlaceholder from './ChartPlaceholder'
import type { DailyCount } from '../../types/dashboard'

interface RequestsLineChartProps {
  data: DailyCount[]
}

export default function RequestsLineChart({ data }: RequestsLineChartProps) {
  return <ChartPlaceholder name="RequestsLineChart" itemCount={data.length} height={260} />
}
