import type { LogRecord } from '../types/dashboard'
import raw from './sampleLogs.json'

// Muestra de 50 registros reales de access_logs.json.
export const sampleLogs = raw as LogRecord[]
