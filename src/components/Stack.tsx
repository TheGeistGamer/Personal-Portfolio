import React from 'react'

export const Stack = () => {
  return (
    <section className="stack" id="stack" data-screen-label="Stack">
      <div className="sprite float px-block" data-par="1.2" style={{ top: '14%', left: '3%', background: 'var(--cyan)', boxShadow: 'var(--glow-cyan)', opacity: 0.45 }}></div>
      <div className="sprite float b" data-par="0.8" style={{ top: '22%', right: '5%', width: '13px', height: '13px', background: 'var(--green)', opacity: 0.5 }}></div>
      <div className="sprite float c px-block" data-par="1.4" style={{ bottom: '16%', right: '9%', width: '15px', height: '15px', background: 'var(--violet)', opacity: 0.4 }}></div>
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="idx">02</span>
          <h2 data-es="STACK TECNOLÓGICO" data-en="TECH STACK">STACK TECNOLÓGICO</h2>
          <span className="rule"></span>
        </div>
        <div className="stack-grid">

          {/* Backend */}
          <div className="stack-col pix-box reveal">
            <h3 className="bk">BACKEND</h3>
            <div className="sub" data-es="el motor" data-en="the engine">el motor</div>
            <div className="bar v"><div className="top"><span className="nm">Node.js</span><span className="pc">90%</span></div><div className="track"><div className="fill" data-pc="90"></div></div></div>
            <div className="bar v"><div className="top"><span className="nm">Python</span><span className="pc">85%</span></div><div className="track"><div className="fill" data-pc="85"></div></div></div>
            <div className="bar v"><div className="top"><span className="nm">SQL</span><span className="pc">85%</span></div><div className="track"><div className="fill" data-pc="85"></div></div></div>
            <div className="bar v"><div className="top"><span className="nm">NoSQL</span><span className="pc">78%</span></div><div className="track"><div className="fill" data-pc="78"></div></div></div>
            <div className="chips">
              <span className="chip-sm">REST</span><span className="chip-sm">APIs</span><span className="chip-sm">PostgreSQL</span><span className="chip-sm">MongoDB</span>
            </div>
          </div>

          {/* DevOps / Cloud */}
          <div className="stack-col pix-box reveal">
            <h3 className="dv">DEVOPS / CLOUD</h3>
            <div className="sub" data-es="la infraestructura" data-en="the infrastructure">la infraestructura</div>
            <div className="bar c"><div className="top"><span className="nm">Docker</span><span className="pc">85%</span></div><div className="track"><div className="fill" data-pc="85"></div></div></div>
            <div className="bar c"><div className="top"><span className="nm">Kubernetes</span><span className="pc">75%</span></div><div className="track"><div className="fill" data-pc="75"></div></div></div>
            <div className="bar c"><div className="top"><span className="nm">AWS</span><span className="pc">80%</span></div><div className="track"><div className="fill" data-pc="80"></div></div></div>
            <div className="bar c"><div className="top"><span className="nm">Linux</span><span className="pc">85%</span></div><div className="track"><div className="fill" data-pc="85"></div></div></div>
            <div className="chips">
              <span className="chip-sm">Git</span><span className="chip-sm">CI/CD</span><span className="chip-sm">Claude Engine</span><span className="chip-sm">DevOps</span>
            </div>
          </div>

          {/* Frontend */}
          <div className="stack-col pix-box reveal">
            <h3 className="fr">FRONTEND</h3>
            <div className="sub" data-es="un poco de magia visual" data-en="a bit of visual magic">un poco de magia visual</div>
            <div className="bar g"><div className="top"><span className="nm">React</span><span className="pc">80%</span></div><div className="track"><div className="fill" data-pc="80"></div></div></div>
            <div className="bar g"><div className="top"><span className="nm">Next.js</span><span className="pc">75%</span></div><div className="track"><div className="fill" data-pc="75"></div></div></div>
            <div className="bar g"><div className="top"><span className="nm">Astro JS</span><span className="pc">72%</span></div><div className="track"><div className="fill" data-pc="72"></div></div></div>
            <div className="bar g"><div className="top"><span className="nm">Tailwind</span><span className="pc">80%</span></div><div className="track"><div className="fill" data-pc="80"></div></div></div>
            <div className="chips">
              <span className="chip-sm">JavaScript</span><span className="chip-sm">HTML/CSS</span><span className="chip-sm">React Native</span>
            </div>
          </div>

        </div>
      </div>
    </section>

  )
}
