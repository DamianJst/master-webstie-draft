// import React, { useEffect, useRef, useState } from 'react';
// import { useGLTF, useAnimations, PerspectiveCamera } from '@react-three/drei';
// import { useNavigation } from '../contexts/NavigationContext';
// import * as THREE from 'three';

// function AnimatedCamera(props) {
//   const group = useRef();
//   const { nodes, materials, animations } = useGLTF('/models/Camera_animated.glb');
//   const { actions } = useAnimations(animations, group);
//   const { currentTransition, onTransitionComplete } = useNavigation();
//   const [isTransitioning, setIsTransitioning] = useState(false);

//   useEffect(() => {
//     if (!currentTransition || !actions) return;

//     const { clip, reverse } = currentTransition;
//     const action = actions[clip];
    
//     if (!action) {
//       console.warn(`Animation clip "${clip}" not found`);
//       console.log('Available clips:', Object.keys(actions));
//       onTransitionComplete();
//       return;
//     }

//     setIsTransitioning(true);
    
//     // Stop all other actions
//     Object.values(actions).forEach(a => a.stop());
    
//     // Reset and configure the action
//     action.reset();
//     action.setLoop(THREE.LoopOnce);
//     action.clampWhenFinished = true;
    
//     if (reverse) {
//       action.timeScale = -2; // Play in reverse at 2x speed
//       action.time = action.getClip().duration; // Start from the end
//     } else {
//       action.timeScale = 1; // Normal speed
//       action.time = 0; // Start from beginning
//     }
    
//     // Play the animation
//     action.play();
    
//     // Set up completion handler
//     const mixer = action.getMixer();
//     const onFinished = () => {
//       setIsTransitioning(false);
//       onTransitionComplete();
//       mixer.removeEventListener('finished', onFinished);
//     };
    
//     mixer.addEventListener('finished', onFinished);
    
//     return () => {
//       mixer.removeEventListener('finished', onFinished);
//     };
//   }, [currentTransition, actions, onTransitionComplete]);

//   return (
//     <group ref={group} {...props} dispose={null}>
//       <group name="Scene">
//         <PerspectiveCamera 
//           name="Camera" 
//           makeDefault={true} 
//           far={1000} 
//           near={0.01} 
//           fov={75} 
//           position={[-9.996, 4.5, -0.002]} 
//           rotation={[0, -Math.PI / 2, 0]} 
//         />
//       </group>
//     </group>
//   );
// }

// // Preload the model
// useGLTF.preload('/models/Camera_animated.glb');

// export default AnimatedCamera;

// import React, { useEffect, useRef } from 'react';
// import { useGLTF, useAnimations, PerspectiveCamera } from '@react-three/drei';
// import { useNavigation } from '../contexts/NavigationContext';

// function AnimatedCamera(props) {
//   const group = useRef();
//   const { nodes, materials, animations } = useGLTF('/models/Camera_animated.glb');
//   const { actions } = useAnimations(animations, group);
//   const { registerAnimations } = useNavigation();
//   const isRegistered = useRef(false);

//   // Register animations with the context store once they're loaded
//   useEffect(() => {
//     // console.log('Registering animations:', actions);
//     if (actions && !isRegistered.current) {
//       // Get the mixer from any action (they all share the same mixer)
//       const mixer = actions[Object.keys(actions)[0]]?.getMixer();
      
//       if (mixer) {
//         // console.log('Registering animations:', Object.keys(actions));
//         registerAnimations(actions, mixer);
//         isRegistered.current = true;
//         // console.log('Animations registered:', Object.keys(actions));
//       }
//     }
//   }, [actions, registerAnimations]);

//   return (
//     <group ref={group} {...props} dispose={null}>
//       <group name="Scene">
//         <PerspectiveCamera 
//           name="Camera" 
//           makeDefault={true} 
//           far={1000} 
//           near={0.01} 
//           fov={75} 
//           position={[-9.996, 4.5, -0.002]} 
//           rotation={[0, -Math.PI / 2, 0]} 
//         />
//       </group>
//     </group>
//   );
// }

// // Preload the model
// useGLTF.preload('/models/Camera_animated.glb');

// export default AnimatedCamera;

import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations, PerspectiveCamera } from '@react-three/drei';
import { useNavigation } from '../contexts/NavigationContext';

function AnimatedCamera(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/models/Camera_animated.glb');
  const { actions } = useAnimations(animations, group);
  const { registerAnimations } = useNavigation();
  const isRegistered = useRef(false);

  // Register animations with the context store once they're loaded
  useEffect(() => {
    console.log('AnimatedCamera: Checking animations...', {
      animations: animations?.length,
      actions: actions ? Object.keys(actions) : null,
      isRegistered: isRegistered.current
    });

    if (actions && Object.keys(actions).length > 0 && !isRegistered.current) {
      // Get the mixer from any action (they all share the same mixer)
      const actionNames = Object.keys(actions);
      const firstAction = actions[actionNames[0]];
      const mixer = firstAction?.getMixer();
      
      if (mixer) {
        console.log('AnimatedCamera: Registering animations:', actionNames);
        registerAnimations(actions, mixer);
        isRegistered.current = true;
        console.log('AnimatedCamera: Animations registered successfully');
      } else {
        console.warn('AnimatedCamera: No mixer found for actions');
      }
    } else if (!actions) {
      console.warn('AnimatedCamera: No actions available');
    } else if (Object.keys(actions).length === 0) {
      console.warn('AnimatedCamera: Actions object is empty');
    }
  }, [actions, registerAnimations, animations]);

  // Additional debug logging
  useEffect(() => {
    console.log('AnimatedCamera: GLTF loaded:', {
      hasNodes: !!nodes,
      hasMaterials: !!materials,
      animationsCount: animations?.length || 0,
      actionsCount: actions ? Object.keys(actions).length : 0
    });
  }, [nodes, materials, animations, actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <PerspectiveCamera 
          name="Camera" 
          makeDefault={true} 
          far={1000} 
          near={0.01} 
          fov={75} 
          position={[-9.996, 4.5, -0.002]} 
          rotation={[0, -Math.PI / 2, 0]} 
        />
      </group>
    </group>
  );
}

export default AnimatedCamera;