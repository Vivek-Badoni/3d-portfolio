export function initCustomCursor() {
  const dot = document.createElement('div');
  dot.classList.add('cyber-cursor-dot');
  
  const ring = document.createElement('div');
  ring.classList.add('cyber-cursor-ring');

  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  });

  function renderCursor() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;

    ring.style.transform = `translate3d(${ringX - 18}px, ${ringY - 18}px, 0)`;
    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  // Attach hover scaling on interactive elements
  const addHoverEvents = () => {
    const interactables = document.querySelectorAll('a, button, input, textarea, .project-card, .skill-card, .lab-control-btn');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
    });
  };

  addHoverEvents();

  // Observer to handle dynamic content additions
  const observer = new MutationObserver(() => addHoverEvents());
  observer.observe(document.body, { childList: true, subtree: true });
}
