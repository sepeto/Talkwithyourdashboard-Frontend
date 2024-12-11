import React from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
  disabled?: boolean;
  inputRef?: React.RefObject<HTMLTextAreaElement>;
};

export function Textarea({
  value,
  onChange,
  placeholder,
  rows = 1,
  disabled,
  inputRef,
}: Props) {
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = "auto"; // Resetea la altura para calcular el nuevo tamaño
    textarea.style.height = `${textarea.scrollHeight}px`; // Ajusta la altura al contenido

    onChange(textarea.value);
  };

  return (
    <textarea
      value={value}
      onChange={handleInputChange}
      placeholder={placeholder || "Escribe aquí..."}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      rows={rows}
      disabled={disabled}
      ref={inputRef}
      style={{
        resize: "none",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    />
  );
}
