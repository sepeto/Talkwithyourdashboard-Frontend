import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  json: Array<any>;
};

export function Table({ json }: Props) {
  if (json.length === 0) return null;

  const headers = Object.keys(json[0]);

  const formatHeader = (header: string) => {
    return header
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatCellValue = (value: string): string => {
    if (typeof value === "string") {
      const dateFormats = [
        "YYYY-MM-DD",
        "YYYY-MM-DD HH:mm:ss",
        "YYYY-MM-DDTHH:mm:ss.SSSZ",
        "ddd, DD MMM YYYY HH:mm:ss [GMT]",
      ];

      for (const format of dateFormats) {
        const parsedDate = dayjs(value, format, true);
        if (parsedDate.isValid()) {
          return parsedDate.format("DD/MM/YYYY HH:mm");
        }
      }
    }
    return value;
  };
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden text-sm">
        <thead className="bg-gray-200">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-4 py-2 text-left text-gray-700 font-semibold"
              >
                {formatHeader(header)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {json.map((item, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              {headers.map((header, cellIndex) => (
                <td key={cellIndex} className="px-4 py-2 border-t">
                  {formatCellValue(item[header])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
