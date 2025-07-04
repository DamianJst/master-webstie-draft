// import { Environment } from "@react-three/drei";
// import { useThree, useFrame } from '@react-three/fiber';
// import { EffectComposer, Scanline, Vignette, Bloom, Noise, Glitch, ToneMapping, ChromaticAberration } from "@react-three/postprocessing";
// // import { editable as e } from "@theatre/r3f";
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
// // import { useControls } from "leva";


// // import  {useEffect} from 'react'
// // import { Camera } from './Camera';
// // import { isProd } from "../App";
// // import { MedievalFantasyBook } from "./MedievalFantasyBook";
// export default function Experience (
//   // { e }
// ) {
//  const humanoidRef = useRef()
//   const camera = useThree((state) => state.camera)
//   const gl = useThree((state) => state.gl)

// const group = React.useRef()
//   const { animations } = useGLTF('/models/Camera_animated.glb')
//   const { actions } = useAnimations(animations, group)

//     // const { animation } = useControls({
//     //   animation: {
//     //     value: "camera_animated",
//     //     options: Object.keys(actions)
//     //   }
//     // })
  
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

//     // useEffect(() => {
//     //   // Log action names to confirm 
//     //   console.log(actions) 
//     //   const action = Object.values(actions)[0]
//     //   action?.reset().fadeIn(0.5).play()
//     // }, [actions])

//     // useEffect(()=>{
//       // console.log(actions)
//       // actions[animation].play();
//     // },[animation])

//   // Use editable components if Theatre.js is loaded, otherwise use regular components
//   // const PointLight = e ? e.pointLight : 'pointLight';
//   // const Group = e ? e.group : 'group';

//   return (
//     <>
// <Overlay />
//       <AnimatedCamera />
//       {/* <group ref={group} dispose={null}>
//             <group name="Scene">
//               <PerspectiveCamera name="Camera" makeDefault={true} far={1000} near={0.01} fov={75} position={[-9.996, 4.5, -0.002]} rotation={[0, -Math.PI / 2, 0]} />
//             </group>
//           </group> */}
//       {/* Use Theatre.js editable pointLight if available, otherwise regular pointLight */}
//       {/* {e ? (
//         <PointLight theatreKey="Light" position={[10, 10, 10]} />
//       ) : (
//         <pointLight position={[10, 10, 10]} />
//       )} */}
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
//       // enableZoom={false}
//       enablePan={false} />
      
//       <ambientLight intensity={0.1} />
      
//       {/* Wrap Humanoid in editable group if Theatre.js is available */}
//       {/* {e ? ( */}
//         {/* <e.group theatreKey={"HumanoidComponent"}> */}
//           {/* <HumanoidComponent ref={humanoidRef} /> */}
//         {/* </e.group> */}
//       {/* // ) : ( */}
//         {/* <group position={[0, 0, 0]}> */}
//           <Humanoid />
//         {/* </group> */}
//       {/* )} */}
//     </>
//   );
// };

// useGLTF.preload('/models/Camera_animated.glb')

import { Environment } from "@react-three/drei";
import { useThree, useFrame } from '@react-three/fiber';
import { EffectComposer, Scanline, Vignette, Bloom, Noise, Glitch, ToneMapping, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction, GlitchMode } from "postprocessing";
import React, { useEffect, useRef } from 'react';
import { OrbitControls } from '@react-three/drei';
import { Vector3 } from "three";
import { useGLTF, PerspectiveCamera, useAnimations } from '@react-three/drei'
import Overlay from './3d/Overlay';
import HumanoidComponent from './3d/HumanoidComponent';
import { Humanoid } from './3d/Humanoid';
import { editable as e } from "@theatre/r3f";
import AnimatedCamera from './AnimatedCamera';

export default function Experience() {
  const humanoidRef = useRef()
  const camera = useThree((state) => state.camera)
  const gl = useThree((state) => state.gl)

  useEffect(() => {
    // Set camera position
    camera.position.set(-4.5, 4.5, 0)
    // Make camera look at the humanoid position
    camera.lookAt(5, 8, 0)
    camera.updateProjectionMatrix()
    
    // Return cleanup that doesn't reset important state
    return () => {
      // We intentionally don't reset sceneState.initialized here
      // to maintain state between page transitions
    }
  }, [camera, gl])

  useFrame(() => {
    // Always look at humanoid
    camera.lookAt(0, 3.5, 0)
  })

  return (
    <>
      <Overlay />
      <AnimatedCamera />
      
      <pointLight position={[-5, 5, 5]} intensity={1000} color={[1, 1, 1]} />
      <pointLight position={[0, 7, -8]} intensity={1000} color={[1, 1, 1]} />

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

// Only preload once
useGLTF.preload('/models/Camera_animated.glb')