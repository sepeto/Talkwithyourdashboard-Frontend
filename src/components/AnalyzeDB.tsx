import axios from "axios";
import { Message } from "../types/message.type";
import { useState } from "react";
import { Textarea } from "./commons";

type Props = {
  setAnalyze: (message: Message) => void;
  changeLoading: (status: boolean) => void;
  show: boolean;
};

function AnalyzeDB({ setAnalyze, show, changeLoading }: Props) {
  const [prompt, setPrompt] = useState(
    `Describe la siguiente estructura de base de datos de manera comprensible y concisa, explicando el propósito de cada tabla y sus relaciones`
  );

  const handleAnalyze = async () => {
    changeLoading(true);
    setAnalyze({
      id: Date.now() + 1,
      text: prompt,
      isUser: true,
    });

    const getToken = localStorage.getItem("TOKEN") || "";
    const { data } = await axios.get(
      `${import.meta.env.VITE_HOST_API}/analyze-db`,

      {
        headers: {
          token: getToken,
        },
        params: {
          prompt,
        },
      }
    );

    setAnalyze({
      id: Date.now() + 1,
      text: `${data.gpt_description}`,
      isUser: false,
    });

    changeLoading(false);

    console.log(data);
  };

  if (!show) return null;

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl w-full">
        <div className="mb-6">
          <h1 className="text-center text-2xl font-bold text-gray-800 mb-8">
            ¿Deseas que empecemos a analizar tu base de datos?
          </h1>
          <div className="mb-4">
            <label
              htmlFor="prompt"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Prompt
            </label>
            <Textarea value={prompt} onChange={setPrompt} rows={4} />
          </div>
          <button
            onClick={handleAnalyze}
            className="w-8/12 mx-auto bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex gap-1 justify-center items-center disabled:opacity-50"
          >
            Empezar análisis
          </button>
        </div>
      </div>
    </div>
  );
}

export default AnalyzeDB;
