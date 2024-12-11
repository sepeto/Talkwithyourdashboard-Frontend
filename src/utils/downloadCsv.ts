interface DownloadCsvProps {
  csvText: string;
  filename?: string;
}

export const downloadCsv = ({
  csvText,
  filename = "data.csv",
}: DownloadCsvProps) => {
  // Crear un blob a partir del texto CSV
  const blob = new Blob([csvText], { type: "text/csv;charset=utf-8;" });

  // Crear un enlace de descarga
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.setAttribute("download", filename);

  // Agregar el enlace al documento y hacer clic en él
  document.body.appendChild(link);
  link.click();

  // Limpiar el enlace creado
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
