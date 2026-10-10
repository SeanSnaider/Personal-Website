/**
 * Entry point for the BellyDSP project page (`projects/bellydsp/index.html`).
 *
 * The site is a Vite multi-page build rather than a client-side router: each
 * page has its own HTML file, so link previews and direct visits get the right
 * title and description without any server rewrites.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BellyDspPage } from './pages/BellyDspPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BellyDspPage />
  </StrictMode>,
);
