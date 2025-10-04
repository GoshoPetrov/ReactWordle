import React from "react";


const ROWS = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

export default function OnScreenKeyboard({ onKey = (k: string) => console.log(k), disabled = false, keyClass = "" }) {
  const handleClick = (k: string) => {
    if (disabled) return;
    onKey(k);
  };

  const Key: React.FC<{ children: React.ReactNode; className?: string; wide?: boolean }> = ({ children, className = "", wide = false }) => (
    <button
      onClick={() => typeof children === "string" && handleClick(children)}
      disabled={disabled}
      aria-label={`Key ${children}`}
      className={
        `flex items-center justify-center select-none font-semibold rounded-md shadow-sm ` +
        `h-10 ${wide ? "px-4" : "w-10"} ` +
        `bg-gray-100 hover:scale-105 active:scale-95 transition-transform ${className}`
      }
    >
      {children}
    </button>
  );

  return (
    <div className="w-full max-w-lg mx-auto p-2">
      {/* Row 1 */}
      <div className="flex justify-center mb-2">
        {ROWS[0].split("").map((k) => (
          <div key={k} className="mx-1">
            <Key className={keyClass}>{k}</Key>
          </div>
        ))}
      </div>

      {/* Row 2 (indented slightly like a real keyboard) */}
      <div className="flex justify-center mb-2">
        <div className="w-4" />
        {ROWS[1].split("").map((k) => (
          <div key={k} className="mx-1">
            <Key className={keyClass}>{k}</Key>
          </div>
        ))}
        <div className="w-4" />
      </div>

      {/* Row 3 with Enter and Delete */}
      <div className="flex justify-center gap-2">
        <Key className={keyClass + " bg-blue-600 text-white hover:bg-blue-700"} wide>
          ENTER
        </Key>

        {ROWS[2].split("").map((k) => (
          <div key={k} className="mx-1">
            <Key className={keyClass}>{k}</Key>
          </div>
        ))}

        <Key className={keyClass + " bg-gray-300"} wide>
          DEL
        </Key>
      </div>
    </div>
  );
}
