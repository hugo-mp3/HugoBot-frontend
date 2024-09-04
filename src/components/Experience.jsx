// Importing necessary components and hooks from various libraries
import {
  CameraControls,    // Controls for the camera, allowing for interactive movement
  ContactShadows,    // Component that adds contact shadows beneath objects
  Environment,       // Component that adds environmental lighting and background
  Text,              // Component to render 3D text
} from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import { useChat } from "../hooks/useChat"; // Custom hook to access chat-related states
import { Avatar } from "./Avatar"; // Importing Avatar component

// Dots component displays loading dots when the chat is loading
const Dots = (props) => {
  const { loading } = useChat(); // Access the loading state from the chat context
  const [loadingText, setLoadingText] = useState(""); // State to manage the loading text (dots)

  useEffect(() => {
    if (loading) { // If loading is true, start an interval to update the loading text
      const interval = setInterval(() => {
        setLoadingText((loadingText) => {
          if (loadingText.length > 2) { // If the loading text has more than 2 dots, reset to one dot
            return ".";
          }
          return loadingText + "."; // Otherwise, add another dot
        });
      }, 800); // Update every 800ms
      return () => clearInterval(interval); // Clean up interval on component unmount or when loading changes
    } else {
      setLoadingText(""); // If not loading, reset loading text
    }
  }, [loading]); // Effect depends on the loading state

  if (!loading) return null; // If not loading, don't render anything

  return (
    <group {...props}>
      <Text fontSize={0.14} anchorX={"left"} anchorY={"bottom"}>
        {loadingText} {/* Display the loading dots */}
        <meshBasicMaterial attach="material" color="black" />
      </Text>
    </group>
  );
};

// Experience component manages the overall scene, including the camera and other 3D elements
export const Experience = () => {
  const cameraControls = useRef(); // Reference to the CameraControls component
  const { cameraZoomed } = useChat(); // Access the cameraZoomed state from the chat context

  useEffect(() => {
    // Set initial camera position and look-at point when the component mounts
    cameraControls.current.setLookAt(0, 2, 5, 0, 1.5, 0);
  }, []);

  useEffect(() => {
    // Adjust the camera position based on whether the cameraZoomed state is true or false
    if (cameraZoomed) {
      cameraControls.current.setLookAt(0, 1.5, 1.5, 0, 1.5, 0, true);
    } else {
      cameraControls.current.setLookAt(0, 2.2, 5, 0, 1.0, 0, true);
    }
  }, [cameraZoomed]); // Effect depends on the cameraZoomed state

  return (
    <>
      <CameraControls ref={cameraControls} /> {/* Adds camera controls */}
      <Environment preset="sunset" /> {/* Adds sunset environment lighting */}
      {/* Wrapping Dots into Suspense to prevent blink when Troika/Font is loaded */}
      <Suspense>
        <Dots position-y={1.75} position-x={-0.02} /> {/* Display loading dots at the specified position */}
      </Suspense>
      <Avatar /> {/* Render the Avatar component */}
      <ContactShadows opacity={0.7} /> {/* Adds contact shadows with 70% opacity */}
    </>
  );
};
