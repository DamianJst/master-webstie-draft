// src/components/3d/particles/ParticleLines.jsx
import React, { useRef, useMemo } from 'react';
import { useFrame, useThree, extend } from '@react-three/fiber';
import * as THREE from 'three';
import * as meshline from 'threejs-meshline';

// Extend MeshLine components
extend(meshline);

// Simple lerp function to avoid external dependency
const lerp = (start, end, factor) => start + (end - start) * factor;

function FatLine({ curve, width, color, speed, enabled }) {
  const material = useRef();
  
  useFrame(() => {
    if (!enabled || !material.current) return;
    material.current.uniforms.dashOffset.value -= speed;
  });

  if (!enabled) return null;

  return (
    <mesh>
      <meshLine attach="geometry" vertices={curve} />
      <meshLineMaterial
        ref={material}
        transparent
        depthTest={false}
        lineWidth={width}
        color={color}
        dashArray={0.1}
        dashRatio={0.95}
      />
    </mesh>
  );
}

function r() {
  return Math.max(0.5, Math.random());
}

export default function ParticleLines({ 
  enabled = true, 
  count = 10, 
  colors = ['#A2CCB6', '#FCEEB5', '#EE786E', '#e0feff', 'lightpink', 'lightblue'],
  radius = 15,
  mouse = { current: [0, 0] },
  rotationIntensity = 1
}) {
  const lines = useMemo(() => {
    return new Array(count).fill().map(() => {
      const pos = new THREE.Vector3(
        Math.sin(0) * radius * r(), 
        Math.cos(0) * radius * r(), 
        0
      );
      
      const points = new Array(30).fill().map((_, index) => {
        const angle = (index / 20) * Math.PI * 2;
        return pos.add(new THREE.Vector3(
          Math.sin(angle) * radius * r(), 
          Math.cos(angle) * radius * r(), 
          0
        )).clone();
      });
      
      const curve = new THREE.CatmullRomCurve3(points).getPoints(1000);
      
      return {
        color: colors[parseInt(colors.length * Math.random())],
        width: 0.1,
        speed: Math.max(0.0005, 0.001 * Math.random()),
        curve
      };
    });
  }, [count, colors, radius]);

  const ref = useRef();
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;
  
  useFrame(() => {
    if (!enabled || !ref.current) return;
    
    ref.current.rotation.x = lerp(
      ref.current.rotation.x, 
      0 + (mouse.current[1] / aspect / 50) * rotationIntensity, 
      0.1
    );
    ref.current.rotation.y = lerp(
      ref.current.rotation.y, 
      0 + (mouse.current[0] / aspect / 100) * rotationIntensity, 
      0.1
    );
  });

  if (!enabled) return null;

  return (
    <group ref={ref}>
      <group position={[-radius * 2, -radius, 0]}>
        {lines.map((props, index) => (
          <FatLine key={index} {...props} enabled={enabled} />
        ))}
      </group>
    </group>
  );
}