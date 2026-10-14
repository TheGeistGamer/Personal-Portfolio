// Behaviour for the studio landing: language switch, windows, filters and the
// lazily loaded three.js desk. The page is fully usable before the 3D loads:
// every hotspot is a real <button> and the poster image stands in for the scene.

const LANG_KEY = 'fs_lang';
const MOBILE = window.matchMedia('(max-width: 1024px)');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- language ---------- */
const applyLang = (lang: string) => {
  document.documentElement.lang = lang;
  document.querySelectorAll<HTMLElement>('[data-es]').forEach((el) => {
    const value = el.dataset[lang];
    if (value != null && el.innerHTML !== value) el.innerHTML = value;
  });
  for (const attr of ['alt', 'aria']) {
    document.querySelectorAll<HTMLElement>(`[data-${attr}-es]`).forEach((el) => {
      const value = el.getAttribute(`data-${attr}-${lang}`);
      if (value != null) el.setAttribute(attr === 'alt' ? 'alt' : 'aria-label', value);
    });
  }
  document.querySelectorAll<HTMLButtonElement>('#lang button').forEach((b) => {
    const on = b.dataset.lang === lang;
    b.classList.toggle('on', on);
    b.setAttribute('aria-pressed', String(on));
  });
  try { localStorage.setItem(LANG_KEY, lang); } catch { /* storage may be blocked */ }
};

/* ---------- windows ---------- */
let current: HTMLElement | null = null;
let opener: HTMLElement | null = null;
const hotspotFor = (id: string) => document.querySelectorAll<HTMLElement>('.hs').forEach((h) => h.classList.toggle('active', h.dataset.open === id));

const closeWin = () => {
  if (!current) return;
  current.hidden = true;
  current = null;
  hotspotFor('');
  opener?.focus({ preventScroll: true });
  opener = null;
};

const openWin = (target: string, from?: HTMLElement | null) => {
  const [id, focus] = target.split(':');
  const win = document.getElementById(`win-${id}`);
  if (!win) return;
  if (current && current !== win) current.hidden = true;
  if (from && !from.closest('.win')) opener = from;
  win.hidden = false;
  current = win;
  hotspotFor(target);
  const body = win.querySelector<HTMLElement>('.win-body');
  win.querySelectorAll('.stack-card').forEach((c) => c.classList.toggle('focus', !!focus && c.id === `stack-${focus}`));
  if (body) body.scrollTop = 0;
  if (focus) win.querySelector(`#stack-${focus}`)?.scrollIntoView({ block: 'nearest' });
  win.querySelector<HTMLElement>('[data-close]')?.focus({ preventScroll: true });
};

/* ---------- filters ---------- */
const PILL_WINDOW: Record<string, string> = { projects: 'projects', stack: 'stack', contact: 'contact' };
const setFilter = (group: string) => {
  document.querySelectorAll<HTMLButtonElement>('.pill').forEach((p) => p.classList.toggle('on', p.dataset.filter === group));
  document.querySelectorAll<HTMLElement>('.hs').forEach((h) => {
    const g = h.dataset.group;
    h.classList.toggle('dim', group !== 'all' && g !== group && !(group === 'projects' && g === 'about'));
  });
};

document.addEventListener('click', (event) => {
  const el = (event.target as Element | null)?.closest<HTMLElement>('[data-open],[data-close],[data-filter],[data-lang]');
  if (!el) {
    // Clicking empty scene space closes the window (the canvas handles its own clicks).
    return;
  }
  if (el.dataset.lang) return applyLang(el.dataset.lang);
  if (el.dataset.close != null) return closeWin();
  if (el.dataset.filter) {
    setFilter(el.dataset.filter);
    // On small screens the side columns are hidden, so the pills open their window.
    const win = PILL_WINDOW[el.dataset.filter];
    if (MOBILE.matches) win ? openWin(win, el) : closeWin();
    return;
  }
  if (el.dataset.open) openWin(el.dataset.open, el);
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeWin(); });
document.querySelector('.brand')?.addEventListener('click', () => openWin('about'));

let savedLang: string | null = null;
try { savedLang = localStorage.getItem(LANG_KEY); } catch { savedLang = null; }
if (savedLang && savedLang !== 'es') applyLang(savedLang);

/* ---------- 3D scene ---------- */
const sceneEl = document.getElementById('scene');

