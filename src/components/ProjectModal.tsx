import React from 'react'
import type { Figure, Project } from '../data/projects'
import { T } from './T'

const FigureView = ({ figure }: { figure: Figure }) => {
  if (figure.type === 'terminal') {
    return (
      <figure className="pm-fig pm-term">
        <div className="pm-term-bar"><i className="r"></i><i className="y"></i><i className="g"></i><span>{figure.title}</span></div>
        <div className="pm-term-body">
          {figure.lines.map((line, i) => (
            <div className={`ln ${line.tone ?? ''}`} key={i}>{line.text}</div>
          ))}
        </div>
      </figure>
    )
  }
  return (
    <figure className={`pm-fig pm-img ${figure.kind}`}>
      <img
        src={figure.src}
        loading="lazy"
        decoding="async"
        alt={figure.alt.es}
        data-alt-es={figure.alt.es}
        data-alt-en={figure.alt.en}
      />
    </figure>
  )
}

export const ProjectModal = ({ project, index }: { project: Project; index: number }) => {
  const titleId = `pm-title-${project.id}`
  return (
    <dialog className="pm" id={`pm-${project.id}`} aria-labelledby={titleId} data-project-dialog={project.id}>
      <div className="pm-shell">
        <div className="pm-bar">
          <i className="r"></i><i className="y"></i><i className="g"></i>
          <span className="pm-file">{`proyecto_${String(index + 1).padStart(2, '0')}/${project.id}.md`}</span>
          <button type="button" className="pm-close" data-close aria-label="Cerrar" data-aria-es="Cerrar" data-aria-en="Close">
            <span aria-hidden="true">[X]</span>
          </button>
        </div>

        <div className="pm-scroll">
          <header className="pm-head">
            <img className="pm-cover" src={project.cover} width="1200" height="630" loading="lazy" decoding="async" alt={project.coverAlt.es} data-alt-es={project.coverAlt.es} data-alt-en={project.coverAlt.en} />
            <div className="pm-head-body">
              <span className="pm-kicker">{`CASE_STUDY // ${String(index + 1).padStart(2, '0')}`}</span>
              <h3 id={titleId}>{project.title}</h3>
              <T as="p" l={project.tagline} />
              <ul className="pm-facts">
                {project.facts.map((fact, i) => (
                  <li key={i}><T l={fact.label} /><b><T l={fact.value} /></b></li>
                ))}
              </ul>
              {project.link && (
                <a className="btn primary pm-link" href={project.link.href} target="_blank" rel="noopener noreferrer">
                  <T l={project.link.label} /> <span aria-hidden="true">&gt;</span>
                </a>
              )}
            </div>
          </header>

          <div className="pm-stats">
            {project.stats.map((stat, i) => (
              <div className="pm-stat" key={i}>
                <span className="n">{stat.value}</span>
                <span className="l"><T l={stat.label} /></span>
              </div>
            ))}
          </div>

          {project.gallery && (
            <section className="pm-sec" aria-label="Gallery">
              <h4 className="pm-h"><T l={{ es: 'Recorrido visual', en: 'Visual tour' }} /></h4>
              <div className="pm-gallery" tabIndex={0}>
                {project.gallery.map((shot, i) => (
                  <figure key={i}>
                    <img src={shot.src} loading="lazy" decoding="async" alt={shot.alt.es} data-alt-es={shot.alt.es} data-alt-en={shot.alt.en} />
                    <figcaption><T l={shot.alt} /></figcaption>
                  </figure>
                ))}
              </div>
            </section>
          )}

          <section className="pm-sec">
            <h4 className="pm-h"><T l={{ es: 'El reto', en: 'The challenge' }} /></h4>
            <T as="p" l={project.challenge.intro} />
            <ol className="pm-list num">
              {project.challenge.items.map((item, i) => (
                <li key={i}><T l={item} /></li>
              ))}
            </ol>
            {project.challenge.outro && <T as="p" l={project.challenge.outro} />}
          </section>

          <section className="pm-sec">
            <h4 className="pm-h"><T l={{ es: 'Skills que demuestra', en: 'Skills it shows' }} /></h4>
            <ul className="pm-skills">
              {project.skills.map((skill, i) => (
                <li className="chip-sm" key={i}><T l={skill} /></li>
              ))}
            </ul>
          </section>

          {project.articles.map((article, i) => {
            const multi = article.figures.length > 1
            return (
              <article className={`pm-art${i % 2 ? ' flip' : ''}`} key={i}>
                <div className="pm-art-text">
                  <span className="pm-art-n">{`ARTICLE_${String(i + 1).padStart(2, '0')}`}</span>
                  <h4><T l={article.title} /></h4>
                  <p className="pm-idea"><T as="strong" l={{ es: 'Idea central: ', en: 'Core idea: ' }} /><T l={article.idea} /></p>
                  <ul className="pm-list">
                    {article.points.map((point, j) => (
                      <li key={j}><T l={point} /></li>
                    ))}
                  </ul>
                  <p className="pm-shows"><T as="strong" l={{ es: 'Qué demuestra: ', en: 'What it shows: ' }} /><T l={article.shows} /></p>
                </div>
                <div className={`pm-art-figs${multi ? ' multi' : ''}`}>
                  {article.figures.map((figure, j) => (
                    <FigureView figure={figure} key={j} />
                  ))}
                </div>
              </article>
            )
          })}

          <section className="pm-sec pm-two">
            <div>
              <h4 className="pm-h"><T l={{ es: 'Qué aprendí', en: 'What I learned' }} /></h4>
              <ul className="pm-list">
                {project.learned.map((item, i) => (
                  <li key={i}><T l={item} /></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="pm-h"><T l={{ es: 'Qué mejoraría', en: 'What I would improve' }} /></h4>
              <ul className="pm-list">
                {project.improve.map((item, i) => (
                  <li key={i}><T l={item} /></li>
                ))}
              </ul>
            </div>
          </section>

          <footer className="pm-cta">
            <h4><T l={{ es: '¿Quieres algo así para tu proyecto?', en: 'Want something like this for your project?' }} /></h4>
            <T as="p" l={{ es: 'Hablemos y lo llevamos de la idea a producción.', en: "Let's talk and take it from idea to production." }} />
            <a className="btn primary" href="#contact" data-close>
              <T l={{ es: 'CONTACTAR', en: 'CONTACT' }} /> <span aria-hidden="true">&gt;</span>
            </a>
          </footer>
        </div>
      </div>
    </dialog>
  )
}
