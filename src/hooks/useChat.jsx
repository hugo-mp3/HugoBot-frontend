// Import necessary functions and hooks from React
import { createContext, useContext, useEffect, useState } from "react";

// Define the backend URL for API requests
const backendUrl = "http://localhost:3000";

// Create a context for the chat functionality
const ChatContext = createContext();

// Provider component that wraps around children components to provide chat-related states and functions
export const ChatProvider = ({ children }) => {
  // Function to send a message to the backend and handle the response
  const chat = async (message) => {
    setLoading(true); // Set loading state to true when starting the request
    const data = await fetch(`${backendUrl}/chat`, {
      method: "POST", // Send a POST request to the backend chat endpoint
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
      body: JSON.stringify({ message }), // Send the message in the request body
    });
    const resp = (await data.json()).messages; // Parse the response and extract the messages
    setMessages((messages) => [...messages, ...resp]); // Update the messages state with the new messages
    setLoading(false); // Set loading state to false once the request is complete
  };

  // State to store the list of messages
  const [messages, setMessages] = useState([]);
  // State to store the current message being processed
  const [message, setMessage] = useState();
  // State to indicate whether a request is in progress
  const [loading, setLoading] = useState(false);
  // State to manage the camera zoom state
  const [cameraZoomed, setCameraZoomed] = useState(true);

  // Function to be called when a message has been played
  const onMessagePlayed = () => {
    setMessages((messages) => messages.slice(1)); // Remove the played message from the list
  };

  // Effect to update the current message when the messages list changes
  useEffect(() => {
    if (messages.length > 0) {
      setMessage(messages[0]); // Set the current message to the first in the list
    } else {
      setMessage(null); // Set the current message to null if no messages are left
    }
  }, [messages]); // The effect depends on the messages array

  return (
    // Provide the chat context to children components
    <ChatContext.Provider
      value={{
        chat,           // Function to send a message to the backend
        message,        // Current message being processed
        onMessagePlayed,// Function to handle when a message has been played
        loading,        // Loading state to indicate if a request is in progress
        cameraZoomed,   // State to indicate if the camera is zoomed in
        setCameraZoomed,// Function to set the camera zoom state
      }}
    >
      {children} {/* Render the children components within the ChatContext */}
    </ChatContext.Provider>
  );
};

// Custom hook to access the chat context
export const useChat = () => {
  const context = useContext(ChatContext); // Get the chat context
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider"); // Throw an error if the hook is used outside of the ChatProvider
  }
  return context; // Return the context
};
