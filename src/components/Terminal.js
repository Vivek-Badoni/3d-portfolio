import confetti from 'canvas-confetti';
import { soundFx } from '../utils/audio.js';
import { setTheme, themes } from '../utils/theme.js';

export function renderTerminalModal(container, data) {
  container.innerHTML = `
    <div class="terminal-backdrop" id="terminal-modal">
      <div class="glass-panel terminal-window">
        <!-- Terminal Header Bar -->
        <div class="terminal-header">
          <div class="terminal-buttons">
            <span class="terminal-btn close" id="term-close-btn"></span>
            <span class="terminal-btn minimize"></span>
            <span class="terminal-btn maximize"></span>
          </div>
          <div class="terminal-title">guest@vivek-dev:~ (Cyber CLI v2.0)</div>
          <div style="width: 45px;"></div>
        </div>

        <!-- Terminal Output Screen -->
        <div class="terminal-body" id="terminal-body">
          <canvas id="matrix-canvas" class="matrix-canvas"></canvas>
          <div class="terminal-welcome">
            <pre class="terminal-ascii">
██╗   ██╗██╗██╗   ██╗███████╗██╗██╗
██║   ██║██║██║   ██║██╔════╝██║██║
██║   ██║██║██║   ██║█████╗  ██║██║
╚██╗ ██╔╝██║╚██╗ ██╔╝██╔══╝  ╚═╝╚═╝
 ╚████╔╝ ██║ ╚████╔╝ ███████╗██╗██╗
  ╚═══╝  ╚═╝  ╚═══╝  ╚══════╝╚═╝╚═╝
            </pre>
            <p>Welcome to <strong>Vivek Badoni's Interactive Cyber Terminal</strong>!</p>
            <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 4px;">Type <span class="term-highlight">help</span> to list available commands, or <span class="term-highlight">matrix</span> to toggle digital rain.</p>
            <hr class="terminal-divider">
          </div>

          <div id="terminal-history"></div>

          <!-- Active Prompt Input Row -->
          <div class="terminal-input-row">
            <span class="terminal-prompt">guest@vivek-dev:~$</span>
            <input type="text" id="terminal-input" class="terminal-input" autocomplete="off" spellcheck="false" autofocus>
          </div>
        </div>
      </div>
    </div>
  `;

  const modal = container.querySelector('#terminal-modal');
  const closeBtn = container.querySelector('#term-close-btn');
  const termInput = container.querySelector('#terminal-input');
  const termHistory = container.querySelector('#terminal-history');
  const termBody = container.querySelector('#terminal-body');
  const matrixCanvas = container.querySelector('#matrix-canvas');

  let matrixInterval = null;

  function closeTerminal() {
    modal.classList.remove('active');
    stopMatrixRain();
  }

  function openTerminal() {
    modal.classList.add('active');
    setTimeout(() => termInput.focus(), 100);
  }

  closeBtn.addEventListener('click', () => {
    soundFx.playClickSound();
    closeTerminal();
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeTerminal();
    }
  });

  // Command History Navigation
  let cmdHistory = [];
  let historyIdx = -1;

  termInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const command = termInput.value.trim();
      termInput.value = '';
      if (command.length > 0) {
        cmdHistory.push(command);
        historyIdx = cmdHistory.length;
        executeCommand(command);
      }
    } else if (e.key === 'ArrowUp') {
      if (historyIdx > 0) {
        historyIdx--;
        termInput.value = cmdHistory[historyIdx];
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIdx < cmdHistory.length - 1) {
        historyIdx++;
        termInput.value = cmdHistory[historyIdx];
      } else {
        historyIdx = cmdHistory.length;
        termInput.value = '';
      }
    }
  });

  function appendOutput(htmlContent) {
    const entry = document.createElement('div');
    entry.className = 'terminal-entry';
    entry.innerHTML = htmlContent;
    termHistory.appendChild(entry);
    termBody.scrollTop = termBody.scrollHeight;
  }

  function executeCommand(cmdStr) {
    soundFx.playClickSound();
    const args = cmdStr.split(' ');
    const primaryCmd = args[0].toLowerCase();

    // Echo input command line
    appendOutput(`<div class="terminal-echo"><span class="terminal-prompt">guest@vivek-dev:~$</span> ${escapeHtml(cmdStr)}</div>`);

    switch (primaryCmd) {
      case 'help':
        appendOutput(`
          <div class="terminal-help">
            <p><strong>Available CLI Commands:</strong></p>
            <table>
              <tr><td><span class="term-highlight">bio</span> / <span class="term-highlight">about</span></td><td>Display about & philosophy summary</td></tr>
              <tr><td><span class="term-highlight">skills</span></td><td>List engineering tech stack & proficiency</td></tr>
              <tr><td><span class="term-highlight">projects</span></td><td>Show featured project showcase list</td></tr>
              <tr><td><span class="term-highlight">contact</span></td><td>View email, location & social links</td></tr>
              <tr><td><span class="term-highlight">theme [name]</span></td><td>Switch site theme: cyber | synthwave | matrix | solar</td></tr>
              <tr><td><span class="term-highlight">matrix</span></td><td>Toggle Cyber Digital Rain Canvas mode</td></tr>
              <tr><td><span class="term-highlight">sudo hire-me</span></td><td>Trigger recruiter priority mode 🎉</td></tr>
              <tr><td><span class="term-highlight">clear</span></td><td>Clear terminal screen output</td></tr>
            </table>
          </div>
        `);
        break;

      case 'bio':
      case 'about':
        appendOutput(`
          <div class="terminal-info">
            <p><strong>Developer:</strong> ${data.personalInfo.name}</p>
            <p><strong>Title:</strong> Full-Stack Web & WebGL Developer</p>
            <p><strong>Status:</strong> ${data.personalInfo.status}</p>
            <p style="margin-top: 8px; color: var(--text-muted);">${data.personalInfo.bio}</p>
          </div>
        `);
        break;

      case 'skills':
        appendOutput(`
          <div class="terminal-info">
            <p><strong>Technical Skill Matrix:</strong></p>
            ${data.skills.frontend.map(s => `<div class="term-bar-row"><span>${s.name.padEnd(16)}</span> <span class="term-bar">[${'█'.repeat(Math.round(s.level / 10))}${'░'.repeat(10 - Math.round(s.level / 10))}]</span> ${s.level}%</div>`).join('')}
            ${data.skills.backend.map(s => `<div class="term-bar-row"><span>${s.name.padEnd(16)}</span> <span class="term-bar">[${'█'.repeat(Math.round(s.level / 10))}${'░'.repeat(10 - Math.round(s.level / 10))}]</span> ${s.level}%</div>`).join('')}
          </div>
        `);
        break;

      case 'projects':
        appendOutput(`
          <div class="terminal-info">
            <p><strong>Featured Works (${data.projects.length} Total):</strong></p>
            ${data.projects.map((p, idx) => `
              <div style="margin-bottom: 8px;">
                <span class="term-highlight">#${idx + 1} ${p.title}</span> [${p.category}]
                <br><span style="color: var(--text-muted); font-size: 0.8rem;">${p.subtitle}</span>
              </div>
            `).join('')}
          </div>
        `);
        break;

      case 'contact':
        appendOutput(`
          <div class="terminal-info">
            <p>📧 Email: <a href="mailto:${data.personalInfo.email}" style="color: var(--primary-cyan);">${data.personalInfo.email}</a></p>
            <p>📍 Location: ${data.personalInfo.location}</p>
            <p>🔗 GitHub: <a href="${data.personalInfo.socials[0].url}" target="_blank" style="color: var(--primary-cyan);">${data.personalInfo.socials[0].url}</a></p>
            <p>💼 LinkedIn: <a href="${data.personalInfo.socials[1].url}" target="_blank" style="color: var(--primary-cyan);">${data.personalInfo.socials[1].url}</a></p>
          </div>
        `);
        break;

      case 'theme':
        const targetTheme = args[1] ? args[1].toLowerCase() : '';
        if (themes[targetTheme]) {
          setTheme(targetTheme);
          appendOutput(`<p style="color: var(--accent-emerald);">🎨 Theme updated to <strong>${themes[targetTheme].name}</strong>!</p>`);
        } else {
          appendOutput(`<p style="color: var(--accent-coral);">Usage: theme &lt;cyber | synthwave | matrix | solar&gt;</p>`);
        }
        break;

      case 'matrix':
        if (matrixInterval) {
          stopMatrixRain();
          appendOutput(`<p style="color: var(--text-muted);">Digital rain matrix mode OFF.</p>`);
        } else {
          startMatrixRain();
          appendOutput(`<p style="color: var(--accent-emerald);">Digital rain matrix mode ON!</p>`);
        }
        break;

      case 'sudo':
        if (args.slice(1).join(' ').toLowerCase() === 'hire-me') {
          soundFx.playSuccessSound();
          confetti({ particleCount: 150, spread: 80, origin: { y: 0.5 } });
          appendOutput(`
            <div style="color: var(--accent-emerald); font-weight: 700; padding: 10px; border: 1px solid var(--accent-emerald); border-radius: 8px; margin-top: 8px;">
              🚀 RECRUITER MODE UNLOCKED!
              <br><span style="font-weight: 400; font-size: 0.9rem;">Direct mail requested to badonivivek2006@gmail.com. Thank you for visiting!</span>
            </div>
          `);
        } else {
          appendOutput(`<p style="color: var(--accent-coral);">Permission denied: Try 'sudo hire-me'</p>`);
        }
        break;

      case 'clear':
        termHistory.innerHTML = '';
        break;

      default:
        appendOutput(`<p style="color: var(--accent-coral);">Command not recognized: '${escapeHtml(cmdStr)}'. Type <span class="term-highlight">help</span> for commands.</p>`);
    }
  }

  function startMatrixRain() {
    matrixCanvas.style.display = 'block';
    const ctx = matrixCanvas.getContext('2d');
    matrixCanvas.width = termBody.clientWidth;
    matrixCanvas.height = termBody.clientHeight;

    const chars = '0123456789ABCDEF010101XYZ⚡';
    const fontSize = 14;
    const columns = Math.floor(matrixCanvas.width / fontSize);
    const drops = Array(columns).fill(1);

    matrixInterval = setInterval(() => {
      ctx.fillStyle = 'rgba(7, 8, 20, 0.15)';
      ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

      ctx.fillStyle = '#00ff9d';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }, 45);
  }

  function stopMatrixRain() {
    if (matrixInterval) {
      clearInterval(matrixInterval);
      matrixInterval = null;
    }
    matrixCanvas.style.display = 'none';
  }

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, function(m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
    });
  }

  return {
    open: openTerminal,
    close: closeTerminal
  };
}
