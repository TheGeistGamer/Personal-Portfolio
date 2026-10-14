import React from 'react'
import { SITE } from '../../site'
import type { Figure, L, Project } from '../../data/projects'
import { projects } from '../../data/projects'
import { T } from '../T'
import { about, stack } from './content'
import { Icon } from './Icon'

// Bilingual node whose text contains markup (<b>, <span>…).
export const H = ({ l, as: Tag = 'p', className }: { l: L; as?: 'p' | 'span' | 'h2' | 'h3'; className?: string }) => (
  <Tag className={className} data-es={l.es} data-en={l.en} dangerouslySetInnerHTML={{ __html: l.es }} />
)

const Win = ({ id, title, kicker, wide, children }: { id: string; title: L; kicker?: L; wide?: boolean; children: React.ReactNode }) => (
  <section className={`win${wide ? ' wide' : ''}`} id={`win-${id}`} data-win={id} role="dialog" aria-modal="false" aria-labelledby={`win-${id}-t`} hidden>
    <header className="win-bar">
      <div>
        {kicker && <span className="win-kicker"><T l={kicker} /></span>}
        <h2 id={`win-${id}-t`}><T l={title} /></h2>
      </div>
      <button type="button" className="icon-btn" data-close aria-label="Cerrar" data-aria-es="Cerrar" data-aria-en="Close">
        <Icon name="close" size={18} />
      </button>
    </header>
    <div className="win-body">{children}</div>
  </section>
)

const StackBars = ({ group }: { group: (typeof stack)[number] }) => (
  <div className="stack-card" id={`stack-${group.id}`}>
    <div className="stack-head">
      <h3>{group.name}</h3>
      <T l={group.sub} />
    </div>
    {group.bars.map((bar) => (
      <div className="bar" key={bar.name}>
        <div className="bar-top"><span>{bar.name}</span><span>{bar.pc}%</span></div>
        <div className="bar-track"><i style={{ width: `${bar.pc}%` }} /></div>
      </div>
    ))}
    <div className="chips">{group.chips.map((c) => <span className="chip" key={c}>{c}</span>)}</div>
  </div>
)

const FigureView = ({ figure }: { figure: Figure }) => {
  if (figure.type === 'terminal') {
    return (
      <figure className="fig term">
        <div className="term-bar"><i /><i /><i /><span>{figure.title}</span></div>
        <pre>{figure.lines.map((line) => line.text).join('\n')}</pre>
      </figure>
    )
  }
  return (
    <figure className={`fig ${figure.kind}`}>
      <img src={figure.src} loading="lazy" decoding="async" alt={figure.alt.es} data-alt-es={figure.alt.es} data-alt-en={figure.alt.en} />
    </figure>
  )
}

const ProjectWin = ({ project, index }: { project: Project; index: number }) => (
  <Win id={project.id} title={{ es: project.title, en: project.title }} kicker={{ es: `${String(index + 1).padStart(2, '0')} · CASO DE ESTUDIO`, en: `${String(index + 1).padStart(2, '0')} · CASE STUDY` }} wide>
    <img className="pw-cover" src={project.cover} width="1200" height="630" loading="lazy" decoding="async" alt={project.coverAlt.es} data-alt-es={project.coverAlt.es} data-alt-en={project.coverAlt.en} />
    <T as="p" l={project.summary} />
    <ul className="pw-facts">
      {project.facts.map((f, i) => <li key={i}><T l={f.label} /><b><T l={f.value} /></b></li>)}
    </ul>
    <div className="pw-stats">
      {project.stats.map((s, i) => <div key={i}><b>{s.value}</b><T l={s.label} /></div>)}
    </div>
    {project.link && (
      <a className="btn primary" href={project.link.href} target="_blank" rel="noopener noreferrer">
        <T l={project.link.label} /><Icon name="external" size={16} />
      </a>
    )}
    {project.gallery && (
      <div className="pw-gallery" tabIndex={0} aria-label="Gallery">
        {project.gallery.map((g, i) => (
          <figure key={i}>
            <img src={g.src} decoding="async" alt={g.alt.es} data-alt-es={g.alt.es} data-alt-en={g.alt.en} />
            <figcaption><T l={g.alt} /></figcaption>
          </figure>
        ))}
      </div>
    )}
    <h3 className="pw-h"><T l={{ es: 'El reto', en: 'The challenge' }} /></h3>
    <T as="p" l={project.challenge.intro} />
    <ol className="pw-list">{project.challenge.items.map((it, i) => <li key={i}><T l={it} /></li>)}</ol>
    {project.challenge.outro && <T as="p" l={project.challenge.outro} />}
    <h3 className="pw-h"><T l={{ es: 'Skills que demuestra', en: 'Skills it shows' }} /></h3>
    <div className="chips">{project.skills.map((s, i) => <span className="chip" key={i}><T l={s} /></span>)}</div>
    {project.articles.map((a, i) => (
      <article className="pw-art" key={i}>
        <span className="win-kicker"><T l={{ es: `ARTÍCULO ${String(i + 1).padStart(2, '0')}`, en: `ARTICLE ${String(i + 1).padStart(2, '0')}` }} /></span>
        <h3><T l={a.title} /></h3>
        <p className="pw-idea"><T as="strong" l={{ es: 'Idea central: ', en: 'Core idea: ' }} /><T l={a.idea} /></p>
        <ul className="pw-list">{a.points.map((p, j) => <li key={j}><T l={p} /></li>)}</ul>
        <p className="pw-shows"><T as="strong" l={{ es: 'Qué demuestra: ', en: 'What it shows: ' }} /><T l={a.shows} /></p>
        <div className={`pw-figs${a.figures.length > 1 ? ' multi' : ''}${a.figures.some((f) => f.type === 'image' && f.kind === 'wide') ? ' wide' : ''}`}>{a.figures.map((f, j) => <FigureView figure={f} key={j} />)}</div>
      </article>
    ))}
    <div className="pw-two">
      <div>
        <h3 className="pw-h"><T l={{ es: 'Qué aprendí', en: 'What I learned' }} /></h3>
        <ul className="pw-list">{project.learned.map((x, i) => <li key={i}><T l={x} /></li>)}</ul>
      </div>
      <div>
        <h3 className="pw-h"><T l={{ es: 'Qué mejoraría', en: 'What I would improve' }} /></h3>
        <ul className="pw-list">{project.improve.map((x, i) => <li key={i}><T l={x} /></li>)}</ul>
      </div>
    </div>
    <button type="button" className="btn primary" data-open="contact">
      <T l={{ es: '¿Quieres algo así? Hablemos', en: 'Want something like this? Let’s talk' }} /><Icon name="arrow" size={16} />
    </button>
  </Win>
)

