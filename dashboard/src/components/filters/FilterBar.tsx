import Stack from '@mui/material/Stack'
import SelectFilter from './SelectFilter'
import { DATE_RANGE_OPTIONS, SERVER_OPTIONS } from '../../constants'
import type { DateRangeKey, Filters } from '../../types/dashboard'

interface FilterBarProps {
  filters: Filters
  onFilterChange: (filters: Filters) => void
}

export default function FilterBar({ filters, onFilterChange }: FilterBarProps) {
  return (
    <Stack direction="row" spacing={2}>
      <SelectFilter
        label="Fecha"
        value={filters.dateRange}
        options={DATE_RANGE_OPTIONS}
        onChange={(v) =>
          onFilterChange({ ...filters, dateRange: v as DateRangeKey })
        }
      />
      <SelectFilter
        label="Servidor"
        value={filters.serverId}
        options={SERVER_OPTIONS}
        onChange={(v) => onFilterChange({ ...filters, serverId: v })}
      />
    </Stack>
  )
}
