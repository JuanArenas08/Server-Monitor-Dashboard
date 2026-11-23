import type { LogRecord } from '../types/dashboard'
import raw from './sampleLogs.json'

// Muestra de 50 registros reales de access_logs.json.
// Reemplazar por la carga desde Firebase.
export const sampleLogs = raw as LogRecord[]
