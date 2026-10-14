import { About } from './About';
import { Contact } from './Contact';
import { Footer } from './Footer';
import { Hero } from './Hero';
import { NavBar } from './NavBar';
import { Projects } from './Projects';
import { Stack } from './Stack';

// Rendered to static HTML at build time (no client directive): zero React JS
// ships to the browser. Interactivity lives in src/scripts/interactions.ts.
export const PortfolioApp = () => {
  return (
    <>
      <a className="skip" href="#main" data-es="Saltar al contenido" data-en="Skip to content">Saltar al contenido</a>
      <NavBar />
      <main id="main">
        <Hero />
        <About />
        <Stack />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
};
