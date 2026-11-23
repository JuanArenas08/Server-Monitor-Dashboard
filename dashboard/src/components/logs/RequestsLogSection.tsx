import { useMemo, useState } from 'react'
import RequestsTable from './RequestsTable'
import { COLUMNS_DESKTOP } from '../../constants'
import type { LogRecord } from '../../types/dashboard'

interface RequestsLogSectionProps {
  logs: LogRecord[]
  pageSize: number
}

// Administra el orden y la navegación de los registros.
// El padre le pasa un key que cambia con los filtros, así su estado se reinicia.
export default function RequestsLogSection({
  logs,
  pageSize,
}: RequestsLogSectionProps) {
  const [page, setPage] = useState(0)

  // Más reciente primero
  const sorted = useMemo(
    () => [...logs].sort((a, b) => b.timestamp.localeCompare(a.timestamp)),
    [logs],
  )

  const rows = sorted.slice(page * pageSize, (page + 1) * pageSize)

  return (
    <RequestsTable
      rows={rows}
      columns={COLUMNS_DESKTOP}
      page={page}
      pageSize={pageSize}
      totalRecords={sorted.length}
      onPageChange={setPage}
    />
  )
}
