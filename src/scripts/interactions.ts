type TerminalLine = {
  t: string;
  c: string;
};

type DriftElement = HTMLElement & {
  _base?: number;
};

const LANG_KEY = 'fs_lang';

const terminalLines: TerminalLine[] = [
  { t: '$ whoami', c: 'pr' },
  { t: 'frank_segura — backend_dev', c: 'vi' },
  { t: '$ cat stack.txt', c: 'pr' },
  { t: 'node · python · docker · k8s', c: '' },
  { t: 'aws · linux · sql · nosql', c: '' },
  { t: '$ ./build_future.sh', c: 'pr' },
  { t: 'compiling ideas... [OK]', c: 'vi' },
  { t: 'deploy: success ✔', c: '' },
];

export const initPortfolioInteractions = () => {
  const langBox = document.getElementById('lang');
  const term = document.getElementById('term');
  const hero = document.querySelector<HTMLElement>('.hero');
  const crt = document.querySelector<HTMLElement>('.crt');
  const nav = document.querySelector<HTMLElement>('.nav');
  const menuBtn = document.getElementById('menuBtn');
  const sprites = Array.from(document.querySelectorAll<HTMLElement>('.hero .sprite'));
  const drift = Array.from(document.querySelectorAll<DriftElement>('.sprite[data-par]'));

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- language ---------- */
  const applyLang = (lang: string) => {
    document.documentElement.lang = lang;
    document.querySelectorAll<HTMLElement>('[data-es]').forEach((el) => {
      const value = el.dataset[lang];
      if (value != null && el.innerHTML !== value) el.innerHTML = value;
    });
    langBox?.querySelectorAll<HTMLButtonElement>('button').forEach((button) => {
      const on = button.dataset.lang === lang;
      button.classList.toggle('on', on);
      button.setAttribute('aria-pressed', String(on));
    });
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch {
      // localStorage can be unavailable in private or restricted contexts.
    }
  };

  langBox?.addEventListener('click', (event) => {
    const button = (event.target as Element | null)?.closest<HTMLButtonElement>('button');
    if (button?.dataset.lang) applyLang(button.dataset.lang);
  });

  let savedLang: string | null = null;
  try {
    savedLang = localStorage.getItem(LANG_KEY);
  } catch {
    savedLang = null;
  }
  // Spanish is the server-rendered default; only touch the DOM when needed.
  if (savedLang && savedLang !== 'es') applyLang(savedLang);

  /* ---------- mobile menu ---------- */
  const setMenu = (open: boolean) => {
    nav?.classList.toggle('open', open);
    menuBtn?.setAttribute('aria-expanded', String(open));
  };
  menuBtn?.addEventListener('click', () => setMenu(!nav?.classList.contains('open')));
  nav?.querySelectorAll('.nav-links a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenu(false);
  });

  /* ---------- terminal ---------- */
  let termTimer = 0;
  let termVisible = true;

  const buildTerminal = () => {
    if (!term) return;
    term.textContent = '';

    if (reducedMotion) {
      terminalLines.forEach((data) => {
        const div = document.createElement('div');
        div.className = `ln ${data.c}`;
        div.textContent = data.t;
        term.appendChild(div);
      });
      return;
    }

    let lineIndex = 0;
    const nextLine = () => {
      if (lineIndex >= terminalLines.length) {
        const cursor = document.createElement('span');
        cursor.className = 'cursor';
        const wrap = document.createElement('div');
        wrap.className = 'ln pr';
        wrap.textContent = '$ ';
        wrap.appendChild(cursor);
        term.appendChild(wrap);
        termTimer = window.setTimeout(function restart() {
          if (document.hidden || !termVisible) {
            termTimer = window.setTimeout(restart, 1000);
            return;
          }
          buildTerminal();
        }, 5200);
        return;
      }

      const data = terminalLines[lineIndex++];
      const div = document.createElement('div');
      div.className = `ln ${data.c}`;
      term.appendChild(div);
      let charIndex = 0;

      const typeChar = () => {
        if (charIndex <= data.t.length) {
          div.textContent = data.t.slice(0, charIndex);
          charIndex += 1;
          termTimer = window.setTimeout(typeChar, 26 + Math.random() * 30);
        } else {
          termTimer = window.setTimeout(nextLine, data.c === 'pr' ? 180 : 360);
        }
      };
      typeChar();
    };
    nextLine();
  };

  if (term) {
    new IntersectionObserver(([entry]) => {
      termVisible = entry.isIntersecting;
    }).observe(term);
    buildTerminal();
  }

  /* ---------- reveal on scroll ---------- */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        entry.target.querySelectorAll<HTMLElement>('.fill[data-pc]').forEach((fill, index) => {
          window.setTimeout(() => {
            fill.style.width = `${fill.dataset.pc}%`;
          }, 120 + index * 90);
        });
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
  );
  document.querySelectorAll<HTMLElement>('.reveal').forEach((el) => observer.observe(el));

  /* ---------- mouse tilt (desktop only) ---------- */
  if (hero && finePointer && !reducedMotion) {
    let frame = 0;
    hero.addEventListener('mousemove', (event) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = hero.getBoundingClientRect();
        const mx = (event.clientX - rect.left) / rect.width - 0.5;
        const my = (event.clientY - rect.top) / rect.height - 0.5;
        sprites.forEach((sprite, index) => {
          const distance = (index + 1) * 10;
          sprite.style.transform = `translate(${mx * distance}px, ${my * distance}px)`;
        });
        if (crt) crt.style.transform = `rotateY(${mx * 5}deg) rotateX(${-my * 5}deg)`;
      });
    });
    hero.addEventListener('mouseleave', () => {
      sprites.forEach((sprite) => {
        sprite.style.transform = '';
      });
      if (crt) crt.style.transform = '';
    });
  }

  /* ---------- parallax (desktop only, rAF-throttled) ---------- */
  if (finePointer && !reducedMotion && drift.length) {
    const cacheBases = () => {
      drift.forEach((sprite) => {
        sprite.style.translate = '';
      });
      drift.forEach((sprite) => {
        sprite._base = sprite.getBoundingClientRect().top + window.scrollY;
      });
    };

    let ticking = false;
    const parallax = () => {
      ticking = false;
      const center = window.scrollY + window.innerHeight / 2;
      drift.forEach((sprite) => {
        const speed = Number.parseFloat(sprite.dataset.par || '1') || 1;
        const relative = center - (sprite._base || 0);
        // `translate` composes with the float animation and avoids layout.
        sprite.style.translate = `0 ${relative * speed * -0.08}px`;
      });
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(parallax);
    };

    cacheBases();
    parallax();

    let resizeTimeout = 0;
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => {
      window.clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        cacheBases();
        parallax();
      }, 150);
    });
  }

  /* ---------- image slots: load the custom element only when idle ---------- */
  if (document.querySelector('image-slot')) {
    const load = () => import('./image-slot.js');
    if ('requestIdleCallback' in window) window.requestIdleCallback(load, { timeout: 3000 });
    else window.setTimeout(load, 1500);
  }

  return () => window.clearTimeout(termTimer);
};
