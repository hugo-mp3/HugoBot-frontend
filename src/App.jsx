// Importing necessary components from external libraries and local files
import { Loader } from "@react-three/drei"; // Loader component for displaying a loading screen while assets are being loaded
import { Canvas } from "@react-three/fiber"; // Canvas component that serves as the rendering surface for 3D content
import { Leva } from "leva"; // Leva is a library for creating GUI panels to tweak parameters, here it's used with the 'hidden' prop to hide the panel
import { Experience } from "./components/Experience"; // Importing the Experience component, which handles the 3D scene logic
import { UI } from "./components/UI"; // Importing the UI component, which handles the user interface elements

function App() {
  return (
    <>
      <Loader /> {/* Display a loading screen while the assets for the 3D scene are loading */}
      <Leva hidden /> {/* Initialize the Leva GUI, but keep it hidden */}
      <UI /> {/* Render the user interface */}
      <Canvas shadows camera={{ position: [0, 0, 1], fov: 30 }}>
        {/* Set up the 3D rendering context with shadows enabled and a camera positioned at [0, 0, 1] with a field of view of 30 */}
        <Experience /> {/* Render the Experience component, which contains the 3D scene */}
      </Canvas>
    </>
  );
}

export default App;
