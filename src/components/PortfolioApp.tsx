import { About } from './About';
import { Contact } from './Contact';
import { Footer } from './Footer';
import { Hero } from './Hero';
import { NavBar } from './NavBar';
import { PortfolioInteractions } from './PortfolioInteractions';
import { Projects } from './Projects';
import { Stack } from './Stack';

export const PortfolioApp = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <About />
      <Stack />
      <Projects />
      <Contact />
      <Footer />
      <PortfolioInteractions />
    </>
  );
};
