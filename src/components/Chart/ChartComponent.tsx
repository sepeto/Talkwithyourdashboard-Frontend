import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Registrar los elementos y escalas necesarios
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartComponentProps {
  data: Array<{ [key: string]: string | number }>;
  fields: string[];
  labelField: string;
}

const ChartComponent: React.FC<ChartComponentProps> = ({
  data,
  fields,
  labelField,
}) => {
  if (!fields.length)
    return <p>Seleccione al menos un campo de datos para mostrar</p>;

  const labels = data.map((row) => row[labelField] as string);
  const datasets = fields.map((field, index) => ({
    label: field,
    data: data.map((row) => row[field] as number),
    borderColor: `hsl(${index * 60}, 70%, 50%)`,
    backgroundColor: `hsla(${index * 60}, 70%, 50%, 0.3)`,
    fill: true,
    tension: 0.4,
  }));

  return (
    <Line
      data={{ labels, datasets }}
      options={{
        responsive: true,
        plugins: { title: { display: true, text: "" } },
        scales: {
          x: { title: { display: true, text: labelField } },
          y: {
            beginAtZero: true,
            title: { display: true, text: "" },
          },
        },
      }}
    />
  );
};

export default ChartComponent;
