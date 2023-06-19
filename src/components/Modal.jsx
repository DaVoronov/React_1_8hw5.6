import { useEffect } from "react";

const Modal = ({ imageUrl, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Escape") {
        onClose();
      }
    };

    const handleClick = (event) => {
      if (event.target.classList.contains("Overlay")) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleClick);
    };
  }, [onClose]);

  return (
    <div className="Overlay">
      <div className="Modal">
        <img src={imageUrl} alt="" />
      </div>
    </div>
  );
};

export default Modal;