const startScene = async () => {
  if (!sceneEl) return;
  const THREE = await import('three');
  const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
  const { DRACOLoader } = await import('three/examples/jsm/loaders/DRACOLoader.js');
  const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js');

  // Phones have dense screens and weak GPUs: a lower pixel ratio without MSAA
  // looks the same at that density and costs a fraction of the fill rate.
  const small = MOBILE.matches;
  const renderer = new THREE.WebGLRenderer({ antialias: !small, alpha: true, powerPreference: small ? 'default' : 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.5 : 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.setClearColor(0x000000, 0);
  sceneEl.prepend(renderer.domElement);
  renderer.domElement.setAttribute('aria-hidden', 'true');

  const scene = new THREE.Scene();
  // The room is open on the camera side; fog in the stage colour melts the far
  // floor into the background when the visitor rotates the view.
  scene.fog = new THREE.Fog(0xeef0f4, 55, 95);
  scene.add(new THREE.HemisphereLight(0xffffff, 0xd9dde5, 2.2));
  const key = new THREE.DirectionalLight(0xfff6ee, 1.4);
  key.position.set(-8, 18, 6);
  scene.add(key);

  const draco = new DRACOLoader().setDecoderPath('/draco/');
  const loader = new GLTFLoader().setDRACOLoader(draco);
  const bar = sceneEl.querySelector<HTMLElement>('.loader');
  const gltf = await loader.loadAsync('/models/portfolio_scene.glb', (e) => {
    if (bar && e.total) bar.style.setProperty('--p', `${Math.round((e.loaded / e.total) * 100)}%`);
  });
  const root = gltf.scene;
  scene.add(root);

  // Lighting is baked in Blender: the room surfaces carry it in their textures and
  // every other piece carries it in its vertex colours (COLOR_0 = light, no albedo).
  // Those render unlit as base colour × baked light. Only the glowing beads, pulse
  // paths and the rails (curves, not baked) still use the realtime lights.
  // room_floor (outer) has no texture: MeshBasic with its flat colour.
  const BAKED = new Set(['room_floor_inner', 'room_wall_back', 'room_wall_side', 'room_floor']);
  const beads: { mat: InstanceType<typeof THREE.MeshStandardMaterial>; path: number; step: number }[] = [];
  root.traverse((o) => {
    const mesh = o as InstanceType<typeof THREE.Mesh>;
    if (!mesh.isMesh) return;
    const src = mesh.material as InstanceType<typeof THREE.MeshStandardMaterial>;
    if (BAKED.has(mesh.name) || BAKED.has(mesh.parent?.name ?? '')) {
      mesh.material = new THREE.MeshBasicMaterial({ map: src.map, color: src.map ? 0xffffff : src.color, toneMapped: false });
      return;
    }
    const glow = src.emissiveIntensity > 0 && src.emissive.getHex() !== 0;
    if (mesh.geometry.getAttribute('color') && !glow) {
      mesh.material = new THREE.MeshBasicMaterial({ color: src.color, map: src.map, vertexColors: true, toneMapped: false });
      return;
    }
    // Materials are shared between meshes; each lit mesh gets its own copy (the
    // beads need one each so the pulse can light them individually).
    const mat = src.clone();
    mesh.material = mat;
    mat.vertexColors = false;
    mat.roughness = Math.max(mat.roughness, 0.8);
    mat.metalness = 0;
    const m = /^(bead|port)_(\d+)_(\w+)/.exec(mesh.name);
    if (m) {
      const own = mat;
      const step = m[1] === 'port' ? (m[3] === 'a' ? 0 : 999) : Number(m[3]);
      beads.push({ mat: own, path: Number(m[2]), step });
    }
  });
  // Normalise each path's beads to 0..1 so the pulse speed doesn't depend on length.
  const byPath = new Map<number, typeof beads>();
  beads.forEach((b) => byPath.set(b.path, [...(byPath.get(b.path) ?? []), b]));
  const pulse: { mat: (typeof beads)[number]['mat']; u: number; offset: number }[] = [];
  byPath.forEach((list, path) => {
    list.sort((a, b) => a.step - b.step);
    list.forEach((b, i) => pulse.push({ mat: b.mat, u: i / Math.max(list.length - 1, 1), offset: (path * 0.37) % 1 }));
  });

  // Camera from Blender; we widen the FOV on narrow stages so the desk always fits.
  const src = gltf.cameras[0] as InstanceType<typeof THREE.PerspectiveCamera> | undefined;
  const camera = new THREE.PerspectiveCamera(src?.fov ?? 40, 1, 0.1, 300);
  if (src) {
    src.updateWorldMatrix(true, false);
    src.matrixWorld.decompose(camera.position, camera.quaternion, camera.scale);
  }
  const REF_ASPECT = 1920 / 1200;
  const baseFov = camera.fov;
  const fwd = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
  const target = camera.position.clone().addScaledVector(fwd, -camera.position.y / fwd.y);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.copy(target);
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.rotateSpeed = 0.5;
  controls.update();
  const az = controls.getAzimuthalAngle();
  const pol = controls.getPolarAngle();
  controls.minAzimuthAngle = az - 0.12;
  // Asymmetric: turning toward the right shows where the side wall and floor end,
  // so that side only gets a small nudge.
  controls.maxAzimuthAngle = az + 0.5;
  controls.minPolarAngle = Math.max(0.2, pol - 0.25);
  controls.maxPolarAngle = Math.min(1.35, pol + 0.12);

  // Hotspots anchor to the top of their node's bounding box.
  const box = new THREE.Box3();
  const anchors = Array.from(document.querySelectorAll<HTMLElement>('.hs')).map((el) => {
    const obj = root.getObjectByName(el.dataset.node ?? '');
    if (!obj) { el.hidden = true; return null; }
    box.setFromObject(obj);
    const p = new THREE.Vector3((box.min.x + box.max.x) / 2, box.max.y + 0.6, (box.min.z + box.max.z) / 2);
    return { el, obj, p, base: obj.scale.clone(), lift: 0 };
  }).filter(Boolean) as { el: HTMLElement; obj: InstanceType<typeof THREE.Object3D>; p: InstanceType<typeof THREE.Vector3>; base: InstanceType<typeof THREE.Vector3>; lift: number }[];

  // Clicking a piece of the desk opens the same window as its hotspot.
  const ray = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  let down = { x: 0, y: 0 };
  let hovered: (typeof anchors)[number] | null = null;
  const pick = (e: PointerEvent) => {
    const r = renderer.domElement.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObjects(anchors.map((a) => a.obj), true)[0];
    if (!hit) return null;
    return anchors.find((a) => { let o: InstanceType<typeof THREE.Object3D> | null = hit.object; while (o) { if (o === a.obj) return true; o = o.parent; } return false; }) ?? null;
  };
  renderer.domElement.addEventListener('pointerdown', (e) => { down = { x: e.clientX, y: e.clientY }; });
  renderer.domElement.addEventListener('pointerup', (e) => {
    if (Math.hypot(e.clientX - down.x, e.clientY - down.y) > 6) return; // was a drag
    const a = pick(e);
    if (a) openWin(a.el.dataset.open ?? '', a.el);
    else closeWin();
  });
  renderer.domElement.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    hovered = pick(e);
    renderer.domElement.style.cursor = hovered ? 'pointer' : '';
  });
  anchors.forEach((a) => {
    a.el.addEventListener('pointerenter', () => { hovered = a; });
    a.el.addEventListener('pointerleave', () => { if (hovered === a) hovered = null; });
  });

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = sceneEl;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // The canvas is full screen but the side panels cover its edges: frame the
    // desk for the free gap between them and shift the view so it sits centred there.
    const left = document.querySelector<HTMLElement>('.col.left');
    const right = document.querySelector<HTMLElement>('.col.right');
    const gapL = left && left.offsetParent && !MOBILE.matches ? left.getBoundingClientRect().right : 0;
    const gapR = right && right.offsetParent && !MOBILE.matches ? right.getBoundingClientRect().left : w;
    const gapW = Math.max(gapR - gapL, w * 0.4);
    const fit = gapW / h;
    // Widen only part of the way on narrow gaps: the sides may crop a little,
    // which keeps the desk large instead of showing the void around the room.
    const t = Math.tan(THREE.MathUtils.degToRad(baseFov) / 2) * Math.max(1, REF_ASPECT / fit) ** (fit < 1 ? 0.8 : 0.55);
    camera.fov = THREE.MathUtils.radToDeg(2 * Math.atan(t));
    const shift = (gapL + gapR) / 2 - w / 2;
    if (Math.abs(shift) > 1) camera.setViewOffset(w, h, -shift, 0, w, h);
    else camera.clearViewOffset();
    camera.updateProjectionMatrix();
  };
  new ResizeObserver(resize).observe(sceneEl);
  resize();

  const v = new THREE.Vector3();
  const clock = new THREE.Clock();
  let running = true;
  const frame = () => {
    if (!running) return;
    const t = clock.getElapsedTime();
    controls.update();
    if (!reducedMotion) {
      for (const b of pulse) {
        const head = (t * 0.35 + b.offset) % 1.4; // pause between pulses
        const d = head - b.u;
        b.mat.emissiveIntensity = 1 + 5 * Math.exp(-(d * d) / 0.006);
      }
    }
    const w = sceneEl.clientWidth;
    const h = sceneEl.clientHeight;
    for (const a of anchors) {
      const on = a === hovered || a.el.classList.contains('active');
      a.lift += ((on ? 1 : 0) - a.lift) * 0.15;
      a.obj.scale.copy(a.base).multiplyScalar(1 + a.lift * 0.05);
      v.copy(a.p).project(camera);
      a.el.classList.toggle('behind', v.z > 1);
      a.el.style.transform = `translate3d(${(v.x * 0.5 + 0.5) * w}px, ${(-v.y * 0.5 + 0.5) * h}px, 0) translate(-50%, -50%)`;
    }
    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  };
  document.addEventListener('visibilitychange', () => {
    running = !document.hidden;
    if (running) requestAnimationFrame(frame);
  });
  requestAnimationFrame(frame);
  sceneEl.classList.add('ready');
};

// Load the 3D after first paint so the poster is the LCP and input stays responsive.
const idle = (cb: () => void) => ('requestIdleCallback' in window ? requestIdleCallback(cb, { timeout: 1500 }) : setTimeout(cb, 300));
// Data saver or a slow link: keep the poster instead of downloading ~3 MB of 3D.
const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
const lite = !!conn?.saveData || /(^|-)2g$/.test(conn?.effectiveType ?? '');
if (lite) sceneEl?.classList.add('ready', 'static');
else idle(() => {
  startScene().catch((err) => {
    // Keep the poster and the HTML hotspots; they still work without WebGL.
    console.warn('3D scene unavailable:', err);
    sceneEl?.classList.add('ready', 'static');
  });
});
