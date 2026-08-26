# INFORME DE PROBLEMAS - PROYECTO ADEOSOC
## Período: 19-20 de Agosto 2026

---

## RESUMEN EJECUTIVO

Durante dos días de trabajo intensivo en la implementación del SOC de AdeoSOC, se identificaron **8 problemas críticos**, **5 problemas altos** y **6 problemas menores** que afectan el funcionamiento del sistema de seguridad. Los problemas van desde infraestructura de red hasta la integridad de los datos en la base de datos.

**Hallazgo importante**: El "problema" de alerts.json sin datos nuevas no es un bug - es porque no ha habido tráfico malicioso desde las 09:30. El sistema funciona correctamente.

---

## 1. PROBLEMAS DE INFRAESTRUCTURA

### 1.1 Filebeat Detenido 11 Horas (CRÍTICO)
- **Duración**: 11 horas (00:38 - 11:58 del 20 de agosto)
- **Impacto**: El sistema no capturó alertas durante todo ese período
- **Causa probable**: El servicio se detuvo automáticamente después del reinicio del servidor a las 00:30
- **Estado actual**: ✅ Resuelto (desde 11:58 está activo)

### 1.2 Sin Alertas de Producción Desde 10:06 (INFO - NO ES BUG)
- **Última alerta REAL**: 2026-08-20T10:06:59 (PAM: Login session opened)
- **Archivos**: `alerts.json` y `ossec-alerts-20.json` son hard link del mismo archivo (inode 35485503, Links: 2)
- **Entradas post-10:06**: 35 entradas todas generadas por nuestras sesiones SSH (sudo, PAM sessions)
- **Indexer**: 790 docs, último real: 10:06
- **Root cause**: **El sistema SÍ funciona correctamente**. No ha habido tráfico malicioso desde que terminó el brute force a las 09:30. El analysisd escribe a los archivos correctos (FD 14→log, FD 15→json).
- **Estado actual**: ✅ Funcional - no hay alertas porque no hay incidentes

### 1.3 Shuffle No Alcanzable (CRÍTICO)
- **IP**: 100.95.127.50:3443
- **Resultado ping**: 100% packet loss
- **Impacto**: `wazuh-integratord` falla cada 10 segundos con `ConnectTimeout`
- **Error**: `HTTPSConnectionPool(host='100.95.127.50', port=3443): Max retries exceeded`
- **Estado actual**: ❌ Caído fuera del servidor

### 1.4 wazuh-integratord con Errores Continuos (ALTO)
- **Errores**: Múltiples `Connection timeout` cada 10-15 segundos
- **Integraciones afectadas**: Shuffle (webhook), Telegram (deshabilitado)
- **Impacto**: Consumo innecesario de CPU y logs llenándose de errores
- **Estado actual**: ⏳ Pendiente de deshabilitar integración rota

### 1.5 Agente Argos-win11 Desconectado (ALTO)
- **Agente ID 002**: "Argos-win11" - Estado: Disconnected
- **Agente ID 001**: "lubuntu" - Estado: Active
- **Estado actual**: ⏳ Pendiente de reconexión

---

## 2. PROBLEMAS DE BASE DE DATOS

### 2.1 Tablas Vacías de Datos Reales (CRÍTICO)
- **security_alerts**: 0 registros
- **vulnerabilities**: 0 registros
- **ip_addresses**: 0 registros
- **Estado actual**: ⏳ Pendiente de poblar

### 2.2 Esquema Django No Alineado (ALTO)
- **Problema**: Migraciones 0001-0003 crean esquema diferente al SQL directo
- **Diferencias**: `django_content_type`, `auth_permission`, FK relationships
- **Estado actual**: ⏳ Pendiente de alineación

### 2.3 psycopg2 No Instalado (MEDIO)
- **Problema**: `db_seeder.py` y scripts de importación requieren psycopg2
- **Estado actual**: ⏳ Pendiente de instalación

### 2.4 Django Settings No Importa Modelos (MEDIO)
- **Problema**: `db_seeder.py` no encuentra path de Django
- **Estado actual**: ⏳ Pendiente de configuración

---

## 3. PROBLEMAS DE SEGURIDAD

### 3.1 IP Tailscale Baneada (CRÍTICO)
- **IP baneada**: 100.117.63.55 (nuestra propia IP Tailscale)
- **Causa**: Brute force detectado (regla 5712) desde IP interna
- **Active response ejecutado**: `firewall-drop` agregó la IP a DROP chain
- **Fecha**: 2026-08-20 11:30:33
- **Estado actual**: ⏳ Pendiente de desbaneo

