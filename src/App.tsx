/**
 * Home page root.
 *
 * Composes the single-page portfolio: the fixed navigation bar and the content
 * sections in reading order.
 *
 * Section order is deliberate (who I am, where I've worked, what I've built,
 * what I know, how to reach me) and matches the order of the navigation links.
 * Changing the order here means updating `Navigation.tsx` too.
 */

import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

/**
 * Renders the full portfolio page.
 *
 * @returns The application tree.
 */
function App() {
  return (
    <>
      <Navigation />

      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default App;
