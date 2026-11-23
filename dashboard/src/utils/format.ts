const nf = new Intl.NumberFormat('es-EC')

export const formatNumber = (n: number) => nf.format(n)

export const formatPercent = (n: number) => `${n.toFixed(1).replace('.', ',')} %`

// 2024-01-01T00:15:12 -> 01/01/2024 00:15:12
export function formatDateTime(iso: string): string {
  const [date, time] = iso.split('T')
  const [y, m, d] = date.split('-')
  return `${d}/${m}/${y} ${time}`
}
