import { useMemo, useState } from 'react'
import RequestsTable from './RequestsTable'
import { COLUMNS_DESKTOP, COLUMNS_MOBILE } from '../../constants'
import type { LogRecord } from '../../types/dashboard'

interface RequestsLogSectionProps {
  logs: LogRecord[]
  pageSize: number
  isMobile: boolean
}

// Administra el orden y la navegación de los registros.
// El padre le pasa un key que cambia con los filtros, así su estado se reinicia.
export default function RequestsLogSection({
  logs,
  pageSize,
  isMobile,
}: RequestsLogSectionProps) {
  const [page, setPage] = useState(0) // escritorio
  const [visibleCount, setVisibleCount] = useState(pageSize) // móvil

  // Más reciente primero
  const sorted = useMemo(
    () => [...logs].sort((a, b) => b.timestamp.localeCompare(a.timestamp)),
    [logs],
  )

  const rows = isMobile
    ? sorted.slice(0, visibleCount)
    : sorted.slice(page * pageSize, (page + 1) * pageSize)

  return (
    <RequestsTable
      rows={rows}
      columns={isMobile ? COLUMNS_MOBILE : COLUMNS_DESKTOP}
      page={page}
      pageSize={pageSize}
      totalRecords={sorted.length}
      isMobile={isMobile}
      onPageChange={setPage}
      onLoadMore={() => setVisibleCount((c) => c + pageSize)}
    />
  )
}
