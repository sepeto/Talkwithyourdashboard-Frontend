/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { vs } from "react-syntax-highlighter/dist/cjs/styles/hljs";

import { User, Bot } from "lucide-react";
import { Message } from "../types/message.type";
import CodeBlock from "./CodeBlock";
import { Table } from "./Table";
import { CreateChart } from "./CreateChart";
import { downloadCsv } from "../utils/downloadCsv";
import { jsonToCsv } from "../utils/jsonToCsv";

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [currentJSON, setCurrentJSON] = useState<Array<any>>([]);

  const onOpenPopUp = (json: Array<any>) => {
    setCurrentJSON(json);
    setShowPopup(true);
  };

  const onClosePopUp = (status: boolean) => {
    setCurrentJSON([]);
    setShowPopup(status);
  };

  return (
    <>
      {messages.map((message, index) => (
        <div
          key={message.id}
          className={`flex items-start mb-4 ${
            message.isUser ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`flex items-start space-x-2 max-w-[90%] ${
              message.isUser ? "flex-row-reverse space-x-reverse" : ""
            } ${message.json ? "min-w-[80%]" : ""} `}
          >
            <div
              className={`p-3 rounded-lg whitespace-break-spaces w-11/12  ${
                message.isUser
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              {!!message.queryDB && (
                <>
                  <CodeBlock
                    style={vs}
                    code={message.queryDB}
                    language={"sql_query"}
                  />
                </>
              )}

              {!!message.json && (
                <div className="min-w-[50%]">
                  <Table json={message.json} />
                </div>
              )}

              <p>{message.text}</p>

              {index === 1 && (
                <div className="w-full mt-4">
                  <img
                    className="aspect-video"
                    src="/assets/db_schema_sakila.jpeg"
                    alt=""
                  />
                </div>
              )}

              {!message.isUser && !!message.json && (
                <div className="mt-8 flex justify-center gap-8 flex-wrap">
                  <button
                    onClick={() => onOpenPopUp(message.json as Array<any>)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline transition duration-300 ease-in-out disabled:opacity-50"
                  >
                    Crear gráfica
                  </button>
                  <button
                    onClick={() =>
                      downloadCsv({ csvText: jsonToCsv(message.json as any[]) })
                    }
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline transition duration-300 ease-in-out disabled:opacity-50"
                  >
                    Descargar tabla
                  </button>
                </div>
              )}
            </div>
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                message.isUser ? "bg-blue-100" : "bg-gray-200"
              }`}
            >
              {message.isUser ? (
                <User className="w-5 h-5 text-blue-500" />
              ) : (
                <Bot className="w-5 h-5 text-gray-600" />
              )}
            </div>
          </div>
        </div>
      ))}

      <CreateChart
        onClose={onClosePopUp}
        showPopup={showPopup}
        json={currentJSON}
      />
    </>
  );
};

export default MessageList;
