import { Canvas, extend } from "@react-three/fiber";
// import projectState from "./assets/MedievalTown.theatre-project-state.json";
import Experience from "./components/Experience";
import * as THREE from 'three';
import { getProject } from "@theatre/core";
import { PerspectiveCamera, SheetProvider, editable as e } from "@theatre/r3f";
import extension from "@theatre/r3f/dist/extension";
import studio from "@theatre/studio";
// import { useRef } from 'react'

// export const isProd = import.meta.env.MODE === "production";

// if (!isProd) {
  studio.initialize();
  studio.extend(extension);
// }
const project = getProject(
  "Portfolio"
  // ,
  // isProd
  //   ? {
  //       state: projectState,
  //     }
  //   : undefined
);
const mainSheet = project.sheet("Main");

export default function App() {

  // const ref = useRef()

  return (
    <>

    <div
					style={{
						position: "fixed",
						top: 0,
						left: 0,
						width: "100vw",
						height: "100vh",
						// pointerEvents: "none",
            zIndex: -1
					}}
				>
          
    <Canvas
        // camera={{ position: [5, 5, 10], fov: 75, near: 1 }}
                        // {...props}
                        eventSource={document.documentElement}
                        eventPrefix="client"
                        gl={{
                            preserveDrawingBuffer: true,
                            antialias: true,
                            alpha: false,
                            powerPreference: "high-performance",
                        }}
                        onCreated={(state) => {
                            state.gl.toneMapping =
                                THREE.ACESFilmicToneMapping;
                            state.gl.toneMappingExposure = 1.5;
                            state.gl.setClearColor("#000000", 1);
                        }}
                        dpr={[1, 2]}
                        performance={{ min: 0.5 }}
        shadows
      >
        <SheetProvider sheet={mainSheet}>
          <Experience />
        </SheetProvider>
      </Canvas>
      
      </div>
    </>
  )
}