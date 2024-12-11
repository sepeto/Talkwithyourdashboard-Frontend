import { useState, useRef, useEffect } from "react";
import ChatInput from "../../components/ChatInput";
import MessageList from "../../components/MessageList";
import { ServerCrash } from "lucide-react";
import axios from "axios";
import { Message } from "../../types/message.type";
import AnalyzeDB from "../../components/AnalyzeDB";

function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // scroll when sending or replying to a message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    if (
      !isLoading &&
      messages.length > 0 &&
      !messages[messages.length - 1].isUser
    ) {
      inputRef.current?.focus();
    }
  }, [isLoading, messages]);

  const handleSendMessage = async (text: string) => {
    const newMessage: Message = {
      id: Date.now(),
      text,
      isUser: true,
    };

    if (inputRef.current) {
      inputRef.current.style.height = "auto"; // Reiniciar la altura
    }
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setIsLoading(true);

    const getToken = localStorage.getItem("TOKEN") || "";
    try {
      // TODO: fetch service
      const { data } = await axios.get(
        `${import.meta.env.VITE_HOST_API}/query`,

        {
          headers: {
            token: getToken,
          },
          params: {
            prompt: text,
          },
        }
      );

      const aiResponse: Message = {
        id: Date.now() + 1,
        text: "",
        queryDB: data?.sql_query,
        isUser: false,
      };

      if (Array.isArray(data?.result)) {
        aiResponse.json = data?.result;
      } else {
        aiResponse.text = data?.result;
      }

      setMessages((prevMessages) => [...prevMessages, aiResponse]);
      setIsLoading(false);
    } catch (error) {
      const message = error instanceof Error ? error?.message : "Reintento";
      // TODO: Manejo de errores
      console.log(error);
      const { data } = await axios.get(
        `${import.meta.env.VITE_HOST_API}/query`,

        {
          headers: {
            token: getToken,
          },
          params: {
            prompt: `Toma en cuenta este error que me aparecio en la consulta anterior ${message}, por favor solucionalo y vuelve a ejecutar el prompt:  \n ${text}`,
          },
        }
      );

      const aiResponse: Message = {
        id: Date.now() + 1,
        text: "",
        queryDB: data?.sql_query,
        isUser: false,
      };

      if (Array.isArray(data?.result)) {
        aiResponse.json = data?.result;
      } else {
        aiResponse.text = data?.result;
      }

      setMessages((prevMessages) => [...prevMessages, aiResponse]);
      setIsLoading(false);
    }
  };

  const setAnalyze = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow-sm py-4">
        <div className="max-w-4xl mx-auto px-4 flex items-center">
          <ServerCrash className="w-8 h-8 text-blue-500 mr-2" />
          <h1 className="text-xl font-semibold text-gray-800">
            Talk with your dashboard
          </h1>
        </div>
      </header>
      <main className="flex-grow flex flex-col max-w-4xl mx-auto w-full p-4 pb-24 overflow-hidden">
        <AnalyzeDB
          setAnalyze={setAnalyze}
          show={!messages.length}
          changeLoading={(status: boolean) => setIsLoading(status)}
        />

        <div className="flex-grow overflow-y-auto">
          <MessageList messages={messages} />

          <div ref={messagesEndRef} />
        </div>
      </main>
      {!!messages.length && (
        <ChatInput
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          inputRef={inputRef}
        />
      )}
    </div>
  );
}

export default Chat;
