import type {
  CodeStat,
  DailyCount,
  KpiData,
  LogRecord,
  MethodStat,
} from '../types/dashboard'

export function computeKpis(logs: LogRecord[]): KpiData {
  const total = logs.length
  const errorCount = logs.filter((l) => Number(l.status_code) >= 400).length
  const sumMs = logs.reduce((acc, l) => acc + l.response_time_ms, 0)
  const days = new Set(logs.map((l) => l.timestamp.slice(0, 10))).size

  return {
    totalRequests: total,
    requestsPerDay: days ? Math.round(total / days) : 0,
    errorRate: total ? (errorCount / total) * 100 : 0,
    errorCount,
    avgResponseMs: total ? Math.round(sumMs / total) : 0,
  }
}

// agrupar por día -> [{ date, count }]
export function buildDailyCounts(logs: LogRecord[]): DailyCount[] {
  return []
}

// contar por status_code -> [{ code, count, percentage }]
export function buildCodeStats(logs: LogRecord[]): CodeStat[] {
  return []
}

// contar por method -> [{ method, count, percentage }]
export function buildMethodStats(logs: LogRecord[]): MethodStat[] {
  return []
}
