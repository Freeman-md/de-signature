import Image from "next/image";

type VenueLayoutProps = { image?: { src: string; alt: string; width: number; height: number } };

export function VenueLayout({ image }: VenueLayoutProps) {
  if (!image) return null;

  return (
    <section aria-labelledby="layout-heading" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.26em] text-ember">Plan your night</p>
      <h2 id="layout-heading" className="mt-3 font-serif text-4xl text-ink sm:text-5xl">Venue layout</h2>
      <div className="mt-8 overflow-hidden rounded-[2rem] border border-ink/10 bg-ivory shadow-xl">
        <Image src={image.src} alt={image.alt} width={image.width} height={image.height} className="h-auto w-full" />
      </div>
    </section>
  );
}
