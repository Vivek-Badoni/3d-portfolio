export const themes = {
  cyber: {
    name: 'Cyber Cyan',
    primary: '#00f3ff',
    secondary: '#9d4edd',
    accent: '#00ff9d',
    bgDark: '#070814',
    bgCard: 'rgba(15, 17, 36, 0.65)'
  },
  synthwave: {
    name: 'Synthwave Sunset',
    primary: '#ff477e',
    secondary: '#ffb703',
    accent: '#00f3ff',
    bgDark: '#120719',
    bgCard: 'rgba(32, 14, 45, 0.65)'
  },
  matrix: {
    name: 'Matrix Emerald',
    primary: '#00ff9d',
    secondary: '#00f3ff',
    accent: '#ffb703',
    bgDark: '#04120a',
    bgCard: 'rgba(10, 32, 20, 0.65)'
  },
  solar: {
    name: 'Solar Flare',
    primary: '#ffb703',
    secondary: '#ff477e',
    accent: '#00ff9d',
    bgDark: '#1a0f04',
    bgCard: 'rgba(40, 22, 10, 0.65)'
  }
};

let currentThemeKey = 'cyber';
let sceneManagerRef = null;
let heroMeshRef = null;
let cyberTerrainRef = null;

export function initTheme(sceneManager, heroMesh, cyberTerrain = null) {
  sceneManagerRef = sceneManager;
  heroMeshRef = heroMesh;
  cyberTerrainRef = cyberTerrain;

  const savedTheme = localStorage.getItem('portfolio_theme');
  if (savedTheme && themes[savedTheme]) {
    setTheme(savedTheme);
  }
}

export function setTheme(themeKey) {
  if (!themes[themeKey]) return;

  currentThemeKey = themeKey;
  const theme = themes[themeKey];
  document.documentElement.setAttribute('data-theme', themeKey);
  localStorage.setItem('portfolio_theme', themeKey);

  // Update CSS root variables
  const root = document.documentElement;
  root.style.setProperty('--primary-cyan', theme.primary);
  root.style.setProperty('--primary-purple', theme.secondary);
  root.style.setProperty('--accent-emerald', theme.accent);

  // Update 3D WebGL Scene colors if initialized
  if (heroMeshRef) {
    heroMeshRef.setColorTheme(theme.primary, theme.secondary);
  }
  if (sceneManagerRef) {
    sceneManagerRef.setThemeColors(theme.primary, theme.secondary);
  }
  if (cyberTerrainRef) {
    cyberTerrainRef.setColorTheme(theme.primary, theme.secondary);
  }
}

export function getActiveTheme() {
  return currentThemeKey;
}
