import React, { useState } from "react";
import { Send, Loader } from "lucide-react";
import { Textarea } from "./commons";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  inputRef: React.RefObject<HTMLTextAreaElement>;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  isLoading,
  inputRef,
}) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed bottom-0 left-0 right-0 bg-white shadow-md"
    >
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-end">
        <Textarea
          value={input}
          onChange={setInput}
          placeholder="Escribe tu consulta..."
          disabled={isLoading}
          inputRef={inputRef}
        />
        {/* <input
          ref={inputRef}
          type="hidden"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow p-2 rounded-l-lg focus:outline-none border border-gray-300 h-10"
          disabled={isLoading}
        /> */}
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300 h-10 w-10 flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
