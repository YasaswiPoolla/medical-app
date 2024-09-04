import React from 'react'
import { useRef } from "react";

export const UploadTemplate = ({handleFileChange}) => {
    const fileInputRef = useRef(null);
    const handleDivClick = () => {
        fileInputRef.current.click();
      };

  return (
    <div>
        <div
          className="addDiv border p-2 me-2 d-flex align-items-center rounded-2 border-secondary close-cursor"
          onClick={handleDivClick}
        >
          <span className="me-1 p-1">Upload Template</span>
          <i className="fa-solid fa-upload"></i>
        </div>
        <input
          type="file"
          accept=".xlsx, .xls"
          ref={fileInputRef}
          className="no-display"
          onChange={handleFileChange}
        />
      </div>
  )
}
