import React from 'react'
import { projects } from '../data/projects'
import { ProjectModal } from './ProjectModal'

export const Projects = () => {
  return (
    <section className="projects" id="projects" data-screen-label="Projects">
      <div aria-hidden="true" className="sprite float b px-block" data-par="1.3" style={{ top: '12%', right: '4%', background: 'var(--cyan)', boxShadow: 'var(--glow-cyan)', opacity: 0.45 }}></div>
      <div aria-hidden="true" className="sprite float c" data-par="0.9" style={{ bottom: '18%', left: '3%', width: '14px', height: '14px', background: 'var(--magenta)', opacity: 0.4 }}></div>
      <div aria-hidden="true" className="sprite float px-block" data-par="1.1" style={{ top: '46%', left: '6%', width: '12px', height: '12px', background: 'var(--green)', opacity: 0.4 }}></div>
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="idx">03</span>
          <h2 data-es="PROYECTOS" data-en="PROJECTS">PROYECTOS</h2>
          <span className="rule"></span>
        </div>
        <div className="proj-grid">
          {projects.map((project, index) => (
            <article className="proj pix-box reveal" key={project.id}>
              <div className="thumb">
                <span className="num">{String(index + 1).padStart(2, '0')}</span>
                <img
                  src={project.cover}
                  width="1200"
                  height="630"
                  loading="lazy"
                  decoding="async"
                  alt=""
                />
              </div>
              <div className="body">
                <h3>
                  <button
                    type="button"
                    className="proj-open"
                    data-project={project.id}
                    aria-haspopup="dialog"
                  >
                    {project.title}
                  </button>
                </h3>
                <p data-es={project.tagline.es} data-en={project.tagline.en}>{project.tagline.es}</p>
                <div className="meta">
                  {project.chips.map((chip) => (
                    <span className="chip-sm" key={chip}>{chip}</span>
                  ))}
                </div>
                <span className="proj-cta" aria-hidden="true">
                  <span>&gt;</span> <span data-es="Ver caso de estudio" data-en="View case study">Ver caso de estudio</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
      {projects.map((project, index) => (
        <ProjectModal project={project} index={index} key={project.id} />
      ))}
    </section>
  )
}
