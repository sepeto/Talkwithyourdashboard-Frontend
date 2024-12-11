import React from "react";

interface FilterProps {
  field: string;
  values: string[];
  onChange: (field: string, value: string) => void;
}

const Filter: React.FC<FilterProps> = ({ field, values, onChange }) => (
  <label className="block ">
    Filtrar por: {field}
    <select
      onChange={(e) => onChange(field, e.target.value)}
      className="border border-gray-500 rounded-lg p-1 block mt-2"
    >
      <option value="">All</option>
      {values.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  </label>
);

export default Filter;
