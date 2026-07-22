/* ==========================================================================
   ADEODATO.ES - INTERACTIVE vSOC TERMINAL SIMULATION
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const terminalBody = document.getElementById('terminal-body');
  const terminalInput = document.getElementById('terminal-input');
  const presetButtons = document.querySelectorAll('.preset-btn');

  if (!terminalBody || !terminalInput) return;

  const COMMANDS = {
    help: `Comandos disponibles:
  <span class="path-symbol">help</span>             - Muestra esta lista de comandos
  <span class="path-symbol">status</span>           - Muestra el estado del sistema vSOC y métricas de seguridad
  <span class="path-symbol">projects</span>         - Lista los proyectos principales de Adeodato
  <span class="path-symbol">simulate-attack</span>  - Lanza una simulación de detección y respuesta en tiempo real (vSOC)
  <span class="path-symbol">skills</span>           - Muestra el stack técnico en seguridad y desarrollo
  <span class="path-symbol">contact</span>          - Muestra información de contacto seguro
  <span class="path-symbol">clear</span>            - Limpia la pantalla de la terminal`,

    status: `<span class="prompt-symbol">[+] vSOC Status Check</span>
  System Core        : <span style="color:#00ff9d;">ONLINE (v3.4.2)</span>
  Active Nodes       : 128 Endpoints Monitored (IT/OT)
  SOAR Engine        : Shuffle Automation Pipeline ACTIVE
  SIEM / EDR         : Wazuh Cluster Healthy
  DFIR Orchestrator  : IRIS Instance Synchronized
  Network Enc         : Tailscale Overlay Mesh (0.0ms drop)
  Threat Intel (CTI) : Feeds Updated (VirusTotal, AbuseIPDB)`,

    projects: `<span class="prompt-symbol">[+] Repositorios Principales en GitHub (Adeodato-hub):</span>
  1. <b style="color:#00f3ff;">SOC-Adeodato</b>  : Solución vSOC IT-OT con Wazuh + Shuffle + DFIR-IRIS + Tailscale.
  2. <b style="color:#00f3ff;">AdeoSOC</b>       : App móvil Android (Kotlin) para gestión y alertas de vSOC.
  3. <b style="color:#00f3ff;">AdeoShield</b>    : Control parental Android basado en filtrado DNS-over-HTTPS (DoH).
  4. <b style="color:#00f3ff;">ARGOS</b>         : Herramienta en Python para análisis CTI y automatización.
  5. <b style="color:#00f3ff;">adeodato-web</b>  : Portfolio web de alta fidelidad con estética Cyber-Tactical.`,

    skills: `<span class="prompt-symbol">[+] Stack Técnico & Competencias:</span>
  - Ciberseguridad & SOC : Wazuh, DFIR, SOAR (Shuffle), Threat Intel, Tailscale, MITRE ATT&CK
  - Desarrollo Móvil     : Kotlin, Android SDK, DNS-over-HTTPS, OkHttp, Architecture Components
  - Backend & Tools      : Python, FastAPI, Bash Scripting, REST APIs, Linux Hardening
  - Web & Frontend       : HTML5, CSS3 Moderno, JavaScript ES6+, UI/UX Cyber Aesthetics`,

    contact: `<span class="prompt-symbol">[+] Información de Contacto:</span>
  GitHub : <a href="https://github.com/Adeodato-hub" target="_blank" style="color:#00f3ff;">https://github.com/Adeodato-hub</a>
  Web    : <a href="https://adeodato.es" target="_blank" style="color:#00ff9d;">https://adeodato.es</a>
  Estado : Disponible para proyectos de Ciberseguridad y Desarrollo`,

    clear: 'CLEAR'
  };

  function appendLine(content, isCommand = false) {
    const line = document.createElement('div');
    line.className = 'terminal-line';
    if (isCommand) {
      line.innerHTML = `<span class="prompt-symbol">adeodato@soc-core</span>:<span class="path-symbol">~</span>$ ${escapeHtml(content)}`;
    } else {
      line.innerHTML = content;
    }
    terminalBody.appendChild(line);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function escapeHtml(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function processCommand(cmd) {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    appendLine(trimmed, true);

    if (trimmed === 'clear') {
      terminalBody.innerHTML = '';
      appendWelcomeMessage();
      return;
    }

    if (trimmed === 'simulate-attack') {
      runAttackSimulation();
      return;
    }

    if (COMMANDS[trimmed]) {
      setTimeout(() => {
        appendLine(COMMANDS[trimmed]);
      }, 150);
    } else {
      setTimeout(() => {
        appendLine(`<span style="color:#ff0055;">Comando no reconocido: '${escapeHtml(trimmed)}'. Escribe '<span style="color:#00f3ff;">help</span>' para ver los comandos disponibles.</span>`);
      }, 150);
    }
  }

  function runAttackSimulation() {
    const steps = [
      { delay: 300, text: `<span style="color:#ffb703;">[ALERT] 🚨 Ingesta de evento no sospechoso desde Agente Wazuh #042 (Host: OT-PLC-GATEWAY)</span>` },
      { delay: 800, text: `<span style="color:#00f3ff;">[SOAR]  ⚡ Workflow 'Shuffle-Containment' activado automáticamente.</span>` },
      { delay: 1400, text: `<span style="color:#9d4edd;">[CTI]   🔍 Verificando IP origen 185.220.101.5 en AbuseIPDB -> Score: 98% (Malicioso / Tor Exit Node)</span>` },
      { delay: 2100, text: `<span style="color:#00ff9d;">[IR]    🛡️ Orquestando respuesta: Aislamiento preventivo via Tailscale ACL & regla de firewall enviada.</span>` },
      { delay: 2800, text: `<span style="color:#00ff9d;">[PUSH]  📱 Notificación Push enviada a la App móvil AdeoSOC: Incidente ID #9482 mitigado.</span>` },
      { delay: 3300, text: `<b style="color:#00ff9d;">[SUCCESS] ✅ Amenaza contenida en 2.8 segundos. Caso registrado en DFIR-IRIS.</b>` }
    ];

    steps.forEach(step => {
      setTimeout(() => {
        appendLine(step.text);
      }, step.delay);
    });
  }

  function appendWelcomeMessage() {
    appendLine(`<span class="prompt-symbol">Adeodato vSOC Interactive Shell [Version 3.4.2]</span>`);
    appendLine(`Escribe '<span class="path-symbol">help</span>' para ver la lista de comandos o interactúa con los botones inferiores.\n`);
  }

  // Handle Enter key
  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = terminalInput.value;
      terminalInput.value = '';
      processCommand(val);
    }
  });

  // Handle Preset Buttons
  presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      if (cmd) processCommand(cmd);
    });
  });

  // Expose processCommand to window for modal integration
  window.processCommand = processCommand;

  // Init welcome
  appendWelcomeMessage();
});
