const defaultConfig = {
  title_text: 'NGUY HIỂM',
  danger_text: 'Thế giới đang lâm nguy rồi!',
  chase_hint: '👆 Siu nhân Xuân Anh hãy cầm gươm đánh đuổi yêu ma!',
  congrats_message: 'Chúc mừng cậu bảo vệ thành công đồ án tốt nghiệp nhé, Xuân Anh của tớ là giỏi nhất :3'
};

const app = document.getElementById('app');
const step1Title = document.getElementById('step1Title');
const step1Warning = document.getElementById('step1Warning');
const chaseHint = document.getElementById('chaseHint');
const congratsText = document.getElementById('congratsText');

step1Title.textContent = defaultConfig.title_text;
step1Warning.textContent = defaultConfig.danger_text;
chaseHint.textContent = defaultConfig.chase_hint;
congratsText.textContent = `🎓 ${defaultConfig.congrats_message} 🎓`;

const STEP1_SHOW_MS = 10000;
const STEP1_FADE_MS = 1000;
const STEP2_SHOW_MS = 10000;
const STEP2_FADE_MS = 1000;
const STEP4_TO_STEP5_MS = 18000;

const STEP12_TOTAL_MS = STEP1_SHOW_MS + STEP1_FADE_MS + STEP2_SHOW_MS + STEP2_FADE_MS;

const step12Music = new Audio('./audio/step12.mp3');
const step3Music = new Audio('./audio/step3.mp3');
const step45Music = new Audio('./audio/step45.mp3');

[step12Music, step3Music, step45Music].forEach(audio => {
  audio.preload = 'auto';
  audio.volume = 0.6;
});

step12Music.loop = false;
step3Music.loop = true;
step45Music.loop = true;

let currentMusic = null;

function stopAudio(audio, reset = true) {
  audio.pause();
  if (reset) audio.currentTime = 0;
}

function stopAllMusic(reset = true) {
  [step12Music, step3Music, step45Music].forEach(audio => {
    audio.pause();
    if (reset) audio.currentTime = 0;
  });
}

function playMusic(audio, { loop = false, restart = true } = {}) {
  [step12Music, step3Music, step45Music].forEach(other => {
    if (other !== audio) {
      other.pause();
      other.currentTime = 0;
    }
  });

  audio.loop = loop;
  if (restart) audio.currentTime = 0;

  currentMusic = audio;

  const playPromise = audio.play();
  if (playPromise && typeof playPromise.catch === 'function') {
    playPromise.catch(err => {
      console.log('Autoplay bị chặn, nhạc sẽ phát khi người dùng có tương tác:', err);
    });
  }
}

document.addEventListener('pointerdown', () => {
  if (currentMusic && currentMusic.paused) {
    currentMusic.play().catch(() => {});
  }
}, { passive: true });

let confettiInterval = null;
let flowerRainInterval = null;
let fireBreathInterval;
let monsterX = 50;
let chaseComplete = false;

function createFlames() {
  const container = document.getElementById('fireContainer');
  container.innerHTML = '';
  const colors = ['#ff4400', '#ff6600', '#ff8800', '#ffaa00', '#ffcc00', '#ff2200'];

  for (let i = 0; i < 50; i++) {
    const flame = document.createElement('div');
    flame.className = 'flame';

    const w = 25 + Math.random() * 80;
    const h = 60 + Math.random() * 150;
    flame.style.width = `${w}px`;
    flame.style.height = `${h}px`;
    flame.style.left = `${Math.random() * 100}%`;
    flame.style.background = `radial-gradient(ellipse at bottom, ${colors[Math.floor(Math.random() * colors.length)]}, ${colors[Math.floor(Math.random() * colors.length)]} 60%, transparent)`;
    flame.style.animationDuration = `${0.25 + Math.random() * 0.6}s`;
    flame.style.animationDelay = `${Math.random() * 0.8}s`;
    flame.style.opacity = 0.7 + Math.random() * 0.3;

    container.appendChild(flame);
  }

  for (let i = 0; i < 30; i++) {
    const ember = document.createElement('div');
    ember.className = 'ember';
    ember.style.cssText = `position:absolute;width:${4 + Math.random() * 8}px;height:${4 + Math.random() * 8}px;background:${colors[Math.floor(Math.random() * 3)]};border-radius:50%;left:${Math.random() * 100}%;bottom:${Math.random() * 50}%;opacity:${0.6 + Math.random() * 0.4};`;
    container.appendChild(ember);
    setTimeout(() => ember.remove(), 3500);
  }

  app.classList.add('screen-shake');
  setTimeout(() => app.classList.remove('screen-shake'), 300);
}

