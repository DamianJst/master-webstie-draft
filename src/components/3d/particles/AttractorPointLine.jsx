// src/components/3d/particles/AttractorPointLine.jsx
import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { updateAttractor, createAttractor } from './attractor';
import * as THREE from 'three';

function AttractorPointLine({ 
  simulation, 
  attractorScale, 
  attractorTimeStep, 
  count, 
  color,
  enabled = true 
}) {
  const pointsRef = useRef();
  
  const [positions, currentPosition] = useMemo(() => createAttractor(count), [count]);
  const [pointsArray, setPointsArray] = useState(positions);

  const geometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const opacities = new Float32Array(count);
    
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("opacity", new THREE.BufferAttribute(opacities, 1, true));
    
    return geometry;
  }, [count]);

  // Set up opacity values for fading effect
  useMemo(() => {
    const opacities = geometry.attributes.opacity.array;
    for (let i = 0; i < count; i++) {
      // Create fade effect - newer points are more opaque
      const fadeRatio = i / count;
      opacities[i] = Math.random() > 0.75 ? 1.0 : 0.06 + (fadeRatio * 0.4);
    }
    geometry.attributes.opacity.needsUpdate = true;
  }, [geometry, count]);

  useFrame(() => {
    if (!enabled) return;
    
    // Calculate next position using the attractor
    const newPosition = updateAttractor(
      currentPosition, 
      attractorScale, 
      simulation, 
      attractorTimeStep
    );

    // Update trail: remove oldest point, add newest
    const updatedPointsArray = pointsArray.slice(1).concat(newPosition);
    setPointsArray(updatedPointsArray);

    // Update geometry positions
    const positions = geometry.attributes.position.array;
    updatedPointsArray.forEach((point, i) => {
      positions[i * 3] = point.x;
      positions[i * 3 + 1] = point.y;
      positions[i * 3 + 2] = point.z;
    });

    geometry.attributes.position.needsUpdate = true;
  });

  const vertexShader = `
    varying float vOpacity;
    attribute float opacity;

    void main() {
      vOpacity = opacity;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = 0.13 * 300.0 / -mvPosition.z;
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const fragmentShader = `
    uniform vec3 color;
    varying float vOpacity;

    void main() {
      gl_FragColor = vec4(color, vOpacity);
    }
  `;

  if (!enabled) return null;

  return (
    <points ref={pointsRef} geometry={geometry}>
      <shaderMaterial
        attach="material"
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        blending={THREE.AdditiveBlending}
        transparent
        uniforms={{
          color: { 
            value: new THREE.Color(
              Math.random() > 0.75 
                ? "hsl(255, 0%, 100%)" 
                : color || "hsl(179, 90%, 61%)"
            ) 
          },
        }}
      />
    </points>
  );
}

export default AttractorPointLine;