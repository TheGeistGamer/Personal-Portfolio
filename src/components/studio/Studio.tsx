import React from 'react'
import { SITE } from '../../site'
import { projects } from '../../data/projects'
import { T } from '../T'
import { hotspots, stack } from './content'
import { Icon } from './Icon'
import { H, Windows } from './Windows'

// Single-screen landing: left = profile + stack, centre = interactive 3D desk,
// right = headline, projects and activity. Everything else opens as a window.
// Rendered to static HTML; behaviour lives in src/scripts/studio.ts.
export const Studio = () => (
  <div className="studio">
    <a className="skip" href="#stage" data-es="Saltar a la escena" data-en="Skip to scene">Saltar a la escena</a>

    {/* full-bleed 3D scene; every panel floats above it */}
    <div className="scene" id="scene">
      <img className="poster" src="/scene/poster.webp" width="1600" height="1000" alt="Escritorio 3D con monitor, proyectos y servicios conectados por líneas rojas" data-alt-es="Escritorio 3D con monitor, proyectos y servicios conectados por líneas rojas" data-alt-en="3D desk with a monitor, projects and services linked by red lines" fetchPriority="high" />
      <div className="hotspots" id="hotspots">
        {hotspots.map((h) => (
          <button type="button" className="hs" data-node={h.node} data-open={h.open} data-group={h.group} key={h.node} aria-label={h.label.es} data-aria-es={h.label.es} data-aria-en={h.label.en}>
            <span className="hs-dot"><Icon name={h.icon} size={18} /></span>
            <span className="hs-plus" aria-hidden="true"><Icon name="plus" size={10} /></span>
            <span className="hs-label" aria-hidden="true"><T l={h.label} /></span>
          </button>
        ))}
      </div>
      <div className="scene-hint" aria-hidden="true"><Icon name="rotate" size={16} /><T l={{ es: 'Arrastra para girar', en: 'Drag to rotate' }} /></div>
      <div className="loader" aria-hidden="true"><i /></div>
    </div>

    {/* ---------- left column ---------- */}
    <aside className="col left" aria-label="Perfil">
      <div className="brand">
        <span className="avatar" aria-hidden="true">FH</span>
        <div>
          <b>{SITE.name}</b>
          <span className="status"><i /> <T l={{ es: 'Disponible', en: 'Available' }} /></span>
        </div>
      </div>

      <button type="button" className="card profile-card" data-open="about">
        <span className="card-k"><T l={{ es: 'Perfil', en: 'Profile' }} /></span>
        <b data-es="Desarrollador Backend" data-en="Backend Developer">Desarrollador Backend</b>
        <T l={{ es: 'APIs, sistemas escalables e infraestructura cloud.', en: 'APIs, scalable systems and cloud infrastructure.' }} />
        <span className="card-cta"><T l={{ es: 'Sobre mí', en: 'About me' }} /><Icon name="arrow" size={14} /></span>
      </button>

      <div className="sec-title">
        <span>Stack <small>{stack.length}</small></span>
        <button type="button" className="icon-btn sm" data-open="stack" aria-label="Ver stack completo" data-aria-es="Ver stack completo" data-aria-en="See full stack"><Icon name="plus" size={16} /></button>
      </div>
      <div className="mini-stack">
        {stack.map((g) => (
          <button type="button" className="card mini" data-open={`stack:${g.id}`} key={g.id}>
            <span className="mini-top"><b>{g.name}</b><span>{Math.round(g.bars.reduce((a, b) => a + b.pc, 0) / g.bars.length)}%</span></span>
            <span className="mini-chips">{g.bars.map((b) => b.name).join(' · ')}</span>
          </button>
        ))}
      </div>

      <div className="links">
        <a className="icon-btn" href="https://github.com/TheGeistGamer" target="_blank" rel="noopener noreferrer me" aria-label="GitHub"><Icon name="github" size={18} /></a>
        <a className="icon-btn" href="https://www.linkedin.com/in/frank-giovanni-s-10a798360" target="_blank" rel="noopener noreferrer me" aria-label="LinkedIn"><Icon name="linkedin" size={18} /></a>
        <a className="icon-btn" href={`mailto:${SITE.email}`} aria-label="Email"><Icon name="mail" size={18} /></a>
      </div>
    </aside>

    {/* ---------- centre stage ---------- */}
    <main className="stage" id="stage">
      <div className="stage-head">
        <div>
          <p className="stage-title" data-es="Escritorio" data-en="Workspace">Escritorio</p>
          <T l={{ es: 'Toca un ícono para abrirlo', en: 'Tap an icon to open it' }} />
        </div>
        <div className="pills" role="group" aria-label="Filtro">
          <button type="button" className="pill on" data-filter="all"><T l={{ es: 'Todo', en: 'All' }} /></button>
          <button type="button" className="pill" data-filter="projects"><T l={{ es: 'Proyectos', en: 'Projects' }} /></button>
          <button type="button" className="pill" data-filter="stack">Stack</button>
          <button type="button" className="pill" data-filter="contact"><T l={{ es: 'Contacto', en: 'Contact' }} /></button>
        </div>
      </div>

      <Windows />
    </main>

    {/* ---------- right column ---------- */}
    <aside className="col right" aria-label="Resumen">
      <div className="right-top">
        <div className="lang" id="lang" role="group" aria-label="Idioma / Language">
          <button type="button" data-lang="es" className="on" aria-pressed="true" lang="es">ES</button>
          <button type="button" data-lang="en" aria-pressed="false" lang="en">EN</button>
        </div>
        <button type="button" className="btn primary sm" data-open="contact"><T l={{ es: 'Contactar', en: 'Contact' }} /></button>
      </div>

      <h1 className="headline">
        <span data-es="Hola, soy Frank Huerta, desarrollador backend." data-en="Hi, I'm Frank Huerta, backend developer.">Hola, soy Frank Huerta, desarrollador backend.</span>
        <b data-es="Construyo sistemas que escalan." data-en="I build systems that scale.">Construyo sistemas que escalan.</b>
      </h1>
      <H as="p" className="lede" l={{ es: 'Desarrollador backend: APIs limpias, bases de datos sólidas e infraestructura que no se cae. Del servidor a la nube.', en: 'Backend developer: clean APIs, solid databases and infrastructure that stays up. From the server to the cloud.' }} />

      <div className="sec-title"><span><T l={{ es: 'Proyectos', en: 'Projects' }} /> <small>{projects.length}</small></span></div>
      <div className="proj-cards">
        {projects.map((p) => (
          <button type="button" className="proj-card" data-open={p.id} key={p.id}>
            <img src={p.cover} width="1200" height="630" loading="lazy" decoding="async" alt="" />
            <span><b>{p.title}</b><T l={p.tagline} /></span>
          </button>
        ))}
      </div>

      <div className="sec-title"><span><T l={{ es: 'Actividad', en: 'Activity' }} /></span></div>
      <ol className="timeline">
        {projects.map((p, i) => (
          <li key={p.id} className={i === 0 ? 'now' : ''}>
            <span className="tl-date"><T l={p.facts[0].value} /></span>
            <button type="button" className="tl-card" data-open={p.id}>
              <b>{p.title}</b>
              <span>{p.chips.slice(0, 3).join(' · ')}</span>
            </button>
          </li>
        ))}
      </ol>
    </aside>
  </div>
)
