export function drawSkillRadarChart(canvas, data) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  // Set resolution based on devicePixelRatio
  const rect = canvas.getBoundingClientRect();
  const width = rect.width || 320;
  const height = rect.height || 320;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.scale(dpr, dpr);

  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(centerX, centerY) - 45;

  const axes = [
    { label: 'Frontend', value: 0.90 },
    { label: 'Backend', value: 0.90 },
    { label: 'Databases', value: 0.88 },
    { label: 'Tools/DevOps', value: 0.85 },
    { label: 'Architecture', value: 0.86 },
    { label: 'APIs/Auth', value: 0.88 }
  ];

  const totalAxes = axes.length;
  const angleStep = (Math.PI * 2) / totalAxes;

  ctx.clearRect(0, 0, width, height);

  // Draw concentric polygon grid webs
  const gridLevels = 4;
  for (let level = 1; level <= gridLevels; level++) {
    const levelRadius = (radius / gridLevels) * level;
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(0, 243, 255, 0.15)';
    ctx.lineWidth = 1;

    for (let i = 0; i < totalAxes; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const x = centerX + Math.cos(angle) * levelRadius;
      const y = centerY + Math.sin(angle) * levelRadius;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
  }

  // Draw radial axis lines & labels
  ctx.font = '12px "Fira Code", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  for (let i = 0; i < totalAxes; i++) {
    const angle = i * angleStep - Math.PI / 2;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;

    // Axis line
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(0, 243, 255, 0.2)';
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x, y);
    ctx.stroke();

    // Axis Label
    const labelX = centerX + Math.cos(angle) * (radius + 24);
    const labelY = centerY + Math.sin(angle) * (radius + 20);
    ctx.fillStyle = '#00f3ff';
    ctx.fillText(axes[i].label, labelX, labelY);
  }

  // Draw filled skill polygon
  ctx.beginPath();
  for (let i = 0; i < totalAxes; i++) {
    const angle = i * angleStep - Math.PI / 2;
    const valRadius = radius * axes[i].value;
    const x = centerX + Math.cos(angle) * valRadius;
    const y = centerY + Math.sin(angle) * valRadius;

    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();

  // Gradient fill
  const gradient = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, radius);
  gradient.addColorStop(0, 'rgba(0, 243, 255, 0.45)');
  gradient.addColorStop(1, 'rgba(157, 78, 221, 0.25)');
  ctx.fillStyle = gradient;
  ctx.fill();

  ctx.strokeStyle = '#00f3ff';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Draw vertex glowing dots
  for (let i = 0; i < totalAxes; i++) {
    const angle = i * angleStep - Math.PI / 2;
    const valRadius = radius * axes[i].value;
    const x = centerX + Math.cos(angle) * valRadius;
    const y = centerY + Math.sin(angle) * valRadius;

    ctx.beginPath();
    ctx.arc(x, y, 4.5, 0, Math.PI * 2);
    ctx.fillStyle = '#00ff9d';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
}
