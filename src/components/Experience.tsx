// import { Environment } from "@react-three/drei";
// import { useThree, useFrame } from '@react-three/fiber';
// import { EffectComposer, Scanline, Vignette, Bloom, Noise, Glitch, ToneMapping, ChromaticAberration } from "@react-three/postprocessing";
// import { BlendFunction, GlitchMode } from "postprocessing";
// import React, { useEffect, useRef } from 'react';
// import { OrbitControls } from '@react-three/drei';
// import { Vector3 } from "three";
// import { useGLTF, PerspectiveCamera, useAnimations } from '@react-three/drei'
// import Overlay from './3d/Overlay';
// import HumanoidComponent from './3d/HumanoidComponent';
// import { Humanoid } from './3d/Humanoid';
// import { editable as e } from "@theatre/r3f";
// import AnimatedCamera from './AnimatedCamera';

// export default function Experience() {
//   const humanoidRef = useRef()
//   const camera = useThree((state) => state.camera)
//   const gl = useThree((state) => state.gl)

//   useEffect(() => {
//     // Set camera position
//     camera.position.set(-4.5, 4.5, 0)
//     // Make camera look at the humanoid position
//     camera.lookAt(5, 8, 0)
//     camera.updateProjectionMatrix()
    
//     // Return cleanup that doesn't reset important state
//     return () => {
//       // We intentionally don't reset sceneState.initialized here
//       // to maintain state between page transitions
//     }
//   }, [camera, gl])

//   useFrame(() => {
//     // Always look at humanoid
//     camera.lookAt(0, 3.5, 0)
//   })

//   return (
//     <>
//       <Overlay />
//       <AnimatedCamera />
      
//       <e.pointLight theatreKey="Point Light" position={[10, 10, 10]} />
      
//       <EffectComposer multisampling={2}>
//         <Bloom
//           radius={0.4}
//           mipmapBlur
//           luminanceThreshold={0.3}
//           luminanceSmoothing={0.4}
//           intensity={1}
//         />
//         <ChromaticAberration
//           blendFunction={BlendFunction.NORMAL}
//           offset={[0.003, 0.003]}
//         />
//         <Noise
//           premultiply
//           blendFunction={BlendFunction.NORMAL}
//           opacity={0.6}
//         />
//         <ToneMapping
//           blendFunction={BlendFunction.SCREEN}
//           adaptive={true}
//           resolution={256}
//           middleGrey={0.5}
//           maxLuminance={4.0}
//           averageLuminance={1.0}
//           adaptationRate={1.0}
//         />
//       </EffectComposer>
      
//       <OrbitControls 
//         enablePan={false} 
//       />
      
//       <ambientLight intensity={0.1} />
      
//       <Humanoid />
//     </>
//   );
// }

// // Only preload once
// useGLTF.preload('/models/Camera_animated.glb')

// src/components/Experience.tsx - SIMPLIFIED VERSION
import { Environment } from "@react-three/drei";
import { useThree, useFrame } from '@react-three/fiber';
import { EffectComposer, Scanline, Vignette, Bloom, Noise, Glitch, ToneMapping, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction, GlitchMode } from "postprocessing";
import React, { useEffect, useRef } from 'react'; // No more useState needed!
import { OrbitControls } from '@react-three/drei';
import { Vector3 } from "three";
import { useGLTF, PerspectiveCamera, useAnimations } from '@react-three/drei'
import Overlay from './3d/Overlay';
// import HumanoidComponent from './3d/HumanoidComponent';
import { Humanoid } from './3d/Humanoid';
import { editable as e } from "@theatre/r3f";
import CameraRig from './CameraRig'; // Single import instead of two

export default function Experience() {
  const humanoidRef = useRef()
  const gl = useThree((state) => state.gl)

  // Much simpler - no camera management needed here!
  useEffect(() => {
    // CameraRig handles all camera setup now
    return () => {
      // We intentionally don't reset sceneState.initialized here
      // to maintain state between page transitions
    }
  }, [gl])

  // No useFrame needed here - CameraRig handles camera lookAt

  return (
    <>
      
      
      {/* Single component handles both camera and target */}
      <CameraRig />
      <Overlay />
      <e.pointLight theatreKey="Point Light" position={[10, 10, 10]} />
      
      <EffectComposer multisampling={2}>
        <Bloom
          radius={0.4}
          mipmapBlur
          luminanceThreshold={0.3}
          luminanceSmoothing={0.4}
          intensity={1}
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.003, 0.003]}
        />
        <Noise
          premultiply
          blendFunction={BlendFunction.NORMAL}
          opacity={0.6}
        />
        <ToneMapping
          blendFunction={BlendFunction.SCREEN}
          adaptive={true}
          resolution={256}
          middleGrey={0.5}
          maxLuminance={4.0}
          averageLuminance={1.0}
          adaptationRate={1.0}
        />
      </EffectComposer>
      
      <OrbitControls 
        enablePan={false} 
      />
      
      <ambientLight intensity={0.1} />
      
      <Humanoid />
    </>
  );
}

// Single preload statement
useGLTF.preload('/models/cameraRig.glb')