function startFireBreath() {
  const container = document.getElementById('fireBreathContainer');

  fireBreathInterval = setInterval(() => {
    app.classList.add('screen-shake');
    setTimeout(() => app.classList.remove('screen-shake'), 300);

    const fb1 = document.createElement('div');
    fb1.className = 'fire-breath';
    fb1.style.cssText = `width:220px;height:75px;background:radial-gradient(ellipse 100% 50% at left, #ff2200 0%, #ff4400 15%, #ff8800 35%, #ffaa00 55%, #ffcc00 75%, transparent 95%);border-radius:0 80% 80% 0;top:${0 + Math.random() * 8}px;left:0;transform-origin:left center;filter:drop-shadow(0 0 30px rgba(255,100,0,0.9)) drop-shadow(0 0 60px rgba(255,50,0,0.6));`;
    container.appendChild(fb1);

    const fb2 = document.createElement('div');
    fb2.className = 'fire-breath';
    fb2.style.cssText = `width:180px;height:55px;background:radial-gradient(ellipse 90% 45% at left, #ffaa00 0%, #ff8800 25%, #ff6600 50%, #ff4400 75%, transparent 90%);border-radius:0 70% 70% 0;top:${12 + Math.random() * 10}px;left:0;transform-origin:left center;opacity:0.8;filter:drop-shadow(0 0 20px rgba(255,150,0,0.7));`;
    container.appendChild(fb2);

    const fb3 = document.createElement('div');
    fb3.className = 'fire-breath';
    fb3.style.cssText = `width:140px;height:35px;background:radial-gradient(ellipse 85% 40% at left, #ffff00 0%, #ffff99 20%, #ffaa00 50%, #ff6600 80%, transparent 95%);border-radius:0 60% 60% 0;top:${15 + Math.random() * 6}px;left:0;transform-origin:left center;opacity:0.9;filter:drop-shadow(0 0 40px rgba(255,200,0,0.8));`;
    container.appendChild(fb3);

    for (let i = 0; i < 8; i++) {
      const ember = document.createElement('div');
      ember.className = 'ember';
      const emColor = ['#ff2200', '#ff4400', '#ff8800', '#ffaa00'][Math.floor(Math.random() * 4)];
      ember.style.cssText = `position:absolute;width:${6 + Math.random() * 12}px;height:${6 + Math.random() * 12}px;background:${emColor};border-radius:50%;left:${40 + Math.random() * 100}px;top:${20 + Math.random() * 40}px;opacity:${0.7 + Math.random() * 0.3};filter:drop-shadow(0 0 8px ${emColor});`;
      fb1.appendChild(ember);
      setTimeout(() => ember.remove(), 1800);
    }

    setTimeout(() => {
      fb1.remove();
      fb2.remove();
      fb3.remove();
    }, 2200);
  }, 1800);
}

function initChase() {
  playMusic(step3Music, { loop: true, restart: true });

  chaseComplete = false;
  monsterX = 50;

  const m = document.getElementById('monsterChase');
  m.style.left = `${monsterX}px`;
  m.style.opacity = '1';
  m.style.transform = 'scaleX(1)';
  m.style.transition = '';

  app.classList.remove('hide-cursor');
  app.classList.add('wand-cursor');

  const step3El = document.getElementById('step3');
  step3El.onmousemove = handleChase;
  step3El.ontouchmove = (e) => {
    e.preventDefault();
    handleChase(e.touches[0]);
  };
}

function handleChase() {
  if (chaseComplete) return;

  const m = document.getElementById('monsterChase');
  const rect = app.getBoundingClientRect();
  const caveCenter = rect.width / 2;
  const distToCave = Math.abs(monsterX - caveCenter);

  if (distToCave > 10) {
    monsterX += monsterX < caveCenter ? 2 : -2;
    m.style.left = `${monsterX}px`;
    m.style.transform = monsterX < caveCenter ? 'scaleX(1)' : 'scaleX(-1)';
  }

  if (distToCave <= 10) {
    chaseComplete = true;
    m.style.transition = 'opacity 0.8s, transform 0.8s';
    m.style.opacity = '0';
    m.style.transform = 'scaleX(1) scale(0.1)';
    document.getElementById('chaseHint').style.display = 'none';
    setTimeout(startStep4, 1000);
  }
}

function startStep4() {
  playMusic(step45Music, { loop: true, restart: true });

  document.getElementById('step3').style.display = 'none';
  document.getElementById('step4').style.display = 'block';

  app.classList.remove('sky-red');
  app.classList.add('sky-blue');
  app.classList.remove('wand-cursor');
  app.classList.add('hide-cursor');

  setTimeout(() => {
    document.querySelectorAll('#clouds .cloud').forEach((cloud, i) => {
      setTimeout(() => cloud.classList.add('visible'), i * 500);
    });
  }, 1500);

  setTimeout(startStep5, STEP4_TO_STEP5_MS);
}

function createMonsterRays() {
  const step5 = document.getElementById('step5');
  const mf = document.getElementById('monsterFinal');

  const oldRays = document.getElementById('monsterRays');
  if (oldRays) oldRays.remove();

  const rays = document.createElement('div');
  rays.id = 'monsterRays';
  rays.className = 'monster-rays';

  step5.insertBefore(rays, mf);
}

function makeCongratsTextAnimated() {
  const el = document.getElementById('congratsText');
  if (el.dataset.animated === 'true') return;

  const text = el.textContent;
  const palette = ['#2E7D32', '#26A69A', '#42A5F5', '#AB47BC', '#FF7043', '#EC407A', '#66BB6A'];

  el.innerHTML = '';
  el.classList.add('celebrate-text');

  [...text].forEach((char, index) => {
    const span = document.createElement('span');
    span.className = 'celebrate-letter';
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.animationDelay = `${index * 0.035}s`;

    if (char.trim()) {
      span.style.color = palette[index % palette.length];
      span.style.textShadow = '0 2px 10px rgba(0,0,0,0.12)';
    }

    el.appendChild(span);
  });

  el.dataset.animated = 'true';
}

function startConfetti() {
  const container = document.getElementById('sparkles');
  const colors = ['#ff4d6d', '#ffd166', '#06d6a0', '#4cc9f0', '#f72585', '#ffffff', '#9b5de5'];

  if (confettiInterval) clearInterval(confettiInterval);

  confettiInterval = setInterval(() => {
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.left = `${Math.random() * 100}%`;
    c.style.background = colors[Math.floor(Math.random() * colors.length)];
    c.style.width = `${8 + Math.random() * 6}px`;
    c.style.height = `${12 + Math.random() * 10}px`;
    c.style.borderRadius = Math.random() > 0.5 ? '2px' : '50%';
    c.style.animationDuration = `${3 + Math.random() * 2.5}s`;
    c.style.transform = `rotate(${Math.random() * 360}deg)`;

    container.appendChild(c);
    setTimeout(() => c.remove(), 6500);
  }, 110);
}

function startStep5() {
  document.getElementById('step4').style.display = 'none';
  document.getElementById('step5').style.display = 'block';

  createMonsterRays();

  const mf = document.getElementById('monsterFinal');
  mf.classList.remove('monster-celebrate');
  mf.style.opacity = '0';
  mf.style.transform = 'translateX(-50%)';

  setTimeout(() => {
    mf.style.transition = 'all 1.5s ease-out';
    mf.style.opacity = '1';
  }, 500);

  setTimeout(() => {
    mf.classList.add('monster-celebrate');
  }, 2200);

  const cave = document.getElementById('mainCave');
  setTimeout(() => {
    cave.classList.add('cave-disappear');

    setTimeout(() => {
      const bigHeart = document.createElement('div');
      bigHeart.className = 'floating-heart';
      bigHeart.textContent = '💗';
      cave.parentElement.appendChild(bigHeart);

      setTimeout(() => bigHeart.classList.add('appear'), 50);
      setTimeout(() => bigHeart.remove(), 4200);
    }, 800);
  }, 1500);

  setTimeout(() => {
    document.getElementById('congratsMsg').style.display = 'block';
    makeCongratsTextAnimated();
  }, 2000);

  setTimeout(startConfetti, 1600);
  setTimeout(startFlowerRain, 1800);
  setTimeout(startSparkles, 2200);
  setTimeout(startHearts, 2500);
  setTimeout(showRestartButton, 5000);
}

