// src/components/3d/particles/AttractorStorm.jsx
import React, { useMemo } from 'react';
import { 
  attractors, 
  dadrasAttractor, 
  aizawaAttractor, 
  arneodoAttractor, 
  lorenzAttractor, 
  lorenzMod2Attractor 
} from './attractor';
import AttractorPointLine from './AttractorPointLine';
import AttractorMeshLine from './AttractorMeshLine';

// Helper to pick random attractor
const randomAttractor = () => attractors[Math.floor(Math.random() * attractors.length)];

// Helper to generate random range
const randomRange = (min, max) => Math.random() * (max - min) + min;

function AttractorStorm({ 
  enabled = true,
  count = 15, 
  colors = ["hsl(179, 90%, 61%)", "hsl(255, 0%, 100%)", "hsl(25, 100%, 50%)"],
  attractorScale = 0.45,
  attractorTimeStep = 0.004,
  position = [0, 4.8, 0],
  rotation = [0, Math.PI, Math.PI * 2.3],
  scale = [1.4, 1.4, 1.4],
  useLines = false, // Toggle between points and lines
  pointTrailLength = 100,
  lineTrailLength = 200
}) {
  
  const lines = useMemo(() => {
    return new Array(count).fill().map(() => ({
      color: colors[Math.floor(Math.random() * colors.length)],
      simulation: randomAttractor(),
      attractorScale: randomRange(2, 3) * attractorScale,
      attractorTimeStep: attractorTimeStep,
      count: pointTrailLength,
      width: randomRange(0.008, 0.015), // For mesh lines
      opacity: randomRange(0.02, 0.06),  // For mesh lines
      trailLength: lineTrailLength
    }));
  }, [count, colors, attractorScale, attractorTimeStep, pointTrailLength, lineTrailLength]);

  if (!enabled) return null;

  return (
    <group 
      scale={scale} 
      position={position} 
      rotation={rotation}
    >
      {lines.map((props, index) => (
        useLines ? (
          <AttractorMeshLine 
            key={`line-${index}`} 
            enabled={enabled}
            simulation={props.simulation}
            attractorScale={props.attractorScale}
            attractorTimeStep={props.attractorTimeStep}
            width={props.width}
            color={props.color}
            opacity={props.opacity}
            trailLength={props.trailLength}
          />
        ) : (
          <AttractorPointLine 
            key={`points-${index}`} 
            enabled={enabled}
            simulation={props.simulation}
            attractorScale={props.attractorScale}
            attractorTimeStep={props.attractorTimeStep}
            count={props.count}
            color={props.color}
          />
        )
      ))}
    </group>
  );
}

export default AttractorStorm;