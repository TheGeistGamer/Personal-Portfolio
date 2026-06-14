import React from 'react'

export const About = () => {
  return (
    <section className="about" id="about" data-screen-label="About">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="idx">01</span>
          <h2 data-es="SOBRE MÍ" data-en="ABOUT ME">SOBRE MÍ</h2>
          <span className="rule"></span>
        </div>
        <div className="about-grid">
          <div className="avatar-col reveal">
            <div className="avatar-frame">
              <image-slot id="avatar" shape="rect" placeholder="Suelta tu foto / avatar pixel"></image-slot>
            </div>
            <span className="avatar-cap">[ PLAYER_01 ]</span>
          </div>
          <div className="about-body reveal">
            <p data-es="Soy <span className='hl'>desarrollador backend</span>. Me apasiona construir el lado invisible de las cosas: servidores, bases de datos y APIs que aguantan carga y no se caen a las 3am."
              data-en="I'm a <span className='hl'>backend developer</span>. I'm passionate about building the invisible side of things: servers, databases and APIs that handle load and don't crash at 3am.">
              Soy <span className="hl">desarrollador backend</span>. Me apasiona construir el lado invisible de las cosas: servidores, bases de datos y APIs que aguantan carga y no se caen a las 3am.
            </p>
            <p data-es="Mi filosofía: <span className='hl'>código simple por encima del código ingenioso</span>, automatizar lo repetitivo y aprender algo nuevo en cada proyecto. Creo en los fundamentos sólidos, en documentar bien y en construir para quien venga después."
              data-en="My philosophy: <span className='hl'>simple code over clever code</span>, automate the repetitive, and learn something new in every project. I believe in solid fundamentals, good documentation, and building for whoever comes next.">
              Mi filosofía: <span className="hl">código simple por encima del código ingenioso</span>, automatizar lo repetitivo y aprender algo nuevo en cada proyecto. Creo en los fundamentos sólidos, en documentar bien y en construir para quien venga después.
            </p>
            <p className="sig" data-es="// siempre aprendiendo, siempre construyendo" data-en="// always learning, always building">// siempre aprendiendo, siempre construyendo</p>

            <div className="facts">
              <div className="fact pix-box">
                <div className="n">04+</div>
                <div className="l" data-es="proyectos fuertes" data-en="strong projects">proyectos fuertes</div>
              </div>
              <div className="fact pix-box">
                <div className="n">∞</div>
                <div className="l" data-es="ganas de aprender" data-en="drive to learn">ganas de aprender</div>
              </div>
              <div className="fact pix-box">
                <div className="n">24/7</div>
                <div className="l" data-es="uptime mental" data-en="mental uptime">uptime mental</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
