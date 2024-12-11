import React from "react";

interface CheckboxGroupProps {
  fields: string[];
  selectedFields: string[];
  onChange: (field: string) => void;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  fields,
  selectedFields,
  onChange,
}) => (
  <div className="mt-4">
    <h3 className="mb-2">Seleccione los datos a mostrar</h3>
    <div className="flex justify-around flex-wrap">
      {fields.map((field) => (
        <label
          key={field}
          className="checkbox-label  flex gap-1 items-center justify-center "
        >
          <input
            type="checkbox"
            checked={selectedFields.includes(field)}
            onChange={() => onChange(field)}
            className="block"
          />
          {field}
        </label>
      ))}
    </div>
  </div>
);

export default CheckboxGroup;
