import React, { useState } from "react";
import { Clipboard, Check } from "lucide-react";

interface CopyToClipboardProps {
    text: string;
  }

const CopyToClipboard: React.FC<CopyToClipboardProps> = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div>
      <button
        onClick={handleCopy}
        style={{
          cursor: "pointer",
        }}
      >
        {copied ? <Check /> : <Clipboard />}
      </button>
    </div>
  );
};

export default CopyToClipboard;
