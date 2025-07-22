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
// import { Environment } from "@react-three/drei";
// import { useThree, useFrame } from '@react-three/fiber';
// import { EffectComposer, Scanline, Vignette, Bloom, Noise, Glitch, ToneMapping, ChromaticAberration } from "@react-three/postprocessing";
// import { BlendFunction, GlitchMode } from "postprocessing";
// import React, { useEffect, useRef } from 'react'; // No more useState needed!
// import { OrbitControls } from '@react-three/drei';
// import { Vector3 } from "three";
// import { useGLTF, PerspectiveCamera, useAnimations } from '@react-three/drei'
// // import Overlay from './3d/Overlay';
// // import HumanoidComponent from './3d/HumanoidComponent';
// import { Humanoid } from './3d/Humanoid';
// import { editable as e } from "@theatre/r3f";
// import CameraRig from './CameraRig'; // Single import instead of two
// import { CubeCamera } from "@react-three/drei";

// export default function Experience() {
//   const humanoidRef = useRef()
//   const gl = useThree((state) => state.gl)

//   // Much simpler - no camera management needed here!
//   useEffect(() => {
//     // CameraRig handles all camera setup now
//     return () => {
//       // We intentionally don't reset sceneState.initialized here
//       // to maintain state between page transitions
//     }
//   }, [gl])

//   // No useFrame needed here - CameraRig handles camera lookAt

//   return (
//     <>
      
      
//       {/* Single component handles both camera and target */}
//       <CameraRig />
//       {/* <Overlay /> */}
//       <e.pointLight theatreKey="Point Light" position={[10, 10, 10]} />
//       <CubeCamera frames={1} resolution={256}></CubeCamera>
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

// // Single preload statement
// useGLTF.preload('/models/cameraRig.glb')

// src/components/Experience.tsx - Updated with Chaos Attractors
import { Environment } from "@react-three/drei";
import { useThree, useFrame } from '@react-three/fiber';
import { EffectComposer, Scanline, Vignette, Bloom, Noise, Glitch, ToneMapping, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction, GlitchMode } from "postprocessing";
import React, { useEffect, useRef } from 'react';
import { OrbitControls } from '@react-three/drei';
import { Vector3 } from "three";
import { useGLTF, PerspectiveCamera, useAnimations } from '@react-three/drei'
import Overlay from './3d/Overlay';
import { Humanoid } from './3d/Humanoid';
import { editable as e } from "@theatre/r3f";
import CameraRig from './CameraRig';
import ParticleSystem from './3d/particles/ParticleSystem';
import { useParticleControls } from '../hooks/useParticleControls';

export default function Experience() {
  const humanoidRef = useRef()
  const gl = useThree((state) => state.gl)

  // Particle controls with chaos attractors enabled
  const { 
    config, 
    toggleParticles, 
    toggleSwarm, 
    toggleLines, 
    toggleAttractors,
    toggleAttractorMode,
    setChaosMode 
  } = useParticleControls({
    // Custom config for your portfolio
    swarm: {
      enabled: false, // Start with swarm disabled to showcase attractors
      count: 2000,
      color: "#050505",
      intensity: 0.3
    },
    lines: {
      enabled: false, // Start with simple lines disabled
      count: 6,
      colors: ['#A2CCB6', '#FCEEB5', '#EE786E', '#e0feff', 'lightpink', 'lightblue'],
      radius: 12,
      rotationIntensity: 0.3
    },
    attractors: {
      enabled: true, // Chaos attractors enabled by default
      count: 15,
      colors: ["hsl(179, 90%, 61%)", "hsl(255, 0%, 100%)", "hsl(25, 100%, 50%)"],
      attractorScale: 0.45,
      attractorTimeStep: 0.004,
      useLines: false, // Start with points, can toggle to lines
      position: [0, 4.8, 0],
      rotation: [0, Math.PI, Math.PI * 2.3],
      scale: [1.4, 1.4, 1.4]
    }
  });

  // Enhanced keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      switch(e.key.toLowerCase()) {
        case 'p': toggleParticles(); break;
        case 's': toggleSwarm(); break;
        case 'l': toggleLines(); break;
        case 'a': toggleAttractors(); break;
        case 'm': toggleAttractorMode(); break; // Toggle attractor mode (points/lines)
        case 'c': setChaosMode(); break; // Enable pure chaos mode
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [toggleParticles, toggleSwarm, toggleLines, toggleAttractors, toggleAttractorMode, setChaosMode]);

  useEffect(() => {
    return () => {
      // Clean up
    }
  }, [gl])

  return (
    <>
      {/* Camera and target management */}
      <CameraRig />
      <Overlay />
      
      {/* Enhanced Particle System with Chaos Attractors */}
      <ParticleSystem {...config} />
      
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

// Enhanced debug info component
export function ParticleDebugInfo({ config, controls }) {
  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: 'rgba(0,0,0,0.7)',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '12px',
      zIndex: 1000
    }}>
      <div>Particles: {config.enabled ? 'ON' : 'OFF'}</div>
      <div>Swarm: {config.swarm.enabled ? 'ON' : 'OFF'} ({config.swarm.count})</div>
      <div>Lines: {config.lines.enabled ? 'ON' : 'OFF'} ({config.lines.count})</div>
      <div>Attractors: {config.attractors.enabled ? 'ON' : 'OFF'} ({config.attractors.count})</div>
      <div>Mode: {config.attractors.useLines ? 'Lines' : 'Points'}</div>
      <div style={{ marginTop: '5px', fontSize: '10px' }}>
        Press: P (particles), S (swarm), L (lines), A (attractors), M (mode), C (chaos)
      </div>
    </div>
  );
}