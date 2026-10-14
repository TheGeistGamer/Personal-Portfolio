import React from 'react'

export const NavBar = () => {
  return (
    <nav className="nav" aria-label="Principal">
      <a className="brand" href="#top">
        <span className="mark">FG</span>
        <span className="who">FRANK HUERTA<small>BACKEND_DEV</small></span>
      </a>
      <div className="nav-links" id="navLinks">
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
        <div className="lang" id="lang" role="group" aria-label="Idioma / Language">
          <button type="button" data-lang="es" className="on" aria-pressed="true" lang="es">ES</button>
          <button type="button" data-lang="en" aria-pressed="false" lang="en">EN</button>
        </div>
        <button type="button" className="menu-btn" id="menuBtn" aria-controls="navLinks" aria-expanded="false" aria-label="Menú">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  )
}
