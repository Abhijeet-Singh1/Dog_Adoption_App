import React from "react";

function ImageModal({ imageUrl, onClose }) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(5px)",
      }}
      onClick={handleOverlayClick}
    >
      <div className="max-w-2xl p-4">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute right-2 text-white text-3xl cursor-pointer"
          >
            &times;
          </button>
          <img
            src={imageUrl}
            alt="Enlarged Dog Pic"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default ImageModal;
