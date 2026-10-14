import React from 'react'

export const Footer = () => {
  return (
    <footer>
      <a className="agency" href="https://infinitydev.agency/" target="_blank" rel="noopener" aria-label="InfinityDev Agency — portafolio comercial">
        <picture>
          <source srcSet="/infinitydev-logo.webp" type="image/webp" />
          <img src="/infinitydev-logo.png" alt="Logo de InfinityDev Agency" width="43" height="48" loading="lazy" decoding="async" />
        </picture>
        <span className="agency-txt">
          <span data-es="Proyectos comerciales en" data-en="Commercial work at">Proyectos comerciales en</span>
          <b>INFINITYDEV.AGENCY</b>
        </span>
      </a>
      <p className="ft">© 2026 FRANK GIOVANNI SEGURA HUERTA · <span data-es="hecho con" data-en="built with">hecho con</span> <span className="heart">█</span> <span data-es="y pixeles" data-en="and pixels">y pixeles</span></p>
    </footer>
  )
}
