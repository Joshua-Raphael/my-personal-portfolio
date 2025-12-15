import React, { useEffect, useRef } from "react";

/**
 * ScrollGallery
 * - Scroll-driven image gallery animation component
 * - Uses CSS Scroll-Driven Animations when supported, falls back to GSAP + ScrollTrigger
 *
 * Usage:
 * <ScrollGallery images={[url1, url2, url3]} />
 *
 * Notes:
 * - The outer container is tall (~220vh) so the sticky gallery can animate across scroll.
 * - The `.sticky` wrapper uses `position: sticky; top: 0` so the gallery stays pinned while the page scrolls.
 * - The grid is 5 columns x 3 rows; layers overlap by spanning the full grid.
 * - No manual window.onscroll handlers are used.
 */
export default function ScrollGallery({
  images = [
    "/projects/clinicMgt.png",
    "/projects/partnership.png",
    "/projects/quiz.png",
    "/projects/clinicMgt.png",
    "/projects/partnership.png",
  ],
}) {
  const wrapperRef = useRef(null);
  const layersRef = useRef([]);

  useEffect(() => {
    let ctx;

    // Feature-detect CSS Scroll-Driven (best-effort)
    const supportsScrollTimeline =
      typeof CSS !== "undefined" &&
      typeof CSS.supports === "function" &&
      (CSS.supports("animation-timeline: view()") || CSS.supports("animation-timeline: scroll()"));

    if (!supportsScrollTimeline) {
      // GSAP + ScrollTrigger fallback
      // Import dynamically so bundlers that don't include GSAP by default won't fail at SSR time
      (async () => {
        try {
          const [{ gsap }, { ScrollTrigger }] = await Promise.all([
            import("gsap"),
            import("gsap/ScrollTrigger"),
          ]);

          gsap.registerPlugin(ScrollTrigger);

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.7,
              // markers: true,
            },
          });

          // central image scales down
          tl.to(layersRef.current[0], { scale: 0.6, ease: "power1.out" }, 0);

          // layer animations: stagger fade-in + scale-up with slight offsets to create depth
          layersRef.current.forEach((el, i) => {
            const delay = 0.15 * i;
            tl.fromTo(
              el,
              { autoAlpha: 0, scale: 0.9 },
              { autoAlpha: 1, scale: 1 + i * 0.03, ease: "power1.out" },
              delay
            );
          });

          ctx = () => {
            tl.kill();
            ScrollTrigger.getAll().forEach((t) => t.kill());
          };
        } catch (e) {
          // If GSAP import fails, do nothing — component degrades to static grid
          // console.warn('GSAP fallback failed', e);
        }
      })();
    }

    return () => {
      if (typeof ctx === "function") ctx();
    };
  }, []);

  return (
    <section className="w-full" style={{ minHeight: "220vh" }}>
      {/* Sticky gallery wrapper: stays pinned while the surrounding page scrolls */}
      <div ref={wrapperRef} className="sticky top-0 h-screen flex items-center justify-center">
        {/* Grid container: 5 cols x 3 rows. Layers span the entire grid to overlap. */}
        <div className="w-full max-w-6xl px-4">
          <div className="grid grid-cols-5 grid-rows-3 gap-4 place-items-center">
            {images.map((src, idx) => {
              const isMain = idx === 0; // treat first image as central/main
              return (
                <div
                  key={idx}
                  ref={(el) => (layersRef.current[idx] = el)}
                  className={`col-start-1 col-end-[-1] row-start-1 row-end-[-1] flex items-center justify-center`}
                  style={{ zIndex: 50 + idx }}
                >
                  <div
                    className={`w-11/12 sm:w-3/4 md:w-2/3 lg:w-3/5 aspect-[4/5] rounded-xl overflow-hidden shadow-xl transform transition-transform will-change-transform`}
                    // CSS-only animations can be provided via @supports block below; GSAP will override when used
                  >
                    <img
                      src={src}
                      alt={`layer-${idx}`}
                      className={`w-full h-full object-cover block`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CSS Scroll-Driven Animations (used when supported) */}
      <style>{`
        /* Guarded CSS using @supports for animation-timeline when available */
        @supports (animation-timeline: view()) or (animation-timeline: scroll()) {
          /* Define a scroll timeline over the wrapper's viewport */
          @scroll-timeline gallery-tl {
            source: auto;
            scroll-offsets: 0% 100%;
          }

          .grid > div {
            /* default starting state */
            opacity: 0;
            transform: scale(0.95);
            animation-timeline: gallery-tl;
            animation-range: 0% 80%;
            animation-fill-mode: both;
          }

          /* central/main image (first child) scales down across the scroll */
          .grid > div:nth-child(1) {
            animation-name: mainScale;
            animation-duration: 1s;
            animation-range: 0% 60%;
          }

          /* staggered layer fade/scale: later children animate a bit later to create depth */
          .grid > div:nth-child(2) { animation-name: layerFade; animation-duration: 1s; animation-range: 10% 70%; }
          .grid > div:nth-child(3) { animation-name: layerFade; animation-duration: 1s; animation-range: 20% 80%; }
          .grid > div:nth-child(4) { animation-name: layerFade; animation-duration: 1s; animation-range: 30% 90%; }
          .grid > div:nth-child(5) { animation-name: layerFade; animation-duration: 1s; animation-range: 40% 100%; }

          @keyframes mainScale {
            0% { opacity: 1; transform: scale(1); }
            100% { opacity: 1; transform: scale(0.6); }
          }

          @keyframes layerFade {
            0% { opacity: 0; transform: scale(0.92); }
            100% { opacity: 1; transform: scale(1.03); }
          }
        }
      `}</style>
    </section>
  );
}
