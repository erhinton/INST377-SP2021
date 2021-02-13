document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  const doodler = document.createElement('div');
  const doodlerLeftSpace = '50';
  const doodlerBottomSpace = '50';
  const isGameOver = false;
  const platformCount = 5;
  let platforms = [];

  function createDoodler() {
    grid.appendChild(doodler);
    doodler.classList.add('doodler');
    doodler.style.left = `${doodlerLeftSpace}px`;
    doodler.style.bottom = `${doodlerBottomSpace}px`;
  }
  class Platform {
    constructor(newPlatformBottom) {
      this.bottom = newPlatformBottom;
      this.left = Math.random() * 315;
      this.visual = document.createElement('div');

      const {visual} = this;
      visual.classList.add('platform');
      visual.style.left = `${this.left}px`;
      visual.style.bottom = `${this.bottom}px`;
      grid.appendChild(visual);
    }
  }

  function createPlatorms () {
    for (let i = 0; i < platformCount; i++) {
      const platformSpace = 600 / platformCount;
      const newPlatformBottom = 100 + i * platformSpace;
      const newPlatform = new Platform(newPlatformBottom);
      platforms.push(newPlatform)
      console.log(platforms)
    }
  }

  function start() {
    if (!isGameOver) {
      createDoodler();
      createPlatorms();
    }
  }
  start();
});