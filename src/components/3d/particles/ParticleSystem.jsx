// src/components/3d/particles/ParticleSystem.jsx
import React from 'react';
import ParticleSwarm from './ParticleSwarm';
import ParticleLines from './ParticleLines';
import AttractorStorm from './AttractorStorm';
import { useMouseTracker } from '../../../hooks/useMouseTracker';

export default function ParticleSystem({
  // Global toggles
  enabled = true,
  
  // Swarm settings
  swarm = {
    enabled: true,
    count: 3000,
    color: "#050505",
    intensity: 0.5
  },
  
  // Lines settings  
  lines = {
    enabled: true,
    count: 8,
    colors: ['#A2CCB6', '#FCEEB5', '#EE786E', '#e0feff', 'lightpink', 'lightblue'],
    radius: 15,
    rotationIntensity: 0.5
  },

  // Attractor settings
  attractors = {
    enabled: true,
    count: 12,
    colors: ["hsl(179, 90%, 61%)", "hsl(255, 0%, 100%)", "hsl(25, 100%, 50%)"],
    attractorScale: 0.45,
    attractorTimeStep: 0.004,
    useLines: false, // Toggle between points and flowing lines
    position: [0, 4.8, 0],
    rotation: [0, Math.PI, Math.PI * 2.3],
    scale: [1.4, 1.4, 1.4]
  },
  
  // Performance settings
  performance = {
    reducedParticles: false // Automatically reduce particles on mobile
  }
}) {
  const mouse = useMouseTracker();
  
  // Auto-adjust for performance
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const adjustedSwarmCount = performance.reducedParticles && isMobile 
    ? Math.min(swarm.count, 1500) 
    : swarm.count;
  const adjustedLinesCount = performance.reducedParticles && isMobile 
    ? Math.min(lines.count, 5) 
    : lines.count;
  const adjustedAttractorCount = performance.reducedParticles && isMobile 
    ? Math.min(attractors.count, 8) 
    : attractors.count;

  if (!enabled) return null;

  return (
    <group name="ParticleSystem">
      {/* Particle Swarm */}
      <ParticleSwarm
        enabled={swarm.enabled}
        count={adjustedSwarmCount}
        mouse={mouse}
        color={swarm.color}
        intensity={swarm.intensity}
      />
      
      {/* Particle Lines */}
      <ParticleLines
        enabled={lines.enabled}
        count={adjustedLinesCount}
        colors={lines.colors}
        radius={lines.radius}
        mouse={mouse}
        rotationIntensity={lines.rotationIntensity}
      />

      {/* Chaos Attractor Storm */}
      <AttractorStorm
        enabled={attractors.enabled}
        count={adjustedAttractorCount}
        colors={attractors.colors}
        attractorScale={attractors.attractorScale}
        attractorTimeStep={attractors.attractorTimeStep}
        useLines={attractors.useLines}
        position={attractors.position}
        rotation={attractors.rotation}
        scale={attractors.scale}
      />
    </group>
  );
}