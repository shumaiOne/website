import { ArrowUpRight, Check } from 'lucide-react';
import { ScreenFrame } from '../components/ScreenFrame';
import {
  Breadcrumbs,
  CenteredHeading,
  ComparisonTable,
  Eyebrow,
  FaqList,
  InstallCta,
  RelatedLinks,
} from '../components/sections';
import { Showcase } from '../components/showcase';
import { FEATURE_PAGES } from '../content/features';
import { COMPARISON } from '../content/home';
import type { DetailBlock, RouteKey } from '../types';

interface IndexedDetail {
  detail: DetailBlock;
  index: number;
}

type DetailGroup = ({ kind: 'screen' } & IndexedDetail) | { kind: 'cards'; items: IndexedDetail[] };

/** Detail blocks with a screenshot get their own row; consecutive text-only blocks share a card grid. */
function groupDetails(details: DetailBlock[]): DetailGroup[] {
  const groups: DetailGroup[] = [];
  details.forEach((detail, index) => {
    const last = groups[groups.length - 1];
    if (detail.screen) {
      groups.push({ kind: 'screen', detail, index });
    } else if (last?.kind === 'cards') {
      last.items.push({ detail, index });
    } else {
      groups.push({ kind: 'cards', items: [{ detail, index }] });
    }
  });
  return groups;
}

interface DetailTextProps {
  detail: DetailBlock;
  index: number;
  compact?: boolean;
}

function DetailText({ detail, index, compact = false }: DetailTextProps) {
  return (
    <>
      <h2
        id={`detail-${index}`}
        className={`font-serif font-black text-white leading-tight ${compact ? 'text-xl md:text-2xl' : 'text-xl md:text-3xl'}`}
      >
        {detail.title}
      </h2>
      <p className="mt-4 text-sm md:text-[15px] text-gray-300 leading-relaxed">{detail.body}</p>
      {detail.bullets && (
        <ul className="mt-5 space-y-2">
          {detail.bullets.map((b) => (
            <li key={b} className="flex gap-2.5 text-sm text-gray-200">
              <Check className="w-4 h-4 mt-0.5 shrink-0 text-[#E6C280]" aria-hidden="true" />
              {b}
            </li>
          ))}
        </ul>
      )}
      {detail.docs && (
        <a
          href={detail.docs.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-[#E6C280] hover:text-white transition-colors"
        >
          {detail.docs.label}
          <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
        </a>
      )}
    </>
  );
}

export function FeaturePage({ routeKey }: { routeKey: Exclude<RouteKey, 'home'> }) {
  const page = FEATURE_PAGES[routeKey];

  return (
    <>
      <section className="relative pt-28 md:pt-32 pb-16 md:pb-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-5">
            <Breadcrumbs current={page.key} />
            <div className="mt-6">
              <Eyebrow>{page.eyebrow}</Eyebrow>
            </div>
            <h1 className="mt-4 font-serif font-black text-3xl md:text-[2.6rem] leading-[1.2] text-white">
              {page.h1}
            </h1>
            <p className="mt-5 text-sm md:text-base text-gray-300 leading-relaxed">{page.intro}</p>
            <ul className="mt-6 grid sm:grid-cols-2 gap-2.5">
              {page.highlights.map((h) => (
                <li key={h} className="flex gap-2 text-sm text-gray-200">
                  <Check className="w-4 h-4 mt-0.5 shrink-0 text-[#E6C280]" aria-hidden="true" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-7">
            <Showcase name={page.showcase} />
          </div>
        </div>
      </section>

      {page.key === 'frame-io-alternative' && (
        <section
          aria-labelledby="table-title"
          className="py-16 md:py-20 px-4 border-t border-[#E6C280]/10 bg-black/20"
        >
          <div className="max-w-5xl mx-auto">
            <CenteredHeading
              id="table-title"
              eyebrow="Side by side"
              title="Shumai and Frame.io compared"
            />
            <ComparisonTable
              rows={COMPARISON}
              caption="Comparison of Shumai and Frame.io features"
            />
            <p className="mt-3 text-[11px] text-gray-500">
              Frame.io details from frame.io/pricing, checked October 2026. Plans and prices may
              change.
            </p>
          </div>
        </section>
      )}

      <div className="border-t border-[#E6C280]/10">
        {groupDetails(page.details).map((group, gi) =>
          group.kind === 'screen' ? (
            <section
              key={group.detail.title}
              aria-labelledby={`detail-${group.index}`}
              className="py-14 md:py-20 px-4 border-b border-[#E6C280]/5"
            >
              <div className="max-w-6xl mx-auto grid grid-cols-1 gap-10 items-center lg:grid-cols-12">
                <div className={`lg:col-span-5 ${gi % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <DetailText detail={group.detail} index={group.index} />
                </div>
                <div className={`lg:col-span-7 ${gi % 2 === 1 ? 'lg:order-1' : ''}`}>
                  {group.detail.screen && <ScreenFrame screen={group.detail.screen} />}
                </div>
              </div>
            </section>
          ) : (
            <div
              key={group.items[0].detail.title}
              className="py-14 md:py-20 px-4 border-b border-[#E6C280]/5"
            >
              <div
                className={`mx-auto grid gap-5 ${group.items.length > 1 ? 'max-w-6xl grid-cols-1 md:grid-cols-2' : 'max-w-3xl grid-cols-1'}`}
              >
                {group.items.map(({ detail, index }) => (
                  <section
                    key={detail.title}
                    aria-labelledby={`detail-${index}`}
                    className="rounded-xl border border-[#E6C280]/15 bg-black/25 p-6 md:p-8 transition-all duration-300 hover:border-[#E6C280]/35 hover:bg-black/35"
                  >
                    <DetailText detail={detail} index={index} compact />
                  </section>
                ))}
              </div>
            </div>
          ),
        )}
      </div>

      <section aria-labelledby="page-faq" className="py-16 md:py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <CenteredHeading id="page-faq" eyebrow="FAQ" title="Frequently asked questions" />
          <FaqList items={page.faqs} />
        </div>
      </section>

      <section aria-labelledby="related-title" className="pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h2
            id="related-title"
            className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#E6C280] mb-4"
          >
            Keep exploring
          </h2>
          <RelatedLinks keys={page.related} />
        </div>
      </section>

      <InstallCta />
    </>
  );
}
