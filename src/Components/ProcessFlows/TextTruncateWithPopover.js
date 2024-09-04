import React, { useState } from "react";

const TextTruncateWithPopover = ({ text, numChars }) => {
  const [showPopover, setShowPopover] = useState(false);

  const truncatedText =
    text.length > numChars ? text.slice(0, numChars) + "..." : text;

  const handleMouseEnter = () => {
    if (text.length > numChars) {
      setShowPopover(true);
    }
  };

  const handleMouseLeave = () => {
    setShowPopover(false);
  };

  return (
    <div>
      <span
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {truncatedText}
      </span>
      {showPopover && (
        <div
          className="pop-over-style"
        >
          <small className="p-1">{text}</small>
        </div>
      )}
    </div>
  );
};

export default TextTruncateWithPopover;