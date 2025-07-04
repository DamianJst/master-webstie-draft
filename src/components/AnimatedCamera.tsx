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