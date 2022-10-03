import { Modal } from "@mui/material";
import React from "react";

const CustomModal = ({ children, title, open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby={`${title} modal`}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5/6 max-w-[600px] shadow-md bg-white rounded-sm p-4">
        <p className="text-center text-3xl">{title}</p>
        {children}
      </div>
    </Modal>
  );
};

export default CustomModal;
