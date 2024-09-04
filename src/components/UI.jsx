import { useRef, useState, useEffect } from "react";
import { useChat } from "../hooks/useChat";

export const UI = ({ hidden, ...props }) => {
  const input = useRef(); // Reference for the input field
  const [showChatLogs, setShowChatLogs] = useState(false); // State to toggle the visibility of chat logs
  const { chat, loading, cameraZoomed, setCameraZoomed, message } = useChat(); // Accessing chat context and related states
  const [chatLogs, setChatLogs] = useState([]); // State to store chat logs

  useEffect(() => {
    if (message) {
      setChatLogs((prevLogs) => [...prevLogs, message.text]); // Add new messages to chat logs
    }
  }, [message]);

  const sendMessage = () => {
    const text = input.current.value; // Get the value from the input field
    if (!loading && !message) {
      chat(text).catch((error) => {
        console.error("Failed to send message:", error); // Handle errors when sending a message
      });
      input.current.value = ""; // Clear the input field after sending
    }
  };

  const toggleChatLogs = () => {
    setShowChatLogs((prev) => !prev); // Toggle chat logs visibility
  };

  if (hidden) {
    return null; // Return null if the UI component is hidden
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-between p-4 flex-col pointer-events-none">
        <div className="self-start backdrop-blur-md bg-white bg-opacity-50 p-4 rounded-lg">
          <h1 className="font-black text-xl">HugoBot</h1>
          <p></p>
        </div>

        {/* Chat Logs Container */}
        {showChatLogs && (
          <div
            id="chat-logs"
            className="pointer-events-auto fixed lg:bottom-4 lg:left-4 bg-[#292524] text-white p-4 rounded-md lg:w-64 lg:h-96 overflow-y-auto
              md:bottom-17 md:right-4 md:w-64 md:h-md
              sm:bottom-17 sm:right-4 sm:w-40 sm:h-sm"
          >
            <h2 className="text-center font-bold mb-2">Chat Logs</h2>
            <ul className="text-sm">
              {chatLogs.map((log, index) => (
                <li key={index} className="my-1">
                  {log} {/* Display each chat log */}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div
          className="fixed top-2 right-0 p-4 flex flex-col gap-4 lg:bottom-56 lg:right-4 lg:top-1/2 lg: transform lg:-translate-y-1/3
          md:bottom-17 md:right-4
          sm:top-2 sm:right-0"
        >
          {/* Button to toggle camera zoom */}
          <button
            onClick={() => setCameraZoomed(!cameraZoomed)}
            className="pointer-events-auto bg-[#292524] hover:bg-[#0c0a09] text-white p-4 rounded-md"
          >
            {cameraZoomed ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                />
              </svg>
            )}
          </button>

          {/* Button to toggle chat logs */}
          <button
            onClick={toggleChatLogs}
            disabled={loading}
            className="pointer-events-auto bg-[#292524] hover:bg-[#0c0a09] text-white p-4 rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 2.25A.75.75 0 016.75 1.5h10.5a.75.75 0 01.75.75v18.5a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V2.25zM6 0v24h12V0H6z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5h6v4H9V5zM9 10h6v4H9v-4zM9 15h6v4H9v-4z"
              />
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto max-w-2xl w-full mx-auto">
          {/* Input field for sending messages */}
          <input
            className="w-full placeholder:text-gray-800 placeholder:italic p-4 rounded-md bg-opacity-50 bg-white backdrop-blur-md"
            placeholder="Type a message..."
            ref={input}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage(); // Send message on pressing Enter
              }
            }}
          />
          {/* Button to send the message */}
          <button
            disabled={loading}
            onClick={sendMessage}
            className={`bg-[#292524] hover:bg-[#0c0a09] text-white p-4 px-10 font-semibold uppercase rounded-md ${
              loading ? "cursor-not-allowed opacity-30" : ""
            }`}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};
