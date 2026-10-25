import { ArrowRight } from 'lucide-react';
import { Hero } from '../components/Hero';
import {
  CenteredHeading,
  ComparisonTable,
  FaqList,
  FeatureSection,
  InstallCta,
  MoreFeaturesGrid,
} from '../components/sections';
import { Showcase } from '../components/showcase';
import { COMPARISON, HOME_FAQS, HOME_SECTIONS, MORE_FEATURES } from '../content/home';
import { ROUTE_BY_KEY } from '../content/routes';

export function HomePage() {
  return (
    <>
      <Hero />

      <div id="features" className="relative scroll-mt-16 border-t border-[#E6C280]/15 bg-black/20">
        <h2 className="sr-only">Shumai features</h2>
        {HOME_SECTIONS.map((s, i) => (
          <FeatureSection
            key={s.id}
            id={s.id}
            eyebrow={s.eyebrow}
            title={s.title}
            description={s.description}
            bullets={s.bullets}
            link={{ href: ROUTE_BY_KEY[s.link].path, label: s.linkLabel }}
            visual={<Showcase name={s.showcase} />}
            reverse={i % 2 === 1}
            headingLevel="h3"
          />
        ))}
      </div>

      <section
        aria-labelledby="more-title"
        className="py-16 md:py-24 px-4 border-t border-[#E6C280]/10"
      >
        <div className="max-w-6xl mx-auto">
          <CenteredHeading
            id="more-title"
            eyebrow="And much more"
            title="Everything a production team needs, in one open-source app"
          />
          <MoreFeaturesGrid items={MORE_FEATURES} />
        </div>
      </section>

      <section
        aria-labelledby="compare-title"
        className="py-16 md:py-24 px-4 border-t border-[#E6C280]/10 bg-black/20"
      >
        <div className="max-w-5xl mx-auto">
          <CenteredHeading
            id="compare-title"
            eyebrow="Shumai vs Frame.io"
            title="Switch to Shumai and stop renting your own footage"
            description="Keep the review workflow you know. Lose the per-seat bill, the storage cap, and the vendor lock-in."
          />
          <ComparisonTable rows={COMPARISON} caption="Comparison of Shumai and Frame.io features" />
          <p className="mt-3 text-[11px] text-gray-500">
            Frame.io details from frame.io/pricing, checked October 2026.
          </p>
          <div className="mt-6 text-center">
            <a
              href={ROUTE_BY_KEY['frame-io-alternative'].path}
              className="group inline-flex items-center gap-1.5 text-sm font-bold text-[#E6C280] hover:text-white transition-colors"
            >
              Read the full comparison
              <ArrowRight
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="faq-title"
        className="py-16 md:py-24 px-4 border-t border-[#E6C280]/10"
      >
        <div className="max-w-3xl mx-auto">
          <CenteredHeading
            id="faq-title"
            eyebrow="FAQ"
            title="Questions teams ask before switching"
          />
          <FaqList items={HOME_FAQS} />
        </div>
      </section>

      <InstallCta />
    </>
  );
}
