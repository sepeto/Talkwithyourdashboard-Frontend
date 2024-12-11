import { Loader2, X } from "lucide-react";
import { useState } from "react";
import { Chart } from "./Chart/Chart";
import { jsonToCsv } from "../utils/jsonToCsv";

type Props = {
  showPopup: boolean;
  onClose: (status: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  json: Array<any>;
};
interface ChartFormData {
  graphType?: string;
  prompt?: string;
}

export const CreateChart = ({ showPopup, json, onClose }: Props) => {
  const [popupView, setPopupView] = useState<"form" | "result">("form");
  const [chartFormData, setChartFormData] = useState<ChartFormData>({
    graphType: "",
    prompt: "",
  });
  const [errors, setErrors] = useState<ChartFormData>({});
  const [isChartLoading, setIsChartLoading] = useState(false);

  // const [graphHTML, setGraphHTML] = useState("");

  if (!showPopup) return null;

  const validateForm = (): boolean => {
    const newErrors: ChartFormData = {};

    if (!chartFormData?.graphType?.trim())
      newErrors.graphType = "Tipo de gráfico es requerido";
    if (!chartFormData?.prompt?.trim())
      newErrors.prompt = "Prompt es requerido";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChartFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsChartLoading(true);

    try {
      // const getToken = localStorage.getItem("TOKEN") || "";

      // const { data } = await axios.post(
      //   `${import.meta.env.VITE_HOST_API}/create-chart`,
      //   {
      //     json,
      //   },
      //   {
      //     headers: {
      //       token: getToken,
      //     },
      //     params: chartFormData,
      //   }
      // );

      // console.log(data?.chart);
      // setGraphHTML(JSON.stringify(data.chart, null, 2));
      // setGraphHTML(grafica);

      setPopupView("result");
    } catch (error) {
      console.log({ error });
    } finally {
      setIsChartLoading(false);
    }
  };

  const handleChartFormChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setChartFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full relative">
        <button
          onClick={() => {
            onClose(false);
            setPopupView("form");
            setChartFormData({ graphType: "", prompt: "" });
          }}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4">Crear gráfico</h2>
        {popupView === "form" ? (
          <form onSubmit={handleChartFormSubmit}>
            <div className="mb-4">
              <label
                htmlFor="graphType"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Tipo de gráfico
              </label>
              <select
                id="graphType"
                name="graphType"
                value={chartFormData.graphType}
                onChange={handleChartFormChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccione</option>
                <option value="bar">Bar Chart</option>
                <option value="line">Line Chart</option>
                <option value="pie">Pie Chart</option>
              </select>
              {errors?.graphType && (
                <p className="mt-1 text-xs text-red-500">{errors?.graphType}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="prompt"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Prompt
              </label>
              <textarea
                id="prompt"
                name="prompt"
                value={chartFormData.prompt}
                onChange={handleChartFormChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="Ingresa tu prompt"
              ></textarea>
              {errors?.prompt && (
                <p className="mt-1 text-xs text-red-500">{errors?.prompt}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={isChartLoading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out disabled:opacity-50"
            >
              {isChartLoading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Creando...
                </span>
              ) : (
                "Crear"
              )}
            </button>
          </form>
        ) : (
          <Chart csvData={jsonToCsv(json)} />
        )}
      </div>
    </div>
  );
};
