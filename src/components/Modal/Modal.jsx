import React, { useEffect } from 'react';
import { StyledModal } from './Styled';

const Modal = ({ closeModalImage, modalData }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        closeModalImage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [closeModalImage]);

  const handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      closeModalImage();
    }
  };

  return (
    <StyledModal>
      <div onClick={handleOverlayClick} className="overlay">
        <div className="modal">
          <img
            width="480"
            height="auto"
            onClick={closeModalImage}
            src={modalData.largeImageURL}
            alt={modalData.tag}
          />
        </div>
      </div>
    </StyledModal>
  );
};
export default Modal;
