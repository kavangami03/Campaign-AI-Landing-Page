import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);



/* ---------------------------------------------------------------- */
/*  Shared                                                          */
/* ---------------------------------------------------------------- */


function Trusted() {
  const logos = [
    "Northwave",
    "Atrium",
    "LumiÃ¨re",
    "Halcyon",
    "Field & Co.",
    "Stellar",
    "Marigold",
    "Verdant",
  ];
  return (
    <section className="mx-auto max-w-[1920px] border-y border-border/60 bg-ivory/40 py-10">
      <div className="container-editorial">
        <p className="mb-6 text-center text-xs uppercase tracking-[0.2em] text-ink-soft">
          Trusted by marketing teams at category-defining brands
        </p>
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <div className="flex w-max animate-marquee gap-16">
            {[...logos, ...logos].map((logo, i) => (
              <span key={i} className="font-display text-2xl text-ink-soft/70">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export default Trusted;
