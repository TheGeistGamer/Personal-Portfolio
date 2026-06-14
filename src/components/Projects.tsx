import React from 'react'

export const Projects = () => {
  return (
    <section className="projects" id="projects" data-screen-label="Projects">
      <div className="sprite float b px-block" data-par="1.3" style={{ top: '12%', right: '4%', background: 'var(--cyan)', boxShadow: 'var(--glow-cyan)', opacity: 0.45 }}></div>
      <div className="sprite float c" data-par="0.9" style={{ bottom: '18%', left: '3%', width: '14px', height: '14px', background: 'var(--magenta)', opacity: 0.4 }}></div>
      <div className="sprite float px-block" data-par="1.1" style={{ top: '46%', left: '6%', width: '12px', height: '12px', background: 'var(--green)', opacity: 0.4 }}></div>
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="idx">03</span>
          <h2 data-es="PROYECTOS" data-en="PROJECTS">PROYECTOS</h2>
          <span className="rule"></span>
        </div>
        <div className="proj-grid">

          <article className="proj pix-box reveal">
            <div className="thumb">
              <span className="num">01</span>
              <image-slot id="proj1" shape="rect" placeholder="Captura del proyecto"></image-slot>
              <span className="ph">[ DROP_SCREENSHOT ]</span>
            </div>
            <div className="body">
              <h3 data-es="PROYECTO 01" data-en="PROJECT 01">PROYECTO 01</h3>
              <p data-es="Descripción breve de tu proyecto más fuerte. Qué problema resuelve y tu rol." data-en="Short description of your strongest project. What it solves and your role.">Descripción breve de tu proyecto más fuerte. Qué problema resuelve y tu rol.</p>
              <div className="meta"><span className="chip-sm">Node.js</span><span className="chip-sm">Docker</span><span className="chip-sm">AWS</span></div>
              <div className="links">
                <a href="#"><span>&gt;</span> GitHub</a>
                <a href="#"><span>&gt;</span> <span data-es="Demo" data-en="Demo">Demo</span></a>
              </div>
            </div>
          </article>

          <article className="proj pix-box reveal">
            <div className="thumb">
              <span className="num">02</span>
              <image-slot id="proj2" shape="rect" placeholder="Captura del proyecto"></image-slot>
              <span className="ph">[ DROP_SCREENSHOT ]</span>
            </div>
            <div className="body">
              <h3 data-es="PROYECTO 02" data-en="PROJECT 02">PROYECTO 02</h3>
              <p data-es="Descripción breve. Tecnologías clave y resultado o impacto logrado." data-en="Short description. Key technologies and the result or impact achieved.">Descripción breve. Tecnologías clave y resultado o impacto logrado.</p>
              <div className="meta"><span className="chip-sm">Python</span><span className="chip-sm">PostgreSQL</span><span className="chip-sm">K8s</span></div>
              <div className="links">
                <a href="#"><span>&gt;</span> GitHub</a>
                <a href="#"><span>&gt;</span> <span data-es="Demo" data-en="Demo">Demo</span></a>
              </div>
            </div>
          </article>

          <article className="proj pix-box reveal">
            <div className="thumb">
              <span className="num">03</span>
              <image-slot id="proj3" shape="rect" placeholder="Captura del proyecto"></image-slot>
              <span className="ph">[ DROP_SCREENSHOT ]</span>
            </div>
            <div className="body">
              <h3 data-es="PROYECTO 03" data-en="PROJECT 03">PROYECTO 03</h3>
              <p data-es="Descripción breve. Ideal para mostrar una API, un servicio o una arquitectura." data-en="Short description. Great for showing an API, a service or an architecture.">Descripción breve. Ideal para mostrar una API, un servicio o una arquitectura.</p>
              <div className="meta"><span className="chip-sm">React</span><span className="chip-sm">Next.js</span><span className="chip-sm">Tailwind</span></div>
              <div className="links">
                <a href="#"><span>&gt;</span> GitHub</a>
                <a href="#"><span>&gt;</span> <span data-es="Demo" data-en="Demo">Demo</span></a>
              </div>
            </div>
          </article>

          <article className="proj pix-box reveal">
            <div className="thumb">
              <span className="num">04</span>
              <image-slot id="proj4" shape="rect" placeholder="Captura del proyecto"></image-slot>
              <span className="ph">[ DROP_SCREENSHOT ]</span>
            </div>
            <div className="body">
              <h3 data-es="PROYECTO 04" data-en="PROJECT 04">PROYECTO 04</h3>
              <p data-es="Descripción breve. Cuenta qué aprendiste o qué reto técnico superaste." data-en="Short description. Tell what you learned or which technical challenge you solved.">Descripción breve. Cuenta qué aprendiste o qué reto técnico superaste.</p>
              <div className="meta"><span className="chip-sm">Astro</span><span className="chip-sm">Linux</span><span className="chip-sm">CI/CD</span></div>
              <div className="links">
                <a href="#"><span>&gt;</span> GitHub</a>
                <a href="#"><span>&gt;</span> <span data-es="Demo" data-en="Demo">Demo</span></a>
              </div>
            </div>
          </article>

        </div>
      </div>
    </section>
  )
}
