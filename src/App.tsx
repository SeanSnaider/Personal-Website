/**
 * Application root.
 *
 * Composes the single-page portfolio: a fixed navigation pill, one shared
 * static backdrop, and the content sections in reading order.
 *
 * Section order is deliberate — who I am, where I've worked, what I've built,
 * what I know, how to reach me — and matches the order of the navigation
 * links and the `NN /` eyebrow numbers on each section heading. Changing the
 * order here means updating both.
 */

import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

import './App.css';

/**
 * Renders the full portfolio page.
 *
 * @returns The application tree.
 */
function App() {
  return (
    <>
      {/* Single fixed backdrop for the whole page. The hero layers its own
          animated canvas on top of this; every other section reads against it
          directly. */}
      <div className="site-backdrop" aria-hidden="true" />

      <Navigation />

      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </>
  );
}

export default App;
