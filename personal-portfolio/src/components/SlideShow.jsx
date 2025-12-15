import { useState, useEffect } from "react";
import img1 from "../images/up.webp";
import img2 from "../images/dynata.webp";
import img3 from "../images/rivan.webp";
import img4 from "../images/mata.webp";
import img5 from "../images/tarsier117.webp";
import { FaFileAlt } from "react-icons/fa"; // Journal icon
import JournalModal from "./JournalModal";

const slidesData = [
  { id: 11, name: "Rivan IT", role: "Empowers IT professionals, fosters innovation, \nand uncovers exceptional talent across \nthe evolving tech landscape.", img: img3, journalImg: img3 },
  { id: 12, name: "DYNATA", role: "To automate marketing and turn \ndata into insights that drive growth.", img: img2, journalImg: img2 },
  { id: 13, name: "Cebu InIT", role: "Aims to nurture and support \ntechnology-based startups.", img: img1, journalImg: img1 },
  { id: 14, name: "MATA Tech", role: "A homeground provider of virtuals tours \nfor real estate in the Philippines", img: img4, journalImg: img4 },
  { id: 15, name: "T.A.R.S.I.E.R. 117", role: "An emergency response and disaster management \nunit established by the Provincial Government of Bohol.", img: img5, journalImg: img5 },
  // { name: "Ryan", role: "seo Developer", img: img6, journalImg: img6 },
  // { name: "Dakes", role: "sql Developer", img: img7, journalImg: img7 },
];

export default function SlideShow() {
  const [activeIndex, setActiveIndex] = useState(2); // initially the 4th slide
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const handleIconClick = (slide) => {
    setModalData(slide);
    setIsModalOpen(true);
  };

  // Preload slideshow images so journal modal shows images immediately
  useEffect(() => {
    const preloads = [];

    slidesData.forEach((s) => {
      try {
        // Image object cache
        const img = new Image();
        img.src = s.img;
        preloads.push(img);

        // Also add a <link rel="preload"> to hint the browser to prioritise
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.href = s.img;
        document.head.appendChild(link);
        preloads.push(link);
      } catch (e) {
        // ignore
      }
    });

    return () => {
      // cleanup any inserted link elements
      preloads.forEach((p) => {
        if (p && p.rel === "preload") {
          try {
            document.head.removeChild(p);
          } catch {}
        }
      });
    };
  }, []);

  console.log("Modal Data:", modalData);
  console.log("Modal Open:", isModalOpen);


  return (
    <section
      id="slidebar"
      className="w-full min-h-screen flex flex-col items-center justify-center py-12"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-5 text-center">
        Tour <span className="text-primary"> Companies </span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:flex lg:flex-row gap-5 sm:gap-4 items-end">
        {slidesData.map((slide, idx) => {
          const isActive = idx === activeIndex;

          // Height responsive: small for sm/md
          const nonActiveHeight = "md:h-[80px] h-[80px]";
          const activeHeight = isActive
            ? "sm:h-[200px]"
            : nonActiveHeight;

          // Width responsive
          const nonActiveWidth = "md:w-full sm:w-full";
          const activeWidth = isActive
            ? "sm:w-full"
            : nonActiveWidth;

          // Dynamic height classes
          let heightClass = "lg:h-[420px]";
          if (idx === 1 || idx === 3) heightClass = "lg:h-[520px]";
          if (idx === 2) heightClass = "lg:h-[625px]";

          return (
            <div
              key={idx}
              className={`relative lg:w-[120px] rounded-md cursor-pointer transition-all duration-700 flex-shrink-0
                ${heightClass} ${isActive ? `lg:w-[760px] lg:h-[580px] ${activeHeight} ${activeWidth}` : `${nonActiveHeight} ${nonActiveWidth}`} `}
              onClick={() => setActiveIndex(idx)}
            >
              <img
                src={slide.img}
                alt={slide.name}
                loading="eager"
                className="w-full h-full object-cover rounded-md"
              />
              {!isActive && (
                <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center lg:-rotate-90  text-white font-bold text-xl whitespace-nowrap md:text-2xl lg:text-4xl">
                  {slide.name}
                </h1>
              )}
              {isActive && (
                <>
                  <div className="absolute bottom-15 left-10">
                    <h2 className="text-2xl font-bold text-primary drop-shadow-[2px_2px_6px_rgba(0,0,0,0.8)] bg-black/40 px-2 py-1 rounded-t-md">{slide.name}</h2>
                    <p className="font-semibold whitespace-pre-line bg-black/40 px-2 py-1 rounded-b dark:text-white">{slide.role}</p>
                  </div>

                  {/* Floating journal button (lower-right) */}
                  <div className="absolute bottom-4 right-4 z-20 flex flex-col items-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent the slide from being clicked when the icon is clicked
                          handleIconClick(slide);
                        }}
                        aria-label={`Open journal for ${slide.name}`}
                        className="absolute bottom-4 right-4 z-20 bg-primary text-white p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
                      >
                        <FaFileAlt className="w-5 h-5" />
                      </button>
                      <span className="text-white text-sm mt-1 mr-4 drop-shadow">
                        Journal
                      </span>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <JournalModal
          id={modalData.id}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </section>
  );
}
