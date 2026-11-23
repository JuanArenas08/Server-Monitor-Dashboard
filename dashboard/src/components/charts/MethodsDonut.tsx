import ChartPlaceholder from './ChartPlaceholder'
import type { MethodStat } from '../../types/dashboard'

interface MethodsDonutProps {
  items: MethodStat[]
}

export default function MethodsDonut({ items }: MethodsDonutProps) {
  // Gráfico de dona por método HTTP
  return <ChartPlaceholder name="MethodsDonut" itemCount={items.length} />
}
