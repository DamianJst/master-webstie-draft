// src/components/3d/Humanoid.tsx
import { useRef, useMemo, forwardRef, useImperativeHandle, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { LayerMaterial, Fresnel, Noise } from 'lamina'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

// Preload the model
useGLTF.preload('/models/ARPHumanoid.glb')

interface HumanoidProps {
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
  animateInternally?: boolean;
  e?: any; // Theatre.js editable components
  [key: string]: any;
}

const HumanoidComponent = forwardRef<THREE.Mesh, HumanoidProps>(({ 
  position = [0, 0, 0], 
  scale = 1, 
  rotation = [0, Math.PI, 0],
  animateInternally = false,
  e, // Destructure the e prop
  ...props 
}, ref) => {
  const matRef = useRef()
  const meshRef = useRef(null!)
  const matSpeedRef = useRef(0.008)
  const animationGroupRef = useRef()
  
  // State to store editable components once they're created
  const [editableComponents, setEditableComponents] = useState(null)
  
  // Expose mesh to parent via ref
  useImperativeHandle(ref, () => meshRef.current)
  
  // Create editable components in useEffect to ensure proper timing
  useEffect(() => {
    if (e) {
      // Create all editable components after Theatre.js is ready
      const components = {
        Mesh: e.mesh,
        Group: e.group,
        LayerMaterial: e.LayerMaterial || LayerMaterial,
        Noise: e.Noise || Noise,
        Fresnel: e.Fresnel || Fresnel,
      }
      setEditableComponents(components)
    } else {
      // Fallback to regular components
      setEditableComponents({
        Mesh: 'mesh',
        Group: 'group',
        LayerMaterial: LayerMaterial,
        Noise: Noise,
        Fresnel: Fresnel,
      })
    }
  }, [e])
  
  // Load model with error boundary
  const { nodes } = useGLTF('/models/ARPHumanoid.glb')

  console.log(nodes)
  
  // Find the main mesh geometry
  const geometry = useMemo(() => {
    const meshNode = Object.values(nodes).find((node: any) => node.geometry)
    return (meshNode as any)?.geometry
  }, [nodes])
  
  // Animate material (always runs)
  useFrame((state, delta) => {
    if (matRef.current) {
       // Get animation speed from Theatre.js if available, otherwise use default
       const speed = animationGroupRef.current?.animationSpeed ?? matSpeedRef.current;
       matRef.current.offset.x += speed * delta * 60
    }
    
    // Only run internal animations if enabled
    // if (animateInternally && meshRef.current) {
    //   const breathingScale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02
    //   meshRef.current.scale.setScalar(scale * breathingScale)
    //   meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.05
    // }
  })
  
  // Don't render until editable components are ready and geometry is loaded
  if (!editableComponents || !geometry) {
    return null
  }
  
  // Destructure the editable components
  const { Mesh, Group, LayerMaterial: LayerMaterialEditable, Noise: NoiseEditable, Fresnel: FresnelEditable } = editableComponents
  
  return (
    <Group
      ref={animationGroupRef}
      theatreKey={e ? "HumanoidAnimation" : undefined}
      animationSpeed={0.008} // Default animation speed - controllable in Theatre.js
    >
      <Mesh
        ref={meshRef}
        geometry={geometry}
        position={position}
        rotation={rotation}
        scale={scale}
        theatreKey={e ? "HumanoidMesh" : undefined} // Only add theatreKey if using Theatre.js
        {...props}
      >
        <LayerMaterialEditable
          color="#000000"
          lighting="physical"
          theatreKey={e ? "HumanoidMaterial" : undefined}
        >
          <NoiseEditable
            ref={matRef}
            scale={2}
            alpha={1}
            colorA={[0, 0, 0]}
            colorB={[0, 0, 0]}
            colorD={[0, 0, 0]}
            colorC={[15, 1, 0]}
            type="perlin"
            theatreKey={e ? "MaterialNoise" : undefined}
          />
          <FresnelEditable
            mode="softlight"
            color="#fefefe"
            intensity={2}
            power={2}
            bias={0}
            alpha={1}
            visible
            theatreKey={e ? "MaterialFresnel" : undefined}
          />
        </LayerMaterialEditable>
      </Mesh>
    </Group>
  )
})

HumanoidComponent.displayName = 'HumanoidComponent'

export default HumanoidComponent