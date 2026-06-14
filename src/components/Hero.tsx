import React from 'react'

export const Hero = () => {
  return (
    <header className="hero" id="top" data-screen-label="Hero">
      <div className="sprite float px-block" data-par="1.1" style={{ top: '18%', left: '6%', background: 'var(--violet)', boxShadow: 'var(--glow-violet)' }}></div>
      <div className="sprite float b px-block" data-par="1.5" style={{ top: '30%', right: '8%', background: 'var(--cyan)', boxShadow: 'var(--glow-cyan)' }}></div>
      <div className="sprite float c" data-par="0.7" style={{ bottom: '22%', left: '12%', width: '14px', height: '14px', background: 'var(--green)' }}></div>
      <div className="sprite float px-block" data-par="1.3" style={{ bottom: '30%', right: '14%', width: '16px', height: '16px', background: 'var(--magenta)' }}></div>

      <div className="wrap hero-grid">
        <div className="hero-copy">
          <div className="hero-kicker">
            <span className="chip">PORTFOLIO · 2026</span>
            <span className="line"></span>
          </div>
          <h1>
            <span data-es="HOLA, SOY" data-en="HI, I'M">HOLA, SOY</span><br />
            FRANK<br />
            <span className="stroke">HUERTA</span>
          </h1>
          <p className="role">
            <span data-es="&gt; rol:" data-en="&gt; role:">&gt; rol:</span>
            <b data-es="Desarrollador Backend" data-en="Backend Developer">Desarrollador Backend</b>
            &amp; <span data-es="un poco front" data-en="a bit of front">un poco front</span>
          </p>
          <p className="lede"
            data-es="Construyo <span className='hl'>sistemas sólidos, APIs limpias</span> e infraestructura que escala sin romperse. Del servidor a la nube."
            data-en="I build <span className='hl'>solid systems, clean APIs</span> and infrastructure that scales without breaking. From the server to the cloud.">
            Construyo <span className="hl">sistemas sólidos, APIs limpias</span> e infraestructura que escala sin romperse. Del servidor a la nube.
          </p>
          <div className="cta-row">
            <a className="btn primary" href="#projects" data-es="VER PROYECTOS" data-en="VIEW PROJECTS">VER PROYECTOS</a>
            <a className="btn" href="#contact" data-es="CONTACTO" data-en="CONTACT">CONTACTO</a>
          </div>
          <div className="hero-socials">
            <a className="soc" href="https://github.com/TheGeistGamer" target="_blank" rel="noopener" aria-label="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.2-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0C17.3 4.8 18.3 5.1 18.3 5.1c.6 1.6.2 2.8.1 3.1.8.9 1.2 1.9 1.2 3.2 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.3c0 .4.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" /></svg>
            </a>
            <a className="soc" href="https://www.linkedin.com/in/frank-giovanni-s-10a798360" target="_blank" rel="noopener" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.4 20.4h-3.6v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.2V9h3.4v1.6h.1c.5-.9 1.7-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM7.1 20.4H3.5V9h3.6v11.4zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7c0-.9-.8-1.7-1.8-1.7z" /></svg>
            </a>
            <a className="soc" href="/cdn-cgi/l/email-protection#b0" id="mailLink" aria-label="Email">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2.5" y="4.5" width="19" height="15" /><path d="M3 6l9 7 9-7" /></svg>
            </a>
          </div>
            </div>

            {/* CRT terminal */}
            <div className="crt-stage">
              <div className="crt">
                <div className="crt-bar">
                  <i className="r"></i><i className="y"></i><i className="g"></i>
                  <span>frank@server:~</span>
                </div>
                <div className="crt-screen" id="term"></div>
                <div className="crt-foot">FRANK_OS v2.6 · PIXEL TERMINAL</div>
              </div>
              <div className="crt-stand"></div>
              <div className="crt-base"></div>
            </div>
        </div>

        <div className="scroll-hint">
          <span data-es="DESLIZA" data-en="SCROLL">DESLIZA</span>
          <span className="arr"></span>
        </div>
    </header>
  )
}
