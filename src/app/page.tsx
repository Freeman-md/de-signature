import Image from "next/image";
import { ArrowDownRight, Sparkles } from "lucide-react";

import { ReservationButton } from "@/features/reservations/components/ReservationButton";
import { ReservationFlow } from "@/features/reservations/components/ReservationFlow";
import { reservationPackages } from "@/features/reservations/content";
import { getReservationPhoneNumber } from "@/features/reservations/whatsapp";

export default function HomePage() {
  const reservationPhoneNumber = getReservationPhoneNumber();
  const reservationNumberConfigured = Boolean(reservationPhoneNumber);

  return (
    <main>
      <section className="grain relative overflow-hidden bg-ink">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(216,98,57,.52),transparent_35%),linear-gradient(100deg,rgba(17,13,11,.98)_5%,rgba(17,13,11,.72)_52%,rgba(17,13,11,.14))]" />
        <div className="relative mx-auto grid min-h-[43rem] max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 lg:min-h-[46rem] lg:grid-cols-[1fr_.9fr] lg:py-16">
          <div className="z-10 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sand">Good people · Great vibes</p>
            <h1 className="mt-6 font-serif text-6xl leading-[.85] tracking-tight text-ivory sm:text-8xl lg:text-9xl">The<br /><em className="font-normal text-[#e59065]">Signature</em></h1>
            <p className="mt-7 max-w-lg text-base leading-7 text-ivory/82 sm:text-lg">A night shaped around good energy, considered tables, and a crowd that knows how to arrive well.</p>
            <p className="mt-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-sand"><Sparkles size={16} aria-hidden="true" /> Music policy: DJ Ozone</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ReservationButton price={reservationPackages[0].price}>Reserve a package</ReservationButton>
              <a href="#packages" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-ivory/60 px-6 py-3 text-sm font-semibold tracking-wide text-ivory transition hover:bg-ivory/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ivory focus-visible:ring-offset-2 focus-visible:ring-offset-ink">View packages <ArrowDownRight size={17} aria-hidden="true" /></a>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="absolute -inset-8 rounded-full bg-ember/25 blur-3xl" />
            <Image src="/images/de-signature-flyer.png" alt="The Signature Party flyer featuring its warm editorial visual direction" width={1080} height={1246} priority sizes="(min-width: 1024px) 42vw, 82vw" className="relative aspect-[.868] w-full rounded-[2rem] border border-ivory/20 object-cover object-center shadow-ember" />
          </div>
        </div>
      </section>

      <section aria-labelledby="experience-heading" className="bg-ivory text-ink">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[.65fr_1fr] lg:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-ember">The experience</p>
          <div><h2 id="experience-heading" className="font-serif text-4xl leading-tight sm:text-5xl">Curated for the people who make the night.</h2><p className="mt-6 max-w-2xl text-lg leading-8 text-ink/70">The Signature is an intimate, reservation-led party experience. Choose your table package, bring your people, and let the evening unfold.</p></div>
        </div>
      </section>

      <ReservationFlow phoneNumber={reservationPhoneNumber} />

      <section id="reserve" aria-labelledby="reserve-heading" className="grain bg-wine px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl text-center"><p className="text-xs font-semibold uppercase tracking-[0.26em] text-sand">Reservations</p><h2 id="reserve-heading" className="mt-4 font-serif text-5xl text-ivory sm:text-6xl">Make your entrance count.</h2><p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-ivory/85">Reservation conversations are handled directly on WhatsApp. You can send a package-only enquiry here or use the seat selector above to include your preferred seats.</p><div className="mt-9"><ReservationButton price={reservationPackages[0].price}>Start a package-only reservation</ReservationButton></div>{!reservationNumberConfigured && <p id="reservation-setup-note" role="status" className="mx-auto mt-6 max-w-lg text-sm leading-6 text-ivory/80">Reservations are being set up. Please check back shortly.</p>}</div>
      </section>
    </main>
  );
}
