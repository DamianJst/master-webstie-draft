// // src/components/CameraRig.jsx
// import React, { useEffect, useRef } from 'react';
// import { useGLTF, PerspectiveCamera, useAnimations } from '@react-three/drei';
// import { useNavigation } from '../contexts/NavigationContext';
// import { useFrame, useThree } from '@react-three/fiber';
// import * as THREE from 'three';

// export function CameraRig(props) {
//   const group = useRef();
//   const cubeRef = useRef(); // Reference to the target cube
//   const camera = useThree((state) => state.camera);
  
//   // Load the single GLB file that contains both camera and target
//   const { nodes, materials, animations } = useGLTF('/models/cameraRig.glb');
//   const { actions } = useAnimations(animations, group);
  
//   const { registerCameraAnimations, registerCameraTargetAnimations } = useNavigation();
//   const animationsRegistered = useRef(false);

//   // Register animations - since they're all in one file, we need to separate them
//   useEffect(() => {
//     console.log(nodes)
//     console.log('CameraRig: Checking animations...', {
//       animations: animations?.length,
//       actions: actions ? Object.keys(actions) : null,
//       isRegistered: animationsRegistered.current
//     });

//     if (actions && Object.keys(actions).length > 0 && !animationsRegistered.current) {
//       const actionNames = Object.keys(actions);
//       console.log('CameraRig: All available animations:', actionNames);
      
//       // Separate camera and target animations based on naming
//       const cameraActions = {};
//       const targetActions = {};
      
//       Object.entries(actions).forEach(([name, action]) => {
//         if (name.startsWith('Camera_')) {
//           cameraActions[name] = action;
//         } else if (name.startsWith('CameraTarget_')) {
//           targetActions[name] = action;
//         } else {
//           console.warn(`CameraRig: Unknown animation naming pattern: ${name}`);
//         }
//       });
      
//       console.log('CameraRig: Camera actions:', Object.keys(cameraActions));
//       console.log('CameraRig: Target actions:', Object.keys(targetActions));
      
//       const firstAction = actions[actionNames[0]];
//       const mixer = firstAction?.getMixer();
      
//       if (mixer) {
//         // Register both sets of animations with the same mixer
//         if (Object.keys(cameraActions).length > 0) {
//           registerCameraAnimations(cameraActions, mixer);
//           console.log('CameraRig: Camera animations registered');
//         }
        
//         if (Object.keys(targetActions).length > 0) {
//           registerCameraTargetAnimations(targetActions, mixer);
//           console.log('CameraRig: Target animations registered');
//         }
        
//         animationsRegistered.current = true;
//         console.log('CameraRig: All animations registered successfully');
//       }
//     }
//   }, [actions, registerCameraAnimations, registerCameraTargetAnimations, animations]);

//   // Set initial camera properties
//   useEffect(() => {
//     camera.position.set(-4.5, 4.5, 0);
//     camera.fov = 75;
//     camera.lookAt(0, 5, 0); // Look at the cube's initial position
//     camera.updateProjectionMatrix();
//   }, [camera]);

//   // Handle camera lookAt in useFrame
//   useFrame(() => {
//     if (cubeRef.current) {
//       // Get the world position of the cube
//       const cubeWorldPosition = new THREE.Vector3();
//       cubeRef.current.getWorldPosition(cubeWorldPosition);
      
//       // Make camera look at the cube
//       camera.lookAt(cubeWorldPosition);
      
//       // DEBUG: Log position changes
//       const pos = cubeRef.current.position;
//       if (Math.random() < 0.01) { // Log 1% of frames
//         console.log('CameraRig: Cube position:', {
//           x: pos.x.toFixed(3),
//           y: pos.y.toFixed(3),
//           z: pos.z.toFixed(3)
//         });
//       }
//     }
//   });

//   return (
//     <group ref={group} {...props} dispose={null}>
//       <group name="Scene">
//         <PerspectiveCamera 
//           name="Camera" 
//           makeDefault={true} 
//           far={1000} 
//           near={0.01} 
//           fov={75} 
//           position={[-4.5, 4.5, 0]} 
//           rotation={[-0.24, 0.894, 0.189]} 
//         />
//         <mesh 
//           ref={cubeRef}
//           name="Cube" 
//           geometry={nodes.Cube.geometry} 
//           position={[0, 4.1, 0]} 
//           scale={0.1} 
//         >
//           {/* Override material for better visibility */}
//           <meshBasicMaterial color="red" />
//         </mesh>
//       </group>
//     </group>
//   );
// }

