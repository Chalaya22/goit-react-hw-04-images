import React, { Component } from 'react';
import { StyledModal } from './Styled';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    document.body.style.overflow = 'auto';
  }

  handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      this.props.closeModalImage();
    }
  };
  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.closeModalImage();
    }
  };

  render() {
    return (
      <StyledModal>
        <div onClick={this.handleOverlayClick} className="overlay">
          <div className="modal">
            <img
              width="480"
              height="auto"
              onClick={this.props.closeModalImage}
              src={this.props.modalData.largeImageURL}
              alt={this.props.modalData.tag}
            />
          </div>
        </div>
      </StyledModal>
    );
  }
}
export default Modal;
