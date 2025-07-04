import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useNavigation } from '../contexts/NavigationContext';

function AnimatedCameraTarget(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/models/portfolio_website_camera_target.glb');
  const { actions } = useAnimations(animations, group);
  const { registerCameraTargetAnimations } = useNavigation();
  const isRegistered = useRef(false);

  // Register animations with the context store once they're loaded
  useEffect(() => {
    console.log('AnimatedCameraTarget: Checking animations...', {
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
        console.log('AnimatedCameraTarget: Registering animations:', actionNames);
        registerCameraTargetAnimations(actions, mixer);
        isRegistered.current = true;
        console.log('AnimatedCameraTarget: Animations registered successfully');
      } else {
        console.warn('AnimatedCameraTarget: No mixer found for actions');
      }
    } else if (!actions) {
      console.warn('AnimatedCameraTarget: No actions available');
    } else if (Object.keys(actions).length === 0) {
      console.warn('AnimatedCameraTarget: Actions object is empty');
    }
  }, [actions, registerCameraTargetAnimations, animations]);

  // Additional debug logging
  useEffect(() => {
    console.log('AnimatedCameraTarget: GLTF loaded:', {
      hasNodes: !!nodes,
      hasMaterials: !!materials,
      animationsCount: animations?.length || 0,
      actionsCount: actions ? Object.keys(actions).length : 0
    });
  }, [nodes, materials, animations, actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      {/* The camera target is typically an invisible object used for animation */}
      {/* You might want to add a visible helper for debugging */}
      <mesh visible={false} name="CameraTarget">
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshBasicMaterial color="red" />
      </mesh>
    </group>
  );
}

export default AnimatedCameraTarget;