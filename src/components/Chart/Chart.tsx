import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import Filter from "./Filter";
import CheckboxGroup from "./CheckboxGroup";
import ChartComponent from "./ChartComponent";

interface AppProps {
  csvData: string;
}

interface DataRow {
  [key: string]: string | number;
}

export const Chart: React.FC<AppProps> = ({ csvData }) => {
  const [dataRows, setDataRows] = useState<DataRow[]>([]);
  const [textFields, setTextFields] = useState<string[]>([]);
  const [numericFields, setNumericFields] = useState<string[]>([]);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (csvData) {
      const parsedData = Papa.parse<DataRow>(csvData, {
        header: true,
        dynamicTyping: true,
      }).data;
      setDataRows(parsedData);
      classifyColumns(parsedData);
    }
  }, [csvData]);

  const classifyColumns = (data: DataRow[]) => {
    const sampleRow = data[0];
    const texts: string[] = [];
    const numerics: string[] = [];
    Object.keys(sampleRow).forEach((key) => {
      if (typeof sampleRow[key] === "number") numerics.push(key);
      else texts.push(key);
    });
    setTextFields(texts);
    setNumericFields(numerics);
    setSelectedFields(numerics);
  };

  const handleFilterChange = (field: string, value: string) => {
    setFilters({ ...filters, [field]: value });
  };

  const handleFieldSelection = (field: string) => {
    setSelectedFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    );
  };

  const getFilteredData = () => {
    return dataRows.filter((row) =>
      Object.keys(filters).every(
        (field) => !filters[field] || row[field] === filters[field]
      )
    );
  };

  return (
    <div>
      <div className="flex flex-wrap gap-4">
        {textFields.map((field) => (
          <Filter
            key={field}
            field={field}
            values={Array.from(
              new Set(dataRows.map((row) => row[field] as string))
            )}
            onChange={handleFilterChange}
          />
        ))}
      </div>
      <CheckboxGroup
        fields={numericFields}
        selectedFields={selectedFields}
        onChange={handleFieldSelection}
      />
      <ChartComponent
        data={getFilteredData()}
        fields={selectedFields}
        labelField={textFields[0]}
      />
    </div>
  );
};
