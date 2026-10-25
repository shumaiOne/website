import { MotionConfig } from 'motion/react';
import Footer from './components/Footer';
import { SiteHeader } from './components/SiteHeader';
import { FeaturePage } from './pages/FeaturePage';
import { HomePage } from './pages/HomePage';
import type { RouteKey } from './types';

interface AppProps {
  route?: RouteKey;
}

/** Site shell shared by every prerendered page. */
export default function App({ route = 'home' }: AppProps) {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-svh w-full overflow-x-clip text-gray-100 font-sans selection:bg-[#E6C280] selection:text-[#5C1D24]">
        {/* Viewport-fixed backdrop: radial maroon glow with the lattice pattern */}
        <div className="chinese-lattice fixed inset-0 -z-10" aria-hidden="true" />
        <div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#8B1C26]/20 rounded-full blur-[120px] pointer-events-none select-none"
          aria-hidden="true"
        />
        <div
          className="absolute top-[800px] right-10 w-[600px] h-[600px] bg-[#E6C280]/5 rounded-full blur-[150px] pointer-events-none select-none"
          aria-hidden="true"
        />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded focus:bg-[#E6C280] focus:px-3 focus:py-2 focus:text-sm focus:font-bold focus:text-[#5C1D24]"
        >
          Skip to content
        </a>
        <SiteHeader current={route} />
        <main id="main" className="relative">
          {route === 'home' ? <HomePage /> : <FeaturePage routeKey={route} />}
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
