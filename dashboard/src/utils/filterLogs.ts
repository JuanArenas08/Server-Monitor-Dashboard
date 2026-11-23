import type { Filters, LogRecord } from '../types/dashboard'

export function filterLogs(logs: LogRecord[], filters: Filters): LogRecord[] {
  return logs.filter((log) => {
    const matchServer =
      filters.serverId === 'all' || log.server_id === filters.serverId

    const month = log.timestamp.slice(0, 7) // YYYY-MM
    const matchDate =
      filters.dateRange === 'all' ||
      (filters.dateRange === 'january' && month === '2024-01') ||
      (filters.dateRange === 'february' && month === '2024-02')

    return matchServer && matchDate
  })
}
