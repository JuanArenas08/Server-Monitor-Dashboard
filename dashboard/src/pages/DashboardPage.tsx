import { useMemo } from 'react'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'

import DashboardLayout from '../components/layout/DashboardLayout'
import DashboardHeader from '../components/layout/DashboardHeader'
import FilterBar from '../components/filters/FilterBar'
import KpiCard from '../components/common/KpiCard'
import SectionCard from '../components/common/SectionCard'
import RequestsLineChart from '../components/charts/RequestsLineChart'
import StatusCodeBars from '../components/charts/StatusCodeBars'
import MethodsDonut from '../components/charts/MethodsDonut'
import RequestsLogSection from '../components/logs/RequestsLogSection'

import { sampleLogs } from '../data/sampleLogs'
import { DEFAULT_FILTERS, PAGE_SIZE } from '../constants'
import { filterLogs } from '../utils/filterLogs'
import {
  buildCodeStats,
  buildDailyCounts,
  buildMethodStats,
  computeKpis,
} from '../utils/metrics'
import { formatNumber, formatPercent } from '../utils/format'
import type { Filters } from '../types/dashboard'

export default function DashboardPage() {
  // Por ahora los filtros son fijos: la interacción con useState
  const filters: Filters = DEFAULT_FILTERS
  const logs = useMemo(() => filterLogs(sampleLogs, filters), [filters])
  const kpis = useMemo(() => computeKpis(logs), [logs])
  const dailyCounts = useMemo(() => buildDailyCounts(logs), [logs])
  const codeStats = useMemo(() => buildCodeStats(logs), [logs])
  const methodStats = useMemo(() => buildMethodStats(logs), [logs])

  return (
    <DashboardLayout>
      <Stack spacing={3}>
        <DashboardHeader
          title="Web Server Monitoring"
          subtitle="Registros de acceso HTTP de una empresa SaaS con 3 servidores"
          dataInfo="Datos: 01/01/2024 – 06/02/2024 · 5.000 registros"
        />

        <FilterBar filters={filters} onFilterChange={() => {}} />

        {/* KPI: 3 en una fila */}
        <Grid container spacing={2}>
          <Grid size={4}>
            <KpiCard
              title="Solicitudes"
              value={formatNumber(kpis.totalRequests)}
              subtitle={`≈ ${kpis.requestsPerDay} por día`}
            />
          </Grid>
          <Grid size={4}>
            <KpiCard
              title="Tasa de errores"
              value={formatPercent(kpis.errorRate)}
              subtitle={`${formatNumber(kpis.errorCount)} solicitudes (códigos ≥ 400)`}
              variant="error"
            />
          </Grid>
          <Grid size={4}>
            <KpiCard
              title="Tiempo promedio de respuesta"
              value={`${formatNumber(kpis.avgResponseMs)} ms`}
              subtitle="Promedio de response_time_ms"
            />
          </Grid>
        </Grid>

        {/* Gráficos */}
        <SectionCard
          title="Solicitudes a lo largo del tiempo"
          subtitle="Número de solicitudes por día"
        >
          <RequestsLineChart data={dailyCounts} />
        </SectionCard>

        <Grid container spacing={2}>
          <Grid size={7}>
            <SectionCard title="Códigos HTTP" subtitle="Cantidad de solicitudes por código de estado">
              <StatusCodeBars items={codeStats} />
            </SectionCard>
          </Grid>
          <Grid size={5}>
            <SectionCard title="Métodos HTTP" subtitle="Proporción de solicitudes por método">
              <MethodsDonut items={methodStats} />
            </SectionCard>
          </Grid>
        </Grid>

        {/* Tabla */}
        <SectionCard title="Registro de Solicitudes">
          <RequestsLogSection
            key={`${filters.dateRange}-${filters.serverId}`}
            logs={logs}
            pageSize={PAGE_SIZE}
          />
        </SectionCard>
      </Stack>
    </DashboardLayout>
  )
}
