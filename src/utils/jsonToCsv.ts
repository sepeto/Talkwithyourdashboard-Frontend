/* eslint-disable @typescript-eslint/no-explicit-any */
export function jsonToCsv(jsonArray: Record<string, any>[]): string {
  if (jsonArray.length === 0) return "";

  const headers = Object.keys(jsonArray[0]);
  const csvRows = [headers.join(",")];

  jsonArray.forEach((row) => {
    const values = headers.map((header) => {
      const cell = row[header];
      // Escapar comillas y rodear con comillas dobles si contiene coma
      return typeof cell === "string" && cell.includes(",")
        ? `"${cell.replace(/"/g, '""')}"`
        : cell;
    });
    csvRows.push(values.join(","));
  });

  return csvRows.join("\n");
}
