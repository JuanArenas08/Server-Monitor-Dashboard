# Dashboard de Monitoreo de Servidor Web

Proyecto 03 – Desarrollo de Aplicaciones Web y Móviles

**Integrantes:** Windsor Estrada, Juan Arenas

Dashboard para analizar registros de acceso HTTP de una empresa SaaS con tres servidores

## Estado actual: Sprint 1 – Transformación de datos CSV a JSON

Se convierte el dataset `access_logs.csv` a `access_logs.json` para almacenarlo en Firebase y usarlo después en el dashboard.

## Estructura del repositorio

```
.
├── README.md
├── .gitignore
├── data/
│   ├── access_logs.csv # Dataset original (5.000 registros)
│   └── access_logs.json # Dataset transformado
└── scripts/
    └── csv_to_json.py # Script de transformación y validación
```

## Fuente de datos

- Dataset: *Web Server Access Logs (Synthetic)*, Mindweave Technologies, Hugging Face
- Enlace: https://huggingface.co/datasets/mindweave/web-server-logs
- Subconjunto usado: `access_logs` (periodo 01/01/2024 – 06/02/2024)
- Licencia: CC BY-NC 4.0 (uso no comercial). Datos sintéticos, sin información de personas reales.

## Requisitos

- Python 3.8

## Cómo ejecutar la transformación

```bash
python scripts/csv_to_json.py data/access_logs.csv data/access_logs.json
```

El script genera el JSON e imprime un reporte de validación.

## Reglas de transformación

| Tipo | Campos | Resultado en JSON |
|---|---|---|
| Temporal | `timestamp` | Texto ISO 8601 (`2024-01-01T00:15:12`) |
| Categóricas | `server_id`, `method`, `path`, `status_code`, `user_agent`, `ip_address`, `referrer` | Cadena de texto |
| Numéricas | `response_time_ms`, `bytes_sent` | Número entero |

- Se eliminan los espacios en blanco al inicio y al final de cada valor.
- Los valores vacíos se guardan como `null` y se reportan en la validación.
- Los métodos y códigos HTTP inconsistentes se reportan en la validación.

## Ejemplo de registro

```json
{
  "timestamp": "2024-01-01T00:15:12",
  "server_id": "1",
  "method": "GET",
  "path": "/api/v2/payments/process",
  "status_code": "201",
  "user_agent": "Go-http-client/2.0",
  "ip_address": "107.8.181.20",
  "referrer": "https://www.bing.com/",
  "response_time_ms": 153,
  "bytes_sent": 2256
}
```

## Resultado de la validación (dataset actual)

- 5.000 registros en el CSV y 5.000 en el JSON
- 10 campos por registro, sin valores nulos ni duplicados exactos
- Fechas del 2024-01-01 al 2024-02-06