// // Preload the single model
// useGLTF.preload('/models/cameraRig.glb');

// export default CameraRig;

// src/components/CameraRig.jsx
import React, { useEffect, useRef } from 'react';
import { useGLTF, PerspectiveCamera, useAnimations } from '@react-three/drei';
import { useNavigation } from '../contexts/NavigationContext';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import Overlay from './3d/Overlay'; // Import the Overlay component

export function CameraRig(props) {
  const group = useRef();
  const cubeRef = useRef();
  const camera = useThree((state) => state.camera);
  
  const { nodes, materials, animations } = useGLTF('/models/cameraRig.glb');
  const { actions } = useAnimations(animations, group);
  
  const { registerCameraAnimations, registerCameraTargetAnimations } = useNavigation();
  const animationsRegistered = useRef(false);

  // Register animations
  useEffect(() => {
    console.log(nodes)
    console.log('CameraRig: Checking animations...', {
      animations: animations?.length,
      actions: actions ? Object.keys(actions) : null,
      isRegistered: animationsRegistered.current
    });

    if (actions && Object.keys(actions).length > 0 && !animationsRegistered.current) {
      const actionNames = Object.keys(actions);
      console.log('CameraRig: All available animations:', actionNames);
      
      const cameraActions = {};
      const targetActions = {};
      
      Object.entries(actions).forEach(([name, action]) => {
        if (name.startsWith('Camera_')) {
          cameraActions[name] = action;
        } else if (name.startsWith('CameraTarget_')) {
          targetActions[name] = action;
        } else {
          console.warn(`CameraRig: Unknown animation naming pattern: ${name}`);
        }
      });
      
      console.log('CameraRig: Camera actions:', Object.keys(cameraActions));
      console.log('CameraRig: Target actions:', Object.keys(targetActions));
      
      const firstAction = actions[actionNames[0]];
      const mixer = firstAction?.getMixer();
      
      if (mixer) {
        if (Object.keys(cameraActions).length > 0) {
          registerCameraAnimations(cameraActions, mixer);
          console.log('CameraRig: Camera animations registered');
        }
        
        if (Object.keys(targetActions).length > 0) {
          registerCameraTargetAnimations(targetActions, mixer);
          console.log('CameraRig: Target animations registered');
        }
        
        animationsRegistered.current = true;
        console.log('CameraRig: All animations registered successfully');
      }
    }
  }, [actions, registerCameraAnimations, registerCameraTargetAnimations, animations]);

  // Set initial camera properties
  useEffect(() => {
    camera.position.set(-4.5, 4.5, 0);
    camera.fov = 75;
    camera.lookAt(0, 5, 0);
    camera.updateProjectionMatrix();
  }, [camera]);

  // Handle camera lookAt
  useFrame(() => {
    if (cubeRef.current) {
      const cubeWorldPosition = new THREE.Vector3();
      cubeRef.current.getWorldPosition(cubeWorldPosition);
      camera.lookAt(cubeWorldPosition);
      
      const pos = cubeRef.current.position;
      if (Math.random() < 0.01) {
        console.log('CameraRig: Cube position:', {
          x: pos.x.toFixed(3),
          y: pos.y.toFixed(3),
          z: pos.z.toFixed(3)
        });
      }
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <PerspectiveCamera 
          name="Camera" 
          makeDefault={true} 
          far={1000} 
          near={0.01} 
          fov={75} 
          position={[-4.5, 4.5, 0]} 
          rotation={[-0.24, 0.894, 0.189]} 
        >
          {/* Add Overlay as a child of the camera - positioned in camera space */}
          <Overlay position={[0, 0, -0.1]} />
        </PerspectiveCamera>
        
        <mesh 
          ref={cubeRef}
          name="Cube" 
          geometry={nodes.Cube.geometry} 
          position={[0, 4.1, 0]} 
          scale={0.1} 
        >
          <meshBasicMaterial color="red" />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload('/models/cameraRig.glb');

export default CameraRig;