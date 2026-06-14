import React from 'react'

export const NavBar = () => {
  return (
    <nav className="nav">
      <a className="brand" href="#top">
        <span className="mark">FG</span>
        <span className="who">FRANK HUERTA<small>BACKEND_DEV</small></span>
      </a>
      <div className="nav-links">
        <a href="#about" data-es="// sobre_mí" data-en="// about">// sobre_mí</a>
        <a href="#stack" data-es="// stack" data-en="// stack">// stack</a>
        <a href="#projects" data-es="// proyectos" data-en="// projects">// proyectos</a>
        <a href="#contact" data-es="// contacto" data-en="// contact">// contacto</a>
      </div>
      <div className="nav-right">
        <div className="status">
          <span className="dot"></span>
          <span data-es="disponible" data-en="available">disponible</span>
        </div>
        <div className="lang" id="lang">
          <button data-lang="es" className="on">ES</button>
          <button data-lang="en">EN</button>
        </div>
      </div>
    </nav>
  )
}
