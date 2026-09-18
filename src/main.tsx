import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import { NotFound } from './components/NotFound.tsx';
import './index.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  const is404 = rootElement.dataset.page === '404';
  const Component = is404 ? NotFound : App;

  if (rootElement.hasChildNodes()) {
    hydrateRoot(
      rootElement,
      <StrictMode>
        <Component />
      </StrictMode>,
    );
  } else {
    createRoot(rootElement).render(
      <StrictMode>
        <Component />
      </StrictMode>,
    );
  }
}
