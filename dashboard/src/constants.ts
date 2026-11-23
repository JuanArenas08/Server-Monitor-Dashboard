import type { Filters, LogColumn, SelectOption } from './types/dashboard'

export const DATE_RANGE_OPTIONS: SelectOption[] = [
  { value: 'all', label: '01/01/2024 – 06/02/2024' },
  { value: 'january', label: 'Enero 2024' },
  { value: 'february', label: 'Febrero 2024' },
]

export const SERVER_OPTIONS: SelectOption[] = [
  { value: 'all', label: 'Todos' },
  { value: '1', label: 'Servidor 1' },
  { value: '2', label: 'Servidor 2' },
  { value: '3', label: 'Servidor 3' },
]

export const DEFAULT_FILTERS: Filters = { dateRange: 'all', serverId: 'all' }

export const PAGE_SIZE = 5

export const COLUMNS_DESKTOP: LogColumn[] = [
  { key: 'timestamp', label: 'Fecha y hora' },
  { key: 'server_id', label: 'Servidor' },
  { key: 'method', label: 'Método' },
  { key: 'status_code', label: 'Código' },
  { key: 'response_time_ms', label: 'Tiempo (ms)' },
]
