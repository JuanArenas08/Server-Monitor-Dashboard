import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import StatusBadge from '../common/StatusBadge'
import { formatDateTime, formatNumber } from '../../utils/format'
import type { LogColumn, LogRecord } from '../../types/dashboard'

interface RequestsTableProps {
  rows: LogRecord[]
  columns: LogColumn[]
  page: number
  pageSize: number
  totalRecords: number
  isMobile: boolean
  onPageChange: (page: number) => void
  onLoadMore: () => void
}

function renderCell(row: LogRecord, key: LogColumn['key']) {
  switch (key) {
    case 'timestamp':
      return formatDateTime(row.timestamp)
    case 'server_id':
      return `Servidor ${row.server_id}`
    case 'status_code':
      return <StatusBadge code={Number(row.status_code)} />
    case 'response_time_ms':
      return formatNumber(row.response_time_ms)
    default:
      return row[key]
  }
}

export default function RequestsTable({
  rows,
  columns,
  page,
  pageSize,
  totalRecords,
  isMobile,
  onPageChange,
  onLoadMore,
}: RequestsTableProps) {
  return (
    <>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              {columns.map((c) => (
                <TableCell key={c.key}>{c.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow key={`${row.timestamp}-${i}`}>
                {columns.map((c) => (
                  <TableCell key={c.key}>{renderCell(row, c.key)}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {isMobile ? (
        // Móvil: botón "Ver más registros" (solo si quedan registros)
        rows.length < totalRecords && (
          <Button fullWidth variant="outlined" sx={{ mt: 2 }} onClick={onLoadMore}>
            Ver más registros
          </Button>
        )
      ) : (
        // Escritorio: paginación
        <TablePagination
          component="div"
          count={totalRecords}
          page={page}
          rowsPerPage={pageSize}
          rowsPerPageOptions={[]}
          onPageChange={(_, newPage) => onPageChange(newPage)}
        />
      )}
    </>
  )
}
