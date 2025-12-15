import React, { useState, useEffect } from "react";
import documentary1 from "../images/documentary/documentary1.webp"
import documentary2 from "../images/documentary/documentary2.webp"
import documentary3 from "../images/documentary/documentary3.webp"
import documentary4 from "../images/documentary/documentary4.webp"
import documentary5 from "../images/documentary/documentary5.webp"
import documentary7 from "../images/documentary/documentary7.webp"
import documentary6 from "../images/documentary/documentary6.webp"
import documentary8 from "../images/documentary/documentary8.webp"
import documentary9 from "../images/documentary/documentary9.webp"
import documentary10 from "../images/documentary/documentary10.webp"

const images = [
  {
    src: documentary1,
    className: "slower",
  },
  {
    src: documentary2,
    className: "faster",
  },
  {
    src: documentary3,
    className: "slower vertical",
  },
  {
    src: documentary4,
    className: "slower slower-down",
  },
  {
    src: documentary5,
    className: "",
  },
  {
    src: documentary6,
    className: "slower slower2",
  },
  {
    src: documentary10,
    className: "faster1",
  },
  {
    src: documentary8,
    className: "slower slower2",
  },
  {
    src: documentary9,
    className: "",
  },
  {
    src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74321/notre-dame-river-boat.jpg",
    className: "slower",
  },
  {
    src: documentary7,
    className: "slower last",
  },
];

export default function Documentary() {
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
    <section id="docu" className="relative h-screen overflow-hidden">

        <h2 className="text-3xl md:text-4xl font-bold text-center mt-10">
        Tour <span className="text-primary"> Documentaries </span>
      </h2>
      <div className="horizontal-scroll-wrapper">
        {images.map((img, index) => (
          <div key={index} className={`img-wrapper ${img.className}`}>
            <div className="img-inner">
              <img
                src={img.src}
                alt={`documentary-${index}`}
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setModalSrc(img.src);
                  setIsModalOpen(true);
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-transparent"
          onClick={() => setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-[860px] max-w-[95vw] max-h-[86vh] p-2 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Transparent modal: only the image is visible. Close button floats outside the image edge. */}
            <div className="flex items-center justify-center w-full h-full">
              <div className="relative inline-block">
                <img
                  src={modalSrc}
                  alt="modal"
                  className="max-w-full max-h-[78vh] object-contain rounded-md shadow-2xl block"
                />

                <button
                  onClick={() => setIsModalOpen(false)}
                  aria-label="Close image"
                  className="absolute top-1 right-1 text-gray-900 dark:text-white rounded-full w-10 h-10 flex items-center justify-center hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-primary/60"
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
