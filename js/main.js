/* ==========================================================================
   ADEODATO.ES - MAIN INTERACTIVE UI LOGIC & PROJECT MODAL SYSTEM
   ========================================================================== */

const PROJECT_DATA = {
  'soc-adeodato': {
    title: 'SOC-Adeodato · vSOC IT/OT Ecosystem',
    category: 'vSOC / IT-OT Cybersecurity',
    description: 'Solución vSOC (SOC gestionado) IT-OT para PYME e industria. Combina monitorización en tiempo real de eventos de seguridad con contención automatizada sin intervención humana obligatoria y orquestación de respuesta ante incidentes.',
    repoUrl: 'https://github.com/Adeodato-hub/SOC-Adeodato',
    flow: [
      { name: 'Wazuh Agent', sub: 'SIEM & EDR Sensor' },
      { name: 'Tailscale Mesh', sub: 'Red Encapsulada' },
      { name: 'Shuffle SOAR', sub: 'Flujo de Contención' },
      { name: 'DFIR-IRIS', sub: 'Casos e Investigación' },
      { name: 'App AdeoSOC', sub: 'Alertas Móviles' }
    ],
    specs: [
      '<b>Integración SIEM:</b> Wazuh 4.x con reglas personalizadas para entornos industriales OT y sistemas IT.',
      '<b>Automatización SOAR:</b> Workflows en Shuffle para aislamiento de endpoints y bloqueo de IPs maliciosas.',
      '<b>Gestión de Casos:</b> Sincronización bidireccional con DFIR-IRIS para trazabilidad de forense digital.',
      '<b>Conectividad Segura:</b> Túneles de red privada cifrados mediante la malla Tailscale.'
    ],
    command: 'simulate-attack'
  },
  'adeosoc': {
    title: 'AdeoSOC · Android vSOC Alert Center',
    category: 'Android Native Security',
    description: 'Centro de control y notificación de incidentes vSOC para Android. Diseñado para analistas de seguridad que requieren visibilidad total de las alertas críticas del SOC en cualquier momento.',
    repoUrl: 'https://github.com/Adeodato-hub/AdeoSOC',
    flow: [
      { name: 'Wazuh / Shuffle', sub: 'Motor de Eventos' },
      { name: 'Push Gateway', sub: 'Alertas Críticas' },
      { name: 'App AdeoSOC', sub: 'UI Kotlin Android' },
      { name: '1-Tap Contain', sub: 'Acción Táctica' }
    ],
    specs: [
      '<b>Lenguaje:</b> 100% Kotlin Nativo con Jetpack Architecture Components.',
      '<b>Notificaciones Tácticas:</b> Canales de máxima prioridad que evitan modos de ahorro de energía.',
      '<b>Respuesta Rápida:</b> Botón de contención inmediata en 1 toque para aislar endpoints comprometidos.',
      '<b>Cifrado:</b> Comunicación TLS 1.3 autenticada con certificados mTLS.'
    ],
    command: 'status'
  },
  'adeoshield': {
    title: 'AdeoShield · DoH Parental & Threat Filter',
    category: 'Android Privacy & DNS Security',
    description: 'Aplicación Android de filtrado y privacidad basada en DNS-over-HTTPS. Protege el tráfico de red cifrando la resolución DNS y bloqueando dominios de malware, phishing y contenido no deseado.',
    repoUrl: 'https://github.com/Adeodato-hub/AdeoShield',
    flow: [
      { name: 'App Traffic', sub: 'Consultas DNS' },
      { name: 'Local DoH Engine', sub: 'Filtro & Cifrado' },
      { name: 'Upstream DoH', sub: 'Resolución Segura' },
      { name: 'Domain Block', sub: 'Protección Activa' }
    ],
    specs: [
      '<b>Protocolo:</b> DNS-over-HTTPS (DoH) según especificación RFC 8484.',
      '<b>Licencia:</b> Código Abierto bajo GNU General Public License v3.0.',
      '<b>Listas de Bloqueo:</b> Actualizaciones dinámicas de listas CTI anti-phishing y malware.',
      '<b>Bajo Consumo:</b> Optimización de batería sin uso de túneles VPN pesados.'
    ],
    command: 'skills'
  },
  'argos': {
    title: 'ARGOS · Threat Intelligence & CTI Automation',
    category: 'Python CTI Tooling',
    description: 'Herramienta automatizada en Python para el procesamiento de Threat Intelligence (CTI). Extrae, normaliza y analiza Indicadores de Compromiso (IoCs) desde feeds globales para alimentar reglas de detección.',
    repoUrl: 'https://github.com/Adeodato-hub/ARGOS',
    flow: [
      { name: 'CTI Feeds', sub: 'VirusTotal / OTX' },
      { name: 'ARGOS Engine', sub: 'Python Normalizer' },
      { name: 'IoC Database', sub: 'Indicadores Cifrados' },
      { name: 'Wazuh Rules', sub: 'Reglas Auto-generadas' }
    ],
    specs: [
      '<b>Lenguaje:</b> Python 3.10+ asíncrono.',
      '<b>Fuentes de Datos:</b> VirusTotal API v3, AbuseIPDB, AlienVault OTX y MalwareBazaar.',
      '<b>Formatos de Exportación:</b> JSON, STIX2, CSV y reglas de coincidencia de Wazuh/YARA.',
      '<b>Licencia:</b> GPL-3.0.'
    ],
    command: 'projects'
  },
  'adeodato-web': {
    title: 'adeodato-web · Cyber-Tactical Portfolio',
    category: 'Modern Web Architecture',
    description: 'Plataforma web personal (adeodato.es) desarrollada con estética futurista de alta fidelidad, simulador de terminal vSOC dinámico y visualizador interactivo de arquitectura.',
    repoUrl: 'https://github.com/Adeodato-hub/adeodato-web',
    flow: [
      { name: 'HTML5 Semantic', sub: 'Estructura SEO' },
      { name: 'CSS3 Cyber System', sub: 'Glassmorphism' },
      { name: 'JS Canvas Grid', sub: 'Fondo Animado' },
      { name: 'vSOC Shell JS', sub: 'Terminal Interactivo' }
    ],
    specs: [
      '<b>Diseño:</b> Modo oscuro Cyber-Tactical personalizado sin librerías pesadas.',
      '<b>Animación:</b> Red de nodos interactivos renderizados a 60 FPS en HTML5 Canvas.',
      '<b>Interacción:</b> Terminal bash simulada en JavaScript con eventos de orquestación vSOC.'
    ],
    command: 'help'
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // Project Filter Logic
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Modal Setup
  const modalOverlay = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  function openProjectModal(projectId) {
    const data = PROJECT_DATA[projectId];
    if (!data || !modalOverlay) return;

    document.getElementById('modal-title').innerText = data.title;
    document.getElementById('modal-category').innerText = data.category;
    document.getElementById('modal-desc').innerText = data.description;
    document.getElementById('modal-github-link').setAttribute('href', data.repoUrl);

    // Build flow nodes HTML
    const flowContainer = document.getElementById('modal-flow-nodes');
    flowContainer.innerHTML = '';
    data.flow.forEach((node, index) => {
      const nodeElem = document.createElement('div');
      nodeElem.className = 'arch-node';
      nodeElem.innerHTML = `<div class="arch-node-title">${node.name}</div><div class="arch-node-sub">${node.sub}</div>`;
      flowContainer.appendChild(nodeElem);

      if (index < data.flow.length - 1) {
        const arrow = document.createElement('div');
        arrow.className = 'arch-arrow';
        arrow.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
        flowContainer.appendChild(arrow);
      }
    });

    // Build specs HTML
    const specsContainer = document.getElementById('modal-specs-list');
    specsContainer.innerHTML = '';
    data.specs.forEach(spec => {
      const li = document.createElement('li');
      li.style.marginBottom = '0.5rem';
      li.innerHTML = `<i class="fa-solid fa-check" style="color: var(--accent-green); margin-right: 0.5rem;"></i> ${spec}`;
      specsContainer.appendChild(li);
    });

    // Handle Simulate in Terminal button
    const simBtn = document.getElementById('modal-sim-btn');
    if (simBtn) {
      simBtn.onclick = () => {
        closeModal();
        const termElem = document.getElementById('terminal');
        if (termElem) termElem.scrollIntoView({ behavior: 'smooth' });
        
        // Trigger terminal command
        const termInput = document.getElementById('terminal-input');
        if (termInput && window.processCommand) {
          setTimeout(() => {
            window.processCommand(data.command);
          }, 600);
        }
      };
    }

    modalOverlay.classList.add('active');
  }

  function closeModal() {
    if (modalOverlay) modalOverlay.classList.remove('active');
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // Attach event listeners to project inspect buttons
  document.querySelectorAll('.btn-inspect').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const pid = btn.getAttribute('data-project');
      openProjectModal(pid);
    });
  });

  // Animated Counter for Hero Metrics
  const counters = document.querySelectorAll('.metric-val[data-target]');
  const speed = 200;

  const animateCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const updateCount = () => {
        const count = +counter.innerText.replace('+', '').replace('%', '');
        const inc = target / speed;

        if (count < target) {
          const nextVal = Math.ceil(count + inc);
          const suffix = counter.getAttribute('data-suffix') || '';
          counter.innerText = nextVal + suffix;
          setTimeout(updateCount, 15);
        } else {
          const suffix = counter.getAttribute('data-suffix') || '';
          counter.innerText = target + suffix;
        }
      };
      updateCount();
    });
  };

  // Trigger Counter Animation when visible
  let animated = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animateCounters();
        animated = true;
      }
    });
  }, { threshold: 0.5 });

  const metricsGrid = document.querySelector('.metrics-grid');
  if (metricsGrid) observer.observe(metricsGrid);

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        targetElem.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
