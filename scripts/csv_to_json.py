#!/usr/bin/env python3
import csv
import json
import sys
from collections import Counter
from datetime import datetime

COLUMNAS = ["timestamp", "server_id", "method", "path", "status_code", "user_agent",
            "ip_address", "referrer", "response_time_ms", "bytes_sent"]
CATEGORICAS = ["server_id", "method", "path", "status_code", "user_agent", "ip_address", "referrer"]
NUMERICAS = ["response_time_ms", "bytes_sent"]
METODOS = {"GET", "POST", "PUT", "DELETE", "PATCH"}
FORMATOS_FECHA = ("%Y-%m-%d %H:%M:%S", "%Y-%m-%dT%H:%M:%S", "%Y-%m-%d %H:%M:%S.%f")

def limpiar(valor):
    if valor is None:
        return None
    valor = valor.strip()
    return valor if valor != "" else None

def parsear_fecha(texto):
    for fmt in FORMATOS_FECHA:
        try:
            return datetime.strptime(texto, fmt).strftime("%Y-%m-%dT%H:%M:%S")
        except ValueError:
            continue
    return None


def parsear_numero(texto):
    try:
        return int(float(texto))
    except (TypeError, ValueError):
        return None


def transformar(ruta_csv):
    registros, problemas = [], []
    with open(ruta_csv, newline="", encoding="utf-8-sig") as f:
        lector = csv.DictReader(f)
        faltantes = [c for c in COLUMNAS if c not in (lector.fieldnames or [])]
        if faltantes:
            sys.exit(f"ERROR: faltan columnas en el CSV: {faltantes}")
        for n, fila in enumerate(lector, start=2):  # línea 1 = encabezado
            reg = {}
            fila = {c: limpiar(fila.get(c)) for c in COLUMNAS}
            # temporal
            if fila["timestamp"] is None:
                reg["timestamp"] = None
                problemas.append((n, "timestamp", "vacío"))
            else:
                iso = parsear_fecha(fila["timestamp"])
                reg["timestamp"] = iso
                if iso is None:
                    problemas.append((n, "timestamp", f"formato inválido: {fila['timestamp']}"))
            # categóricas (siempre string)
            for c in CATEGORICAS:
                v = fila[c]
                reg[c] = str(v) if v is not None else None
                if v is None:
                    problemas.append((n, c, "vacío"))
            # numéricas
            for c in NUMERICAS:
                v = parsear_numero(fila[c]) if fila[c] is not None else None
                reg[c] = v
                if v is None:
                    problemas.append((n, c, f"vacío o no numérico: {fila[c]}"))
                elif v < 0:
                    problemas.append((n, c, f"valor negativo: {v}"))
            # consistencia
            if reg["method"] and reg["method"].upper() not in METODOS:
                problemas.append((n, "method", f"método desconocido: {reg['method']}"))
            sc = reg["status_code"]
            if sc and not (sc.isdigit() and 100 <= int(sc) <= 599):
                problemas.append((n, "status_code", f"código HTTP fuera de rango: {sc}"))
            registros.append(reg)
    return registros, problemas


def validar(registros, problemas, ruta_json):
    # Releer el JSON escrito para validar el archivo final, no la memoria
    with open(ruta_json, encoding="utf-8") as f:
        datos = json.load(f)
    print("=== VALIDACIÓN DEL JSON ===")
    print(f"Es lista: {isinstance(datos, list)}")
    print(f"Registros en JSON: {len(datos)} (CSV: {len(registros)})")
    print(f"Claves por registro: {Counter(len(r) for r in datos)}")
    tipos_ok = all(
        all(isinstance(r[c], (str, type(None))) for c in CATEGORICAS)
        and all(isinstance(r[c], (int, type(None))) for c in NUMERICAS)
        for r in datos)
    print(f"Tipos correctos (categóricas=str, numéricas=int): {tipos_ok}")
    fechas = sorted(r["timestamp"] for r in datos if r["timestamp"])
    if fechas:
        print(f"Rango de fechas: {fechas[0]} -> {fechas[-1]}")
    nulos = Counter(c for r in datos for c in COLUMNAS if r[c] is None)
    print(f"Valores nulos por campo: {dict(nulos) or 'ninguno'}")
    dup = len(datos) - len({json.dumps(r, sort_keys=True) for r in datos})
    print(f"Registros duplicados exactos: {dup}")
    print(f"Métodos: {dict(Counter(r['method'] for r in datos))}")
    print(f"Códigos HTTP: {dict(Counter(r['status_code'] for r in datos))}")
    print(f"Problemas detectados: {len(problemas)}")
    for p in problemas[:20]:
        print(f"  línea {p[0]} | {p[1]} | {p[2]}")


def main():
    if len(sys.argv) != 3:
        sys.exit("Uso: python scripts/csv_to_json.py entrada.csv salida.json")
    ruta_csv, ruta_json = sys.argv[1], sys.argv[2]
    registros, problemas = transformar(ruta_csv)
    with open(ruta_json, "w", encoding="utf-8") as f:
        json.dump(registros, f, ensure_ascii=False, indent=2)
    print(f"Generado {ruta_json}")
    validar(registros, problemas, ruta_json)


if __name__ == "__main__":
    main()
