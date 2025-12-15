import React from "react";
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

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm z-50"
    >
      <div className="relative bg-card w-11/12 md:w-3/4 lg:w-2/3 p-8 rounded-lg shadow-xl">

        {/* X ICON */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-primary hover:text-primary transition"
        >
          <X size={26} />
        </button>

        <div className="flex gap-8">

          {/* LEFT — FIXED SIZE IMAGE */}
          <div className="w-1/2">
            <img
              src={entry.img}
              alt="Journal"
              loading="eager"
              className="w-full h-[600px] object-cover rounded-lg shadow-md"
            />
          </div>

          {/* RIGHT — INFO + OBSERVATIONS + LEARNINGS */}
          <div className="w-1/2 overflow-y-auto max-h-[600px] pr-2">

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
        </div>
      </div>
    </div>
  );
};

export default JournalModal;