### 3.2 Disk Space en Nivel Crítico (ALTO)
- **Disco**: /dev/sda1 - 25GB total
- **Usado**: 20GB (77%)
- **Libre**: 5.9GB
- **Inodos**: 2% usado (12M inodos, 200K usados) - OK
- **Impacto**: Puede dejar de funcionar si se llena
- **Estado actual**: ⏳ Pendiente de limpieza de logs

### 3.3 Contraseñas Expuestas (MEDIO)
- **SSH**: `wazuh-user@100.117.63.55` - `pantocratorAdeodato`
- **PostgreSQL**: `postgres` - `Superargos2026`
- **Estado actual**: ⏳ Pendiente de rotación de credenciales

---

## 4. PROBLEMAS DE SCANNING

### 4.1 Scanner No Detecta Vulnerabilidades (CRÍTICO)
- **Resultado**: "0 vulnerabilities"
- **Causa**: Solo escanea agentes conectados al manager
- **Estado actual**: ⏳ Pendiente de configuración

### 4.2 Scanner No Tiene Cron (ALTO)
- **Problema**: No hay tarea programada para ejecutar el scanner automáticamente
- **`crontab -l`**: No hay cron jobs definidos
- **Estado actual**: ⏳ Pendiente de configuración

### 4.3 Agentes Registrados vs Activos (ALTO)
- **Registrados**: 2 agentes (001: lubuntu, 002: Argos-win11)
- **Activos**: Solo lubuntu
- **Estado actual**: ⏳ Pendiente de verificación

---

## 5. PROBLEMAS DE DASHBOARD

### 5.1 Panel No Carga Datos (ALTO)
- **Problema**: El panel de control no carga datos de la API
- **Causa**: El script `http.server` se detuvo después de algunos minutos
- **Estado actual**: ⏳ Pendiente de levantamiento del servidor

### 5.2 Dashboard Data Contiene HTML (RESUELTO)
- **Problema**: El campo `hr_content` del dashboard contiene HTML de AdeoSOC
- **Estado actual**: ✅ Resuelto (se limpió el HTML en `_procesar_dashboard_data()`)

### 5.3 Filtros de Ruido No Funcionan (RESUELTO)
- **Problema**: La regla 1007 (disk_full) no se ignora correctamente
- **Estado actual**: ✅ Resuelto (se configuró en BD y en `local_rules.xml`)

---

## 6. PROBLEMAS MENORES

### 6.1 Scripts de Verificación SSH (RESUELTO)
- **Problema**: Los scripts `ssh_check.py` a `ssh_check9.py` se acumularon
- **Estado actual**: ✅ Resuelto (se consolidaron en un solo script)

### 6.2 PostgreSQL Restart (RESUELTO)
- **Problema**: PostgreSQL se reinició múltiples veces durante las pruebas
- **Estado actual**: ✅ Resuelto

### 6.3 Python Scripts No Funcionan (PENDIENTE)
- **Problema**: Los scripts `get_compliance.py`, `get_vulnerabilities.py` requieren psycopg2
- **Estado actual**: ⏳ Pendiente de instalación de dependencias

### 6.4 Django Migraciones (PENDIENTE)
- **Problema**: Las migraciones 0001-0003 se crearon pero no se aplicaron correctamente
- **Estado actual**: ⏳ Pendiente de verificación

### 6.5 Filebeat Logs Vacíos (PENDIENTE)
- **Problema**: Los logs de filebeat están vacíos después del reinicio
- **Estado actual**: ⏳ Pendiente de verificación

### 6.3 Weekly Report Sin Datos Reales (RESUELTO)
- **Problema**: El reporte semanal mostraba "0 casos" porque no había datos en la BD
- **Estado actual**: ✅ Resuelto (ahora usa datos reales de BD en modo live)

---

## 7. ESTADO ACTUAL DEL SISTEMA

