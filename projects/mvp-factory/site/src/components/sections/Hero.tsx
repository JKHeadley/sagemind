import Image from "next/image";
import Button from "@/components/ui/Button";
import type { SiteConfig, HeroVariant } from "@/config/types";

function HeroContent({ config }: { config: SiteConfig }) {
  return (
    <>
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
        {config.hero.headline}
      </h1>
      <p className="text-lg md:text-xl mb-8 max-w-2xl opacity-90 leading-relaxed">
        {config.hero.subheadline}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Button href={config.hero.ctaPrimary.href} variant="primary">
          {config.hero.ctaPrimary.text}
        </Button>
        {config.hero.ctaSecondary && (
          <Button href={`/${config.slug}${config.hero.ctaSecondary.href}`} variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white">
            {config.hero.ctaSecondary.text}
          </Button>
        )}
      </div>
      <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm opacity-75 animate-float">
        {config.hero.trustBadges.map((badge, i) => (
          <span key={badge} className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-primary-light" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.403 12.652a3 3 0 010-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
            </svg>
            {badge}
            {i < config.hero.trustBadges.length - 1 && <span className="hidden sm:inline ml-3">|</span>}
          </span>
        ))}
      </div>
    </>
  );
}

function FullscreenHero({ config }: { config: SiteConfig }) {
  return (
    <section className="relative min-h-[80vh] md:min-h-[90vh] flex items-center">
      {config.hero.backgroundImage && (
        <Image src={config.hero.backgroundImage} alt={config.businessName} fill className="object-cover opacity-25" priority sizes="100vw" />
      )}
      <div className="absolute inset-0 bg-header-bg/70" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-24 text-center text-white">
        <HeroContent config={config} />
      </div>
    </section>
  );
}

function SplitHero({ config }: { config: SiteConfig }) {
  return (
    <section className="bg-header-bg text-white">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center min-h-[70vh]">
        <div className="py-16 md:py-24">
          <HeroContent config={config} />
        </div>
        {config.hero.backgroundImage && (
          <div className="relative hidden md:block aspect-[4/3] rounded-xl overflow-hidden">
            <Image src={config.hero.backgroundImage} alt={config.businessName} fill className="object-cover" priority sizes="50vw" />
          </div>
        )}
      </div>
    </section>
  );
}

function DiagonalHero({ config }: { config: SiteConfig }) {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      {config.hero.backgroundImage && (
        <Image src={config.hero.backgroundImage} alt={config.businessName} fill className="object-cover opacity-20" priority sizes="100vw" />
      )}
      <div className="absolute inset-0 bg-header-bg" style={{ clipPath: "polygon(0 0, 65% 0, 50% 100%, 0 100%)" }} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-24 text-white">
        <div className="max-w-xl">
          <HeroContent config={config} />
        </div>
      </div>
    </section>
  );
}

function MinimalHero({ config }: { config: SiteConfig }) {
  return (
    <section className="bg-surface py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="text-text">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight gradient-text">
            {config.hero.headline}
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-text-light leading-relaxed">
            {config.hero.subheadline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button href={config.hero.ctaPrimary.href} variant="primary">
              {config.hero.ctaPrimary.text}
            </Button>
            {config.hero.ctaSecondary && (
              <Button href={`/${config.slug}${config.hero.ctaSecondary.href}`} variant="outline">
                {config.hero.ctaSecondary.text}
              </Button>
            )}
          </div>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-text-light">
            {config.hero.trustBadges.map((badge) => (
              <span key={badge} className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.403 12.652a3 3 0 010-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CenteredHero({ config }: { config: SiteConfig }) {
  return (
    <section className="relative min-h-[75vh] flex items-center bg-header-bg">
      {config.hero.backgroundImage && (
        <Image src={config.hero.backgroundImage} alt={config.businessName} fill className="object-cover opacity-30" priority sizes="100vw" />
      )}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-24 text-center text-white">
        <HeroContent config={config} />
      </div>
    </section>
  );
}

const heroVariants: Record<HeroVariant, React.ComponentType<{ config: SiteConfig }>> = {
  fullscreen: FullscreenHero,
  split: SplitHero,
  diagonal: DiagonalHero,
  minimal: MinimalHero,
  centered: CenteredHero,
};

export default function Hero({ config }: { config: SiteConfig }) {
  const Variant = heroVariants[config.layout.heroVariant];
  return <Variant config={config} />;
}
