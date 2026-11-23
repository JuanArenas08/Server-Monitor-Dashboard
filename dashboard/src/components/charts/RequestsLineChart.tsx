import ChartPlaceholder from './ChartPlaceholder'
import type { DailyCount } from '../../types/dashboard'

interface RequestsLineChartProps {
  data: DailyCount[]
}

export default function RequestsLineChart({ data }: RequestsLineChartProps) {
  // Dibujar el gráfico de líneas (solicitudes por día)
  return <ChartPlaceholder name="RequestsLineChart" itemCount={data.length} height={260} />
}
