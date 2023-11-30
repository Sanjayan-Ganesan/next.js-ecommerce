// Modal.js
import React from "react";
import './modal.css';
import { IoMdCloseCircle } from "react-icons/io";

const SignInModal = ({ onClose, children }) => {
  return (
    <div className="modal-overlay rounded-lg">
      <div className="modal-content rounded-lg">
        <div className="modal-fixed">
        <h2 className="text-4xl text-center font-bold mb-4">Welcome to Dil Foods <br></br>Please Sign In</h2>
        <IoMdCloseCircle size={30} className="close-btn" onClick={onClose} />
        </div>        
        {children}
      </div>
    </div>
  );
};

export default SignInModal;