function startFlowerRain() {
  const container = document.getElementById('flowerRain');
  const flowers = ['🌸', '🌺', '💐', '🌷', '🌼', '✿', '❀', '🍀', '💮', '🌿'];

  if (flowerRainInterval) clearInterval(flowerRainInterval);

  flowerRainInterval = setInterval(() => {
    const f = document.createElement('div');
    f.className = 'flower-fall';
    f.textContent = flowers[Math.floor(Math.random() * flowers.length)];
    f.style.left = `${Math.random() * 100}%`;
    f.style.fontSize = `${16 + Math.random() * 20}px`;
    f.style.animationDuration = `${4 + Math.random() * 3}s`;
    f.style.animationDelay = '0s';

    container.appendChild(f);
    setTimeout(() => f.remove(), 9000);
  }, 220);
}

function startSparkles() {
  const container = document.getElementById('sparkles');
  const colors = ['#FFD700', '#FF69B4', '#00CED1', '#98FB98', '#FFF', '#FF6347'];
  let count = 0;

  const interval = setInterval(() => {
    if (count++ > 60) {
      clearInterval(interval);
      return;
    }

    const s = document.createElement('div');
    s.className = 'sparkle';
    s.style.left = `${Math.random() * 100}%`;
    s.style.top = `${Math.random() * 100}%`;

    const size = `${4 + Math.random() * 8}px`;
    s.style.width = size;
    s.style.height = size;

    const color = colors[Math.floor(Math.random() * colors.length)];
    s.style.background = color;
    s.style.boxShadow = `0 0 ${6 + Math.random() * 10}px ${color}`;

    container.appendChild(s);
    setTimeout(() => s.remove(), 1500);
  }, 150);
}

function startHearts() {
  const container = document.getElementById('sparkles');
  let count = 0;

  const interval = setInterval(() => {
    if (count++ > 20) {
      clearInterval(interval);
      return;
    }

    const h = document.createElement('div');
    h.className = 'heart-float';
    h.textContent = ['❤️', '💚', '💙', '🤍', '💛'][Math.floor(Math.random() * 5)];
    h.style.left = `${30 + Math.random() * 40}%`;
    h.style.bottom = '30%';
    h.style.fontSize = `${18 + Math.random() * 16}px`;

    container.appendChild(h);
    setTimeout(() => h.remove(), 3000);
  }, 400);
}

function showRestartButton() {
  const btn = document.getElementById('restartBtn');
  btn.style.opacity = '1';
  btn.style.pointerEvents = 'auto';

  app.classList.remove('hide-cursor');
  app.classList.remove('wand-cursor');

  btn.onclick = () => {
    if (confettiInterval) {
      clearInterval(confettiInterval);
      confettiInterval = null;
    }

    if (flowerRainInterval) {
      clearInterval(flowerRainInterval);
      flowerRainInterval = null;
    }

    stopAllMusic(true);
    location.reload();
  };
}

function startSequence() {
  playMusic(step12Music, { loop: false, restart: true });
  createFlames();

  setTimeout(() => {
    const step1 = document.getElementById('step1');
    step1.style.transition = 'opacity 1s';
    step1.style.opacity = '0';

    setTimeout(() => {
      step1.style.display = 'none';

      const step2 = document.getElementById('step2');
      step2.style.display = 'flex';
      step2.style.opacity = '0';
      step2.style.transition = 'opacity 1s';

      setTimeout(() => {
        step2.style.opacity = '1';
      }, 50);

      startFireBreath();

      setTimeout(() => {
        clearInterval(fireBreathInterval);
        step2.style.opacity = '0';

        setTimeout(() => {
          step2.style.display = 'none';
          document.getElementById('step3').style.display = 'block';
          document.getElementById('chaseHint').style.display = 'block';
          initChase();
        }, STEP2_FADE_MS);
      }, STEP2_SHOW_MS);
    }, STEP1_FADE_MS);
  }, STEP1_SHOW_MS);
}

startSequence();