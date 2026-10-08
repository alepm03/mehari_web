import { ContactShadows, Environment, Lightformer, OrbitControls, Preload } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Suspense, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Mehari, type ColorCoche, type Techo } from './Mehari';

/** Entrada de cámara: se acerca girando cuando la sección aparece. */
function CamaraEntrada() {
  const { camera } = useThree();
  const t = useRef(0);
  useFrame((_, dt) => {
    if (t.current >= 1) return;
    // la escena puede llevar un rato montada en pausa: se limita dt para que la entrada no se salte
    t.current = Math.min(1, t.current + Math.min(dt, 1 / 30) / 2.2);
    const e = 1 - Math.pow(1 - t.current, 3);
    const ang = THREE.MathUtils.lerp(1.6, 0.75, e);
    const r = THREE.MathUtils.lerp(10.5, 7.4, e);
    camera.position.set(Math.cos(ang) * r, THREE.MathUtils.lerp(3.4, 2.1, e), Math.sin(ang) * r);
    camera.lookAt(0, 0.6, 0);
  });
  return null;
}

/** En pantallas táctiles, el gesto vertical hace scroll de la página y el horizontal gira el coche. */
function ScrollTactil() {
  const { gl, controls } = useThree();
  useEffect(() => {
    gl.domElement.style.touchAction = 'pan-y';
  }, [gl, controls]);
  return null;
}

export default function Escena({ color, techo, flores, activa }: { color: ColorCoche; techo: Techo; flores: boolean; activa: boolean }) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      frameloop={activa ? 'always' : 'never'}
      camera={{ position: [4.8, 1.9, 4.2], fov: 32, near: 0.1, far: 60 }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, outputColorSpace: THREE.SRGBColorSpace }}
    >
      <CamaraEntrada />
      <ScrollTactil />
      <hemisphereLight args={['#fff4e2', '#3a2a1e', 0.55]} />
      <directionalLight
        position={[4, 7, 3]}
        intensity={2.2}
        color="#fff1dc"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-4}
        shadow-camera-right={4}
        shadow-camera-top={4}
        shadow-camera-bottom={-4}
        shadow-bias={-0.0004}
      />
      <directionalLight position={[-5, 3, -4]} intensity={0.6} color="#ffd6a8" />

      {/* Reflejos de estudio sin descargar ningún HDR */}
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={3} color="#fff6e8" position={[0, 6, 0]} rotation-x={Math.PI / 2} scale={[10, 4, 1]} />
        <Lightformer form="rect" intensity={1.6} color="#ffe2bf" position={[6, 2, 2]} rotation-y={-Math.PI / 2} scale={[6, 2, 1]} />
        <Lightformer form="rect" intensity={1.2} color="#ffffff" position={[-6, 2, -2]} rotation-y={Math.PI / 2} scale={[6, 2, 1]} />
        <Lightformer form="ring" intensity={1.5} color="#EE7D1F" position={[0, 1, -8]} scale={4} />
      </Environment>

      <Suspense fallback={null}>
        <Mehari color={color} techo={techo} flores={flores} />
        {/* compila shaders y sube texturas a la GPU nada más cargar, aunque la escena esté en pausa */}
        <Preload all />
      </Suspense>
      <ContactShadows position={[0, 0, 0]} opacity={0.55} scale={9} blur={2.6} far={2} resolution={512} color="#1a120c" />

      <OrbitControls
        makeDefault
        target={[0, 0.6, 0]}
        enablePan={false}
        enableZoom={false}
        minPolarAngle={0.9}
        maxPolarAngle={1.5}
        autoRotate
        autoRotateSpeed={0.55}
        enableDamping
        dampingFactor={0.06}
      />
    </Canvas>
  );
}
