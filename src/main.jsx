import React from "react"; // Importing React library to use JSX and other React features
import ReactDOM from "react-dom/client"; // Importing ReactDOM for rendering the React app into the DOM
import App from "./App"; // Importing the main App component
import { ChatProvider } from "./hooks/useChat"; // Importing ChatProvider to provide chat-related context to the app
import "./index.css"; // Importing global CSS styles

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode> {/* Enables strict mode to highlight potential problems in the app during development */}
    <ChatProvider> {/* Wrapping the App component with ChatProvider to supply the chat context throughout the app */}
      <App /> {/* Rendering the main App component */}
    </ChatProvider>
  </React.StrictMode>
);
