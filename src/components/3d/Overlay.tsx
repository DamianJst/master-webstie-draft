/* Overlay.jsx ----------------------------------------------------------- */
import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import { useEffect, useRef } from 'react';

/* Material class that exposes BOTH colour and alpha as plain props */
const OverlayMaterial = shaderMaterial(
  { uColor: new THREE.Color('#000000'), uAlpha: 0.5 },  // defaults
  /* vertex */ `
    void main() { gl_Position = vec4(position, 1.0); }
  `,
  /* fragment */ `
    uniform vec3  uColor;
    uniform float uAlpha;
    void main() { gl_FragColor = vec4(uColor, uAlpha); }
  `
);
extend({ OverlayMaterial });                            // makes <overlayMaterial /> usable

/* Full-screen quad */
export default function Overlay({ color = '#ffffff', alpha = 0.008, ...props }) {
  const mesh    = useRef();           // for renderOrder tweak
  const matRef  = useRef();           // for live colour updates

  /* Always draw last */
  useEffect(() => {
    mesh.current.renderOrder = 9999;
  }, []);

  /* Update uniforms whenever props change */
  useEffect(() => {
    matRef.current.uniforms.uAlpha.value = alpha;
    matRef.current.uniforms.uColor.value.set(color);
  }, [alpha, color]);

  return (
    <mesh ref={mesh} {...props}>
      <planeGeometry args={[2, 2]} />
      <overlayMaterial
        ref={matRef}
        transparent
        depthWrite={false}
        /* the initial values don’t matter – they’re overwritten in useEffect */
      />
    </mesh>
  );
}
