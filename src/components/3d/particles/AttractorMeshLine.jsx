// src/components/3d/particles/AttractorMeshLine.jsx
import React, { useRef, useMemo } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import { updateAttractor, createAttractor } from './attractor';
import * as meshline from 'threejs-meshline';

// Extend MeshLine components
extend(meshline);

function AttractorMeshLine({ 
  simulation, 
  attractorScale = 1, 
  attractorTimeStep = 0.002, 
  width = 0.01, 
  color = "cyan",
  opacity = 0.02,
  enabled = true,
  trailLength = 200 
}) {
  const line = useRef();
  
  const [positions, currentPosition] = useMemo(() => 
    createAttractor(trailLength), [trailLength]
  );

  useFrame(() => {
    if (!enabled || !line.current) return;
    
    const nextPosition = updateAttractor(
      currentPosition,
      attractorScale,
      simulation,
      attractorTimeStep
    );

    // Add the new position to create a flowing trail
    line.current.advance(nextPosition);
  });

  if (!enabled) return null;

  return (
    <mesh>
      <meshLine ref={line} attach="geometry" points={positions} />
      <meshLineMaterial 
        transparent 
        lineWidth={width} 
        color={color} 
        opacity={opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

export default AttractorMeshLine;