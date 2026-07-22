# 🛡️ adeodato-web · Portfolio Cyber-Tactical & Portal vSOC

![adeodato.es](https://img.shields.io/badge/Web-adeodato.es-00f3ff?style=for-the-badge&logo=google-chrome&logoColor=black)
![License](https://img.shields.io/badge/License-GPL--3.0-00ff9d?style=for-the-badge)
![Status](https://img.shields.io/badge/vSOC_Core-ONLINE-9d4edd?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20JS-00f3ff?style=for-the-badge)

Sitio web personal y portal interactivo de **Adeodato** ([adeodato.es](https://adeodato.es)), especializado en **Ciberseguridad**, **Arquitectura vSOC gestionado (IT/OT)**, **Desarrollo Móvil de Seguridad en Android (Kotlin)** y **Herramientas CTI en Python**.

---

## ⚡ Características Principales

- **🎨 Estética Cyber-Tactical & Glassmorphism**:
  - Paleta basada en tono obsidiana profundo (`#070a0f`), acentos neón cian (`#00f3ff`), verde matriz (`#00ff9d`) y violeta cibernético (`#9d4edd`).
  - Tarjetas con efectos `backdrop-filter`, sombras Neón y micro-interacciones suaves.
- **🌌 Fondo Matrix de Nodos en Canvas**:
  - Malla cibernética animada en tiempo real a 60 FPS en `HTML5 Canvas`, interactiva al movimiento del ratón.
- **💻 Consola / Terminal Interactivo vSOC**:
  - Terminal ejecutable en la propia web (`adeodato@soc-core:~`) capaz de procesar comandos reales o simulaciones:
    - `status`: Chequeo de salud y telemetría de sistemas (Wazuh, Shuffle, DFIR-IRIS, Tailscale).
    - `simulate-attack`: Simulación en tiempo real de ingestión de evento, contención automatizada en SOAR y notificación a la app móvil `AdeoSOC`.
    - `projects`, `skills`, `contact`, `help` y `clear`.
- **🔬 Inspector de Arquitectura de Proyectos (Modales Tácticos)**:
  - Diagramas visuales interactivos de flujo de datos para cada repositorio.
- **📱 Responsivo & Accesible**:
  - Adaptación fluida para dispositivos móviles, tablets y monitores ultra-anopaisajados.

---

## 🛠️ Ecosistema de Proyectos Integrados

| Proyecto | Categoría | Descripción | Repositorio |
| :--- | :--- | :--- | :--- |
| **SOC-Adeodato** | vSOC / IT-OT | Solución vSOC gestionado con Wazuh, Shuffle SOAR, DFIR-IRIS y Tailscale. | [Ver Repositorio](https://github.com/Adeodato-hub/SOC-Adeodato) |
| **AdeoSOC** | Android App | Centro de alertas y contención remota en 1-Tap para Android (Kotlin). | [Ver Repositorio](https://github.com/Adeodato-hub/AdeoSOC) |
| **AdeoShield** | Android / DoH | Control parental y filtrado de contenido basado en DNS-over-HTTPS. | [Ver Repositorio](https://github.com/Adeodato-hub/AdeoShield) |
| **ARGOS** | Python Tool | Automatización de recolección de CTI e Indicadores de Compromiso (IoCs). | [Ver Repositorio](https://github.com/Adeodato-hub/ARGOS) |
| **adeodato-web** | Web Portfolio | Este repositorio web personal (adeodato.es). | [Ver Repositorio](https://github.com/Adeodato-hub/adeodato-web) |

---

## 📁 Estructura del Proyecto

```
adeodato-web/
├── index.html          # Estructura semántica HTML5 con meta etiquetas SEO y OpenGraph
├── logo.png            # Logo oficial de marca Adeodato
├── CNAME               # Dominio personalizado (adeodato.es)
├── README.md           # Documentación del proyecto
├── css/
│   └── style.css       # Sistema de diseño Cyber-Tactical, variables de tema y responsive
└── js/
    ├── background.js   # Renderizado de red de nodos cibernética en Canvas
    ├── terminal.js     # Motor del terminal interactivo vSOC y simulación de contención
    └── main.js         # Lógica interactiva de proyectos, modales y filtros UI
```

---

## 🚀 Despliegue & Ejecución Local

Para probar el sitio web localmente sin necesidad de instalar dependencias pesadas:

### Opción 1: Con Python (Recomendado)
```bash
# Servir en el puerto 8080 o el puerto de tu preferencia
py -3 -m http.server 8080
```
Abrir `http://localhost:8080` en el navegador.

### Opción 2: Con Node.js / npx
```bash
npx serve .
```

---

## 👤 Autor

**Adeodato**
- GitHub: [@Adeodato-hub](https://github.com/Adeodato-hub)
- Sitio Web: [adeodato.es](https://adeodato.es)

---
*Desarrollado con arquitectura de vanguardia Cyber-Tactical.*
