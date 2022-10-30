import React, { useState } from "react";
function CopyToClipboard({ value }) {
  const [copied, setCopied] = useState(false);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };
  return (
    <div className="copy-to-clipboard text-center w-100">
      <input
        type="text"
        readOnly
        value={value}
        className={copied && "copied"}
      />
      <span
        className={`material-symbols-outlined notranslate ${
          copied && "copied"
        }`}
        onClick={() => copyToClipboard()}
      >
        content_copy
      </span>
    </div>
  );
}

export default CopyToClipboard;
