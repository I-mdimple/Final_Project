"use client";
import { useState } from "react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  );
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    // 1. Add user message to display
    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    const currentInput = input;
    setInput(""); // Clear input immediately

    try {
      // 2. Send request to the API
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: currentInput }),
      });

      const data = await res.json();

      // 3. BUG FIX: Read 'response' field, not 'reply'
      const botReply = data.response || data.error || "Could not generate response."; 
      
      const botMsg = { sender: "bot", text: botReply };
      setMessages((prev) => [...prev, botMsg]);

    } catch (error) {
        console.error("Chatbot API fetch error:", error);
        const errorMsg = { sender: "bot", text: "Sorry, I can't connect to the chat service right now." };
        setMessages((prev) => [...prev, errorMsg]);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg z-50"
      >
        💬 Chat
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-20 right-6 w-80 h-96 bg-white border shadow-xl rounded-lg flex flex-col z-50">
          <div className="p-3 font-bold text-white bg-blue-600 rounded-t-lg">
            AI Shopping Assistant
          </div>

          <div className="flex-1 p-3 overflow-y-auto space-y-2 flex flex-col text-black">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg max-w-[80%] whitespace-pre-wrap ${
                  msg.sender === "user"
                    ? "bg-blue-400 ml-auto"
                    : "bg-gray-200 mr-auto"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {/* Scroll to bottom logic would be needed here */}
          </div>

          <div className="p-3 flex gap-2">
            <input
              className="border flex-1 px-2 py-2 rounded text-black"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') sendMessage(); // Send on Enter key press
              }}
              placeholder="Ask me anything..."
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-3 rounded"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}