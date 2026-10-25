import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import { NotFound } from './components/NotFound.tsx';
import { ROUTES, routeKeyFromPath } from './content/routes.ts';
import type { RouteKey } from './types.ts';
import './index.css';

const rootElement = document.getElementById('root');

/** Prerendered pages carry their route in data-page; dev falls back to the URL. */
function resolvePage(el: HTMLElement): RouteKey | '404' {
  const marker = el.dataset.page;
  if (marker === '404') return '404';
  if (marker && ROUTES.some((r) => r.key === marker)) return marker as RouteKey;
  return routeKeyFromPath(window.location.pathname) ?? '404';
}

if (rootElement) {
  const page = resolvePage(rootElement);
  const tree = <StrictMode>{page === '404' ? <NotFound /> : <App route={page} />}</StrictMode>;

  if (rootElement.hasChildNodes()) {
    hydrateRoot(rootElement, tree);
  } else {
    createRoot(rootElement).render(tree);
  }
}
