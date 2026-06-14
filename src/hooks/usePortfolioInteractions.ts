import { useEffect } from 'react';

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

export const usePortfolioInteractions = () => {
  useEffect(() => {
    const langBox = document.getElementById('lang');
    const term = document.getElementById('term');
    const hero = document.querySelector<HTMLElement>('.hero');
    const crt = document.querySelector<HTMLElement>('.crt');
    const sprites = Array.from(document.querySelectorAll<HTMLElement>('.hero .sprite'));
    const drift = Array.from(document.querySelectorAll<DriftElement>('.sprite[data-par]'));

    const cleanups: Array<() => void> = [];
    const timeouts = new Set<number>();

    const setManagedTimeout = (fn: () => void, delay: number) => {
      const id = window.setTimeout(() => {
        timeouts.delete(id);
        fn();
      }, delay);
      timeouts.add(id);
      return id;
    };

    const applyLang = (lang: string) => {
      document.documentElement.lang = lang;
      document.querySelectorAll<HTMLElement>('[data-es]').forEach((el) => {
        const value = el.dataset[lang];
        if (value != null) el.innerHTML = value;
      });
      langBox?.querySelectorAll<HTMLButtonElement>('button').forEach((button) => {
        button.classList.toggle('on', button.dataset.lang === lang);
      });
      try {
        localStorage.setItem(LANG_KEY, lang);
      } catch {
        // localStorage can be unavailable in private or restricted contexts.
      }
    };

    if (langBox) {
      const onLangClick = (event: MouseEvent) => {
        const button = (event.target as Element | null)?.closest<HTMLButtonElement>('button');
        if (button?.dataset.lang) applyLang(button.dataset.lang);
      };
      langBox.addEventListener('click', onLangClick);
      cleanups.push(() => langBox.removeEventListener('click', onLangClick));
    }

    let savedLang = 'es';
    try {
      savedLang = localStorage.getItem(LANG_KEY) || 'es';
    } catch {
      savedLang = 'es';
    }
    applyLang(savedLang);

    const buildTerminal = () => {
      if (!term) return;
      term.innerHTML = '';
      let lineIndex = 0;

      const nextLine = () => {
        if (!term) return;
        if (lineIndex >= terminalLines.length) {
          const cursor = document.createElement('span');
          cursor.className = 'cursor';
          const wrap = document.createElement('div');
          wrap.className = 'ln pr';
          wrap.textContent = '$ ';
          wrap.appendChild(cursor);
          term.appendChild(wrap);
          setManagedTimeout(() => {
            if (!document.hidden) buildTerminal();
          }, 5200);
          return;
        }

        const data = terminalLines[lineIndex++];
        const div = document.createElement('div');
        div.className = `ln ${data.c || ''}`;
        term.appendChild(div);
        let charIndex = 0;

        const typeChar = () => {
          if (charIndex <= data.t.length) {
            div.textContent = data.t.slice(0, charIndex);
            charIndex += 1;
            setManagedTimeout(typeChar, 26 + Math.random() * 30);
          } else {
            setManagedTimeout(nextLine, data.c === 'pr' ? 180 : 360);
          }
        };

        typeChar();
      };

      nextLine();
    };

    buildTerminal();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('in');
          entry.target.querySelectorAll<HTMLElement>('.fill[data-pc]').forEach((fill, index) => {
            setManagedTimeout(() => {
              fill.style.width = `${fill.dataset.pc}%`;
            }, 120 + index * 90);
          });
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.18 },
    );

    document.querySelectorAll<HTMLElement>('.reveal').forEach((el) => observer.observe(el));
    cleanups.push(() => observer.disconnect());

    if (hero) {
      const onHeroMove = (event: MouseEvent) => {
        const rect = hero.getBoundingClientRect();
        const mx = (event.clientX - rect.left) / rect.width - 0.5;
        const my = (event.clientY - rect.top) / rect.height - 0.5;

        sprites.forEach((sprite, index) => {
          const distance = (index + 1) * 10;
          sprite.style.transform = `translate(${mx * distance}px, ${my * distance}px)`;
        });

        if (crt) {
          crt.style.transform = `rotateY(${mx * 5}deg) rotateX(${-my * 5}deg)`;
        }
      };

      const onHeroLeave = () => {
        sprites.forEach((sprite) => {
          sprite.style.transform = '';
        });
        if (crt) crt.style.transform = '';
      };

      hero.addEventListener('mousemove', onHeroMove);
      hero.addEventListener('mouseleave', onHeroLeave);
      cleanups.push(() => {
        hero.removeEventListener('mousemove', onHeroMove);
        hero.removeEventListener('mouseleave', onHeroLeave);
      });
    }

    const cacheBases = () => {
      drift.forEach((sprite) => {
        sprite.style.marginTop = '0px';
      });
      drift.forEach((sprite) => {
        sprite._base = sprite.getBoundingClientRect().top + window.scrollY;
      });
    };

    const parallax = () => {
      const center = window.scrollY + window.innerHeight / 2;
      drift.forEach((sprite) => {
        const speed = Number.parseFloat(sprite.dataset.par || '1') || 1;
        const relative = center - (sprite._base || 0);
        sprite.style.marginTop = `${relative * speed * -0.08}px`;
      });
    };

    cacheBases();
    parallax();

    const onScroll = () => parallax();
    let resizeTimeout = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimeout);
      resizeTimeout = setManagedTimeout(() => {
        cacheBases();
        parallax();
      }, 150);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    cleanups.push(() => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.clearTimeout(resizeTimeout);
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      timeouts.forEach((timeout) => window.clearTimeout(timeout));
      timeouts.clear();
    };
  }, []);
};
