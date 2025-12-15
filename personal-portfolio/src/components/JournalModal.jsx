import React, { useState, useEffect } from "react";
import { journalEntries } from "./journalData/journalData";
import { X } from "lucide-react";

const JournalModal = ({ id, closeModal }) => {
  const entry = journalEntries.find((item) => item.id === id);
  if (!entry) return null;

  // Close when clicking outside modal content
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  // Image loading state for skeleton
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    // reset when modal opens for a different id
    setImgLoaded(false);
  }, [id]);

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm z-50"
    >
      <div className="relative w-11/12 md:w-3/4 lg:w-2/3 p-0 md:p-8 bg-transparent md:bg-card md:rounded-lg rounded-none md:shadow-xl shadow-none max-h-screen overflow-auto">

        {/* X ICON */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 sm:top-2 sm:right-2 text-primary hover:text-primary transition"
        >
          <X size={26} />
        </button>

        <div className="flex flex-col md:flex-row gap-8">

          {/* INFO — hidden on mobile, shown on md+ */}
          <div className="hidden md:block order-1 md:order-2 w-full md:w-1/2 overflow-y-auto max-h-[60vh] md:max-h-[600px] pr-2">

            {/* Top Details */}
            <h2 className="text-2xl font-bold text-primary">{entry.company}</h2>
            <p className="text-sm mt-1"><span className="text-sm">Date: </span> {entry.date}</p>
            <p className="text-sm mb-4">
              <span className="text-sm">Facilitator: </span>{entry.facilitator}
            </p>

            {/* Observations */}
            <h3 className="text-xl font-bold mt-6">Observations</h3>
            <p className="mt-3 whitespace-pre-line">
              {entry.observations}
            </p>

            {/* Learnings */}
            <h3 className="text-xl font-bold mt-6">Learnings</h3>
            <p className="mt-3 whitespace-pre-line">
              {entry.learnings}
            </p>

          </div>

          {/* IMAGE — on mobile shown below text, on desktop shown left */}
          <div className="order-2 md:order-1 w-full h-full md:w-1/2 relative">
            {!imgLoaded && (
              <div
                className="animate-pulse w-full h-[70vh] md:h-[80vh] rounded-none md:rounded-lg bg-transparent md:bg-gray-200 md:dark:bg-slate-700 flex items-center justify-center"
                aria-hidden="true"
              >
                <div className="w-24 h-24 bg-gray-300 dark:bg-slate-600 rounded" />
              </div>
            )}

            <img
              src={entry.img}
              alt="Journal"
              loading="eager"
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgLoaded(true)}
              className={`w-full h-[70vh] md:h-[80vh] object-contain md:object-cover md:rounded-lg rounded-none md:shadow-md shadow-none ${imgLoaded ? "block" : "hidden"}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalModal;
