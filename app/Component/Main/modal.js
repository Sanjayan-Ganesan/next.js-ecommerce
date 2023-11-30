// Modal.js
import React from "react";
import './modal.css';
import { IoMdCloseCircle } from "react-icons/io";

const Modal = ({ onClose, children }) => {
  return (
    <div className="modal-overlay rounded-lg">
      <div className="modal-content rounded-lg">
        <IoMdCloseCircle size={30} className="close-btn" onClick={onClose} />
        {children}
      </div>
    </div>
  );
};

export default Modal;
