import ChartPlaceholder from './ChartPlaceholder'
import type { MethodStat } from '../../types/dashboard'

interface MethodsDonutProps {
  items: MethodStat[]
}

export default function MethodsDonut({ items }: MethodsDonutProps) {
  return <ChartPlaceholder name="MethodsDonut" itemCount={items.length} />
}
