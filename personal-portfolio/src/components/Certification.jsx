import React, { useState, useEffect } from "react";
import agdaoCoop from "../images/certificates/agdaoCoop.webp";
import codechum from "../images/certificates/codechum.webp";
import watt from "../images/certificates/watt.webp";

// Certification section
// Each card contains two rows: top row = certification image, bottom row = title/issuer
// Designed to be dropped into a page section. Uses Tailwind classes for responsive layout.

const sampleCerts = [
  {
    id: 1,
    image: agdaoCoop,
    title: "Eighty manhours Work Immersion",
    issuer: "Agdao Multipurpose Cooperative (AMPC)",
  },
  {
    id: 2,
    image: codechum,
    title: "Information Management",
    issuer: "CodeChum",
  },
  {
    id: 3,
    image: watt,
    title: "Educational Tour in Cebu and Bohol",
    issuer: "World of Adventures Travel and Tours",
  },
];

export default function Certification({ certs = sampleCerts }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSrc, setModalSrc] = useState(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    if (isModalOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isModalOpen]);

  return (
    <section id="certifications" className="py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl text-primary md:text-4xl font-bold mb-6 text-center">
          Certifications
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certs.map((c) => {
            const topRowClass =
              c.id === 1
                ? "w-full h-56 flex items-start justify-center bg-transparent overflow-hidden"
                : "w-full h-56 flex items-center justify-center bg-gray-50";
              const imgClass =
                c.id === 1
                  ? "max-w-[110%] max-h-full object-contain object-top cursor-pointer transform scale-[1.9] origin-top"
                  : "max-h-full max-w-full object-contain cursor-pointer";

            return (
                <article
                key={c.id}
                className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-transform duration-300 hover:-translate-y-1"
                >
                {/* Top row: image (clickable to open modal) */}
                <div className={topRowClass}>
                    <img
                    src={c.image}
                    alt={c.title}
                    className={imgClass}
                    onClick={() => {
                        setModalSrc(c.image);
                        setIsModalOpen(true);
                    }}
                    />
                </div>

                {/* Bottom row: title/issuer */}
                <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold">{c.title}</h3>
                    {c.issuer && (
                    <p className="text-sm text-muted-foreground mt-1">{c.issuer}</p>
                    )}
                </div>
                </article>
            );
})}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-[820px] max-w-[95vw] max-h-[86vh] p-2 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image container has no additional background so the modal feels transparent.
                Wrap image in a positioned container so the close button can align to the image edge
                and overflow beside the image. On very small screens the button stays inside. */}
            <div className="flex items-center justify-center w-full h-full">
              <div className="relative inline-block">
                <img
                  src={modalSrc}
                  alt="certificate"
                  className="max-w-full max-h-[82vh] object-contain rounded-md shadow-2xl block"
                />

                {/* Close button positioned relative to the image wrapper; translate-x moves it outside the image edge */}
                <button
                  onClick={() => setIsModalOpen(false)}
                  aria-label="Close image"
                  className="absolute top-2 right-6 transform translate-x-1/2 sm:translate-x-1/2 -translate-y-0 text-gray-900 rounded-full w-10 h-10 flex items-center justify-center hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-primary/60"
                >
                  <span className="text-lg leading-none">✕</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
