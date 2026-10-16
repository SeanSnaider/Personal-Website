/**
 * Home page root.
 *
 * The site is a record: the first viewport is the sleeve and turntable with
 * the tracklist, then Side A (projects), Side B (experience), the liner notes
 * (about), the instruments (skills), and booking (contact).
 *
 * Section order matches the tracklist and the navigation links in
 * `Navigation.tsx`; changing the order here means updating both.
 */

import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { SideA, SideB } from './components/Sides';
import { Booking, Instruments, LinerNotes } from './components/LinerNotes';
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

      <main id="main" className="space-y-28 lg:space-y-36">
        <Hero />
        <SideA />
        <SideB />
        <LinerNotes />
        <Instruments />
        <Booking />
      </main>

      <Footer />
    </>
  );
}

export default App;
