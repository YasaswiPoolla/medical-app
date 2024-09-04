import React from 'react';

const ReusableModal = ({ id, children, style }) => {
  return (
    <div
      className="offcanvas border offcanvas-end modalTopMargin p-0"
      tabIndex="-1"
      id={id}
      aria-labelledby="offcanvasRightLabel"
      data-bs-backdrop="static"
      style={style}
    >
      {children}
    </div>
  );
};

export default ReusableModal;