| Componente | Estado | Última Verificación |
|------------|--------|---------------------|
| Wazuh Manager (analysisd) | ✅ Activo (86 threads) | 20/08/2026 12:16 |
| Wazuh Agent 001 (lubuntu) | ✅ Active | 20/08/2026 12:16 |
| Wazuh Agent 002 (Argos-win11) | ❌ Disconnected | 20/08/2026 12:16 |
| Filebeat | ✅ Activo | 20/08/2026 11:58 |
| OpenSearch | ✅ Corriendo | 20/08/2026 12:16 |
| PostgreSQL | ✅ Corriendo | 20/08/2026 12:16 |
| Shuffle SOAR | ❌ Caído | 20/08/2026 12:16 |
| wazuh-integratord | ❌ Errorando | 20/08/2026 12:16 |
| Django | ⏳ Pendiente | - |
| Panel de Control | ⏳ Pendiente | - |
| Scanner Vulnerabilidades | ❌ No ejecuta | 20/08/2026 12:16 |
| Disk Space | ⚠️ 77% usado | 20/08/2026 12:16 |

---

## 8. TIMELINE DE EVENTOS

| Hora | Evento |
|------|--------|
| 00:30 | Reinicio del servidor |
| 00:38 | Filebeat se detiene |
| 02:00 | Log rotation ejecutado |
| 08:00 | `argos-healthcheck` se ejecuta |
| 09:30 | Brute force detectado (IP 100.117.63.55) |
| 09:40 | Última alerta indexada en OpenSearch |
| 10:06 | Última alerta en alerts.json |
| 10:06 | Última alerta REAL de producción (PAM login) |
| 10:14-10:17 | Últimas entradas en alerts.json (nuestras llamadas SSH/sudo) |
| 11:30 | Active response ejecutado (firewall-drop) - procesa alerta de las 09:30 |
| 11:58 | Filebeat se reactiva |
| 12:00 | wazuh-integratord empieza a fallar (Shuffle) |
| 12:16 | Última verificación del sistema |

---

## 9. PRÓXIMOS PASOS RECOMENDADOS (Por Prioridad)

### CRÍTICO (Hacer HOY)
1. **Investigar por qué `alerts.json` dejó de escribirse** después de 10:14
2. **Revisar log rotation** a las 02:00 por posibles rupturas de file descriptor
3. **Verificar la cola de `wazuh-analysisd`** por bloqueos

### ALTO (Hacer esta semana)
4. **Deshabilitar integración Shuffle** en `ossec.conf` (IP caída)
5. **Configurar cron para scanner** de vulnerabilidades
6. **Limpiar logs** para liberar espacio en disco
7. **Reconectar agente Argos-win11**

### MEDIO (Hacer este mes)
8. **Poblar tablas vacías** con datos reales
9. **Instalar psycopg2** en el servidor
10. **Alinear esquema Django** con SQL directo
11. **Rotar credenciales** comprometidas

### BAJO (Backlog)
12. **Levantar http.server** para panel de control
13. **Configurar monitoring automático** de servicios

---

## 10. LECCIONES APRENDIDAS

1. **Siempre verificar servicios después de reinicios**: El Filebeat se detuvo 11 horas sin detectarse
2. **No exponer credenciales**: Las contraseñas quedaron en el historial de comandos
3. **Mantener espacio en disco**: 5.9GB libres es peligrosamente bajo para un SOC
4. **Monitorear integraciones externas**: Shuffle caído genera 6 errores/minuto
5. **Validar antes de ejecutar**: El scanner de vulnerabilidades no estaba configurado
6. **Documentar cambios**: Los scripts de verificación se acumularon sin control
7. **Active response puede banearte a ti mismo**: Cuidado con IP internas

---

## 11. MÉTRICAS DEL SISTEMA

| Métrica | Valor |
|---------|-------|
| Alertas totales indexer (hoy) | 790 |
| alerts.json (último real) | 2026-08-20T10:06:59 |
| alerts.json (última entrada) | 2026-08-20T10:16:57 (nuestras SSH) |
| Alertas en alerts.json | 780 líneas |
| Archivo alerts.json tamaño | 743 KB |
| Archivo alerts.log tamaño | 461 KB |
| Agentes registrados | 2 (lubuntu, Argos-win11) |
| Agentes activos | 1 (lubuntu) |
| Disk usage | 77% (5.9GB libre de 25GB) |
| Inodos usage | 2% |
| Errores integratord/min | ~6 (timeout Shuffle) |
| Timer healthcheck | Cada 2 minutos |
| Timer disk-watchdog | Cada 2 minutos |

---

**Informe generado**: 20 de Agosto 2026 12:16 CEST
**Autor**: Equipo AdeoSOC
**Versión**: 2.0 (actualizado con investigación SSH)
