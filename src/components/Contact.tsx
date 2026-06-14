import React from 'react'

export const Contact = () => {
  return (
    <section className="contact" id="contact" data-screen-label="Contact">
      <div className="wrap">
        <div className="contact-box pix-box reveal">
          <div className="sprite float px-block" data-par="1.2" style={{ top: '18px', left: '24px', background: 'var(--violet)' }}></div>
          <div className="sprite float b px-block" data-par="0.9" style={{ bottom: '20px', right: '30px', background: 'var(--cyan)' }}></div>
          <h2>
            <span data-es="¿CONSTRUIMOS" data-en="LET'S BUILD">¿CONSTRUIMOS</span>
            <span className="stroke" data-es="ALGO?" data-en="SOMETHING?">ALGO?</span>
          </h2>
          <p data-es="¿Tienes una idea, un proyecto o una vacante? Mi terminal siempre está escuchando en el puerto correcto." data-en="Got an idea, a project or an opening? My terminal is always listening on the right port.">¿Tienes una idea, un proyecto o una vacante? Mi terminal siempre está escuchando en el puerto correcto.</p>
          <div className="contact-actions">
            <a className="btn primary" href="https://github.com/TheGeistGamer" target="_blank" rel="noopener">GITHUB</a>
            <a className="btn" href="https://www.linkedin.com/in/frank-giovanni-s-10a798360" target="_blank" rel="noopener">LINKEDIN</a>
          </div>
        </div>
      </div>
    </section>
  )
}