export const Windows = () => (
  <div className="wins" id="wins">
    <Win id="about" title={{ es: 'Sobre mí', en: 'About me' }} kicker={{ es: 'PERFIL', en: 'PROFILE' }}>
      {about.paragraphs.map((p, i) => <H l={p} key={i} />)}
      <p className="sig" data-es="// siempre aprendiendo, siempre construyendo" data-en="// always learning, always building">// siempre aprendiendo, siempre construyendo</p>
      <div className="facts">
        {about.facts.map((f) => <div className="fact" key={f.n}><b>{f.n}</b><T l={f.l} /></div>)}
      </div>
      <button type="button" className="btn" data-open="stack">
        <T l={{ es: 'Ver mi stack', en: 'See my stack' }} /><Icon name="arrow" size={16} />
      </button>
    </Win>

    <Win id="stack" title={{ es: 'Stack tecnológico', en: 'Tech stack' }} kicker={{ es: 'STACK', en: 'STACK' }} wide>
      <div className="stack-grid">{stack.map((g) => <StackBars group={g} key={g.id} />)}</div>
    </Win>

    <Win id="projects" title={{ es: 'Proyectos', en: 'Projects' }} kicker={{ es: 'TRABAJO', en: 'WORK' }}>
      <div className="proj-list">
        {projects.map((p, i) => (
          <button type="button" className="proj-row" data-open={p.id} key={p.id}>
            <img src={p.cover} width="1200" height="630" loading="lazy" decoding="async" alt="" />
            <span>
              <small>{String(i + 1).padStart(2, '0')}</small>
              <b>{p.title}</b>
              <T l={p.tagline} />
            </span>
            <Icon name="arrow" size={18} />
          </button>
        ))}
      </div>
    </Win>

    <Win id="agency" title={{ es: 'InfinityDev Agency', en: 'InfinityDev Agency' }} kicker={{ es: 'ESTUDIO', en: 'STUDIO' }}>
      <T as="p" l={{ es: 'Los proyectos comerciales y para clientes los construyo desde InfinityDev Agency.', en: 'Commercial and client work is built through InfinityDev Agency.' }} />
      <a className="btn primary" href={SITE.agency.url} target="_blank" rel="noopener">
        INFINITYDEV.AGENCY<Icon name="external" size={16} />
      </a>
    </Win>

    <Win id="contact" title={{ es: '¿Construimos algo?', en: "Let's build something?" }} kicker={{ es: 'CONTACTO', en: 'CONTACT' }}>
      <T as="p" l={{ es: '¿Tienes una idea, un proyecto o una vacante? Mi terminal siempre está escuchando en el puerto correcto.', en: 'Got an idea, a project or an opening? My terminal is always listening on the right port.' }} />
      <div className="contact-actions">
        <a className="btn primary" href={`mailto:${SITE.email}`}><Icon name="mail" size={16} />{SITE.email}</a>
        <a className="btn" href="https://github.com/TheGeistGamer" target="_blank" rel="noopener noreferrer me"><Icon name="github" size={16} />GitHub</a>
        <a className="btn" href="https://www.linkedin.com/in/frank-giovanni-s-10a798360" target="_blank" rel="noopener noreferrer me"><Icon name="linkedin" size={16} />LinkedIn</a>
      </div>
    </Win>

    {projects.map((p, i) => <ProjectWin project={p} index={i} key={p.id} />)}
  </div>
)
