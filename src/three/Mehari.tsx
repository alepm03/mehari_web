/*
  Citroën Méhari modelado por código (unidades en metros, el coche mira hacia +X).
  Proporciones reales aproximadas: 3,5 m de largo, 1,53 m de ancho, batalla 2,4 m.
  Cuando haya un modelo GLB real, se sustituye este componente y se mantienen las props.
*/
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

export type ColorCoche = 'naranja' | 'beige';
export type Techo = 'abierto' | 'semiabierto' | 'cerrado';

const PINTURA: Record<ColorCoche, string> = { naranja: '#EE7D1F', beige: '#DCC6A0' };

const ANCHO = 0.76; // mitad del ancho de carrocería
const RUEDA_R = 0.3;
const EJE_X = 1.2;

/** Textura de franjas para las costillas de la chapa (se usa como bumpMap). */
function texturaCostillas(repeticiones: number) {
  const c = document.createElement('canvas');
  c.width = 4;
  c.height = 64;
  const g = c.getContext('2d')!;
  const grad = g.createLinearGradient(0, 0, 0, 64);
  grad.addColorStop(0, '#000');
  grad.addColorStop(0.3, '#fff');
  grad.addColorStop(0.62, '#fff');
  grad.addColorStop(0.85, '#000');
  grad.addColorStop(1, '#000');
  g.fillStyle = grad;
  g.fillRect(0, 0, 4, 64);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(1, repeticiones);
  return t;
}

/** Trenzado de mimbre para las cestas. */
function texturaMimbre() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d')!;
  g.fillStyle = '#9c6b34';
  g.fillRect(0, 0, 64, 64);
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      g.fillStyle = (x + y) % 2 ? '#c99556' : '#b07b3e';
      g.beginPath();
      g.ellipse(x * 8 + 4, y * 8 + 4, 3.6, 2.4, (x + y) % 2 ? 0 : Math.PI / 2, 0, Math.PI * 2);
      g.fill();
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(3, 2);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** Silueta lateral: capó, hueco de puerta y pasos de rueda. */
function siluetaLateral() {
  const s = new THREE.Shape();
  const arco = 0.38;
  s.moveTo(1.72, 0.36);
  s.lineTo(1.75, 0.8);
  s.quadraticCurveTo(1.74, 0.84, 1.68, 0.845);
  s.lineTo(0.72, 0.9);
  // hueco de la puerta (el Méhari no tiene puertas)
  s.bezierCurveTo(0.6, 0.9, 0.62, 0.64, 0.42, 0.64);
  s.lineTo(-0.38, 0.64);
  s.bezierCurveTo(-0.58, 0.64, -0.56, 0.95, -0.7, 0.95);
  s.lineTo(-1.7, 0.95);
  s.quadraticCurveTo(-1.75, 0.95, -1.75, 0.9);
  s.lineTo(-1.75, 0.36);
  // paso de rueda trasero
  s.lineTo(-EJE_X - arco, 0.36);
  s.absarc(-EJE_X, 0.3, arco, Math.PI - 0.16, 0.16, true);
  s.lineTo(EJE_X - arco, 0.36);
  // paso de rueda delantero
  s.absarc(EJE_X, 0.3, arco, Math.PI - 0.16, 0.16, true);
  s.lineTo(1.72, 0.36);
  return s;
}

function Rueda({ x, z }: { x: number; z: number }) {
  const lado = Math.sign(z);
  const neumatico = useMemo(() => {
    // perfil redondeado del neumático
    const pts: THREE.Vector2[] = [];
    for (let i = 0; i <= 16; i++) {
      const a = (i / 16) * Math.PI;
      pts.push(new THREE.Vector2(RUEDA_R - 0.06 + Math.sin(a) * 0.06, -0.085 + (i / 16) * 0.17));
    }
    return new THREE.LatheGeometry(pts, 40);
  }, []);
  return (
    <group position={[x, RUEDA_R, z]} rotation={[Math.PI / 2, 0, 0]}>
      <mesh geometry={neumatico} castShadow>
        <meshStandardMaterial color="#1d1a18" roughness={0.92} />
      </mesh>
      <mesh position={[0, lado * 0.005, 0]}>
        <cylinderGeometry args={[RUEDA_R - 0.055, RUEDA_R - 0.055, 0.15, 36]} />
        <meshStandardMaterial color="#1d1a18" roughness={0.9} />
      </mesh>
      {/* llanta de chapa pintada */}
      <mesh position={[0, lado * 0.06, 0]}>
        <cylinderGeometry args={[0.175, 0.185, 0.05, 36]} />
        <meshStandardMaterial color="#e9e1cf" roughness={0.45} metalness={0.2} />
      </mesh>
      <mesh position={[0, lado * 0.085, 0]}>
        <cylinderGeometry args={[0.07, 0.08, 0.03, 24]} />
        <meshStandardMaterial color="#cfc6b3" roughness={0.35} metalness={0.5} />
      </mesh>
      {[0, 1, 2].map((k) => (
        <mesh key={k} position={[Math.cos((k * Math.PI * 2) / 3) * 0.11, lado * 0.088, Math.sin((k * Math.PI * 2) / 3) * 0.11]}>
          <cylinderGeometry args={[0.014, 0.014, 0.02, 10]} />
          <meshStandardMaterial color="#8d8576" metalness={0.6} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function Faro({ z }: { z: number }) {
  return (
    <group position={[1.765, 0.69, z]} rotation={[0, 0, -Math.PI / 2]}>
      <mesh>
        <cylinderGeometry args={[0.09, 0.095, 0.05, 32]} />
        <meshStandardMaterial color="#d9d6d0" metalness={0.9} roughness={0.15} />
      </mesh>
      <mesh position={[0, 0.028, 0]}>
        <sphereGeometry args={[0.078, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2.6]} />
        <meshPhysicalMaterial color="#fffaf0" emissive="#fff3d6" emissiveIntensity={0.35} roughness={0.05} transmission={0.4} thickness={0.1} />
      </mesh>
    </group>
  );
}

const SEMILLA = (n: number) => {
  const x = Math.sin(n * 127.1) * 43758.5453;
  return x - Math.floor(x);
};

function Flores({ visibles }: { visibles: boolean }) {
  const grupo = useRef<THREE.Group>(null);
  const piezas = useMemo(() => {
    const colores = ['#FFFCF5', '#F7F1E6', '#F4C7A1', '#EE7D1F', '#FFFCF5', '#E9B7B0'];
    const out: { p: [number, number, number]; r: number; c: string; hoja: boolean }[] = [];
    for (const zc of [-0.33, 0.33]) {
      for (let i = 0; i < 26; i++) {
        const hoja = i % 3 === 0;
        out.push({
          p: [-1.38 + (SEMILLA(i + zc * 10) - 0.5) * 0.36, 0.86 + SEMILLA(i * 3.1 + zc) * 0.16, zc + (SEMILLA(i * 7.7 + zc) - 0.5) * 0.48],
          r: hoja ? 0.05 + SEMILLA(i) * 0.03 : 0.045 + SEMILLA(i * 2.3) * 0.035,
          c: hoja ? (i % 2 ? '#55703F' : '#6f8a52') : colores[i % colores.length],
          hoja,
        });
      }
    }
    return out;
  }, []);

  useFrame((_, dt) => {
    if (!grupo.current) return;
    const s = grupo.current.scale.y;
    const objetivo = visibles ? 1 : 0.0001;
    grupo.current.scale.setScalar(THREE.MathUtils.damp(s, objetivo, 6, dt));
    grupo.current.visible = grupo.current.scale.y > 0.01;
  });

  return (
    <group ref={grupo} position={[-1.38, 0.8, 0]}>
      <group position={[1.38, -0.8, 0]}>
        {piezas.map((f, i) => (
          <mesh key={i} position={f.p} scale={f.hoja ? [1.6, 0.5, 0.9] : [1, 0.8, 1]} rotation={[SEMILLA(i) * 3, SEMILLA(i * 5) * 3, 0]} castShadow>
            <sphereGeometry args={[f.r, 14, 10]} />
            <meshStandardMaterial color={f.c} roughness={0.75} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export function Mehari({ color, techo, flores }: { color: ColorCoche; techo: Techo; flores: boolean }) {
  const ribLateral = useMemo(() => texturaCostillas(16), []);
  const ribCapo = useMemo(() => texturaCostillas(22), []);
  const mimbre = useMemo(() => texturaMimbre(), []);
  const silueta = useMemo(
    () => new THREE.ExtrudeGeometry(siluetaLateral(), { depth: 0.035, bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.012, bevelSegments: 3, curveSegments: 28 }),
    [],
  );

  // Un solo material de pintura compartido: así el cambio de color es un fundido suave.
  const pintura = useMemo(
    () => new THREE.MeshPhysicalMaterial({ color: PINTURA.naranja, roughness: 0.42, clearcoat: 0.55, clearcoatRoughness: 0.35, bumpMap: ribLateral, bumpScale: 2.2 }),
    [ribLateral],
  );
  const pinturaCapo = useMemo(
    () => new THREE.MeshPhysicalMaterial({ color: PINTURA.naranja, roughness: 0.42, clearcoat: 0.55, clearcoatRoughness: 0.35, bumpMap: ribCapo, bumpScale: 1.6 }),
    [ribCapo],
  );
  const pinturaLisa = useMemo(() => new THREE.MeshPhysicalMaterial({ color: PINTURA.naranja, roughness: 0.45, clearcoat: 0.4 }), []);
  const lona = useMemo(() => new THREE.MeshStandardMaterial({ color: '#2b2622', roughness: 0.95, side: THREE.DoubleSide }), []);
  const metalOscuro = useMemo(() => new THREE.MeshStandardMaterial({ color: '#3a3532', roughness: 0.4, metalness: 0.7 }), []);
  const asiento = useMemo(() => new THREE.MeshStandardMaterial({ color: '#221d1a', roughness: 0.6 }), []);

  const objetivoColor = useMemo(() => new THREE.Color(PINTURA[color]), [color]);

  const capota = useRef<THREE.Group>(null);
  const rollo = useRef<THREE.Mesh>(null);
  const trasera = useRef<THREE.Mesh>(null);
  const techoSolar = useRef<THREE.Mesh>(null);

  const largoCapota = techo === 'cerrado' ? 2.3 : techo === 'semiabierto' ? 1.12 : 0.001;

  useFrame((_, dt) => {
    for (const m of [pintura, pinturaCapo, pinturaLisa]) m.color.lerp(objetivoColor, 1 - Math.exp(-5 * dt));
    if (capota.current) {
      const s = THREE.MathUtils.damp(capota.current.scale.x, largoCapota, 4.5, dt);
      capota.current.scale.x = s;
      capota.current.visible = s > 0.02;
      if (rollo.current) {
        // la capota recogida forma un rollo al final de la lona; en «abierto» queda atrás, más baja
        const abierto = s < 0.05;
        const xr = abierto ? -1.58 : 0.62 - s - 0.04;
        const yr = abierto ? 1.0 : 1.43;
        rollo.current.position.x = THREE.MathUtils.damp(rollo.current.position.x, xr, 5, dt);
        rollo.current.position.y = THREE.MathUtils.damp(rollo.current.position.y, yr, 5, dt);
      }
    }
    if (trasera.current) {
      const objetivo = techo === 'cerrado' ? 1 : 0.0001;
      trasera.current.scale.y = THREE.MathUtils.damp(trasera.current.scale.y, objetivo, 5, dt);
      trasera.current.visible = trasera.current.scale.y > 0.02;
    }
    if (techoSolar.current) techoSolar.current.visible = techo === 'cerrado' && (capota.current?.scale.x ?? 0) > 2;
  });

  const tubo = (desde: [number, number, number], hasta: [number, number, number], r = 0.018) => {
    const a = new THREE.Vector3(...desde);
    const b = new THREE.Vector3(...hasta);
    const medio = a.clone().add(b).multiplyScalar(0.5);
    const dir = b.clone().sub(a);
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
    return (
      <mesh position={medio} quaternion={q} material={metalOscuro} castShadow>
        <cylinderGeometry args={[r, r, dir.length(), 10]} />
      </mesh>
    );
  };

  return (
    <group position={[0, 0, 0]}>
      {/* Laterales con costillas */}
      <mesh geometry={silueta} material={pintura} position={[0, 0, ANCHO - 0.035]} castShadow receiveShadow />
      <mesh geometry={silueta} material={pintura} position={[0, 0, -ANCHO]} castShadow receiveShadow />

      {/* Capó con costillas longitudinales, ligeramente inclinado hacia delante */}
      <mesh material={pinturaCapo} position={[1.2, 0.87, 0]} rotation={[0, 0, -0.045]} castShadow>
        <boxGeometry args={[1.04, 0.035, ANCHO * 2 - 0.02]} />
      </mesh>
      {/* Frontal */}
      <mesh material={pinturaLisa} position={[1.735, 0.6, 0]} castShadow>
        <boxGeometry args={[0.05, 0.5, ANCHO * 2 - 0.04]} />
      </mesh>
      {/* Rejilla */}
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh key={i} position={[1.763, 0.5 + i * 0.045, 0]}>
          <boxGeometry args={[0.01, 0.018, 0.6]} />
          <meshStandardMaterial color="#1c1917" roughness={0.6} />
        </mesh>
      ))}
      {/* Chevrones de Citroën */}
      {[0, 1].map((i) => (
        <group key={i} position={[1.764, 0.76 + i * 0.035, 0]}>
          <mesh position={[0, 0, 0.045]} rotation={[0.5, 0, 0]}>
            <boxGeometry args={[0.008, 0.012, 0.1]} />
            <meshStandardMaterial color="#e9e4d8" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0, -0.045]} rotation={[-0.5, 0, 0]}>
            <boxGeometry args={[0.008, 0.012, 0.1]} />
            <meshStandardMaterial color="#e9e4d8" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      ))}
      <Faro z={0.52} />
      <Faro z={-0.52} />

      {/* Paragolpes */}
      <mesh material={metalOscuro} position={[1.8, 0.4, 0]} castShadow>
        <boxGeometry args={[0.06, 0.07, ANCHO * 2 + 0.02]} />
      </mesh>
      <mesh material={metalOscuro} position={[-1.8, 0.4, 0]} castShadow>
        <boxGeometry args={[0.06, 0.07, ANCHO * 2 + 0.02]} />
      </mesh>

      {/* Trasera y pilotos */}
      <mesh material={pinturaLisa} position={[-1.735, 0.66, 0]} castShadow>
        <boxGeometry args={[0.05, 0.58, ANCHO * 2 - 0.04]} />
      </mesh>
      {[0.58, -0.58].map((z) => (
        <mesh key={z} position={[-1.765, 0.6, z]}>
          <boxGeometry args={[0.02, 0.09, 0.07]} />
          <meshStandardMaterial color="#a8251a" emissive="#5a0f08" roughness={0.3} />
        </mesh>
      ))}

      {/* Suelo, pasos de rueda interiores y bajos */}
      <mesh position={[0, 0.37, 0]} receiveShadow>
        <boxGeometry args={[3.42, 0.05, 1.0]} />
        <meshStandardMaterial color="#1f1b18" roughness={0.9} />
      </mesh>
      {[EJE_X, -EJE_X].map((x) =>
        [0.55, -0.55].map((z) => (
          <mesh key={`${x}${z}`} position={[x, 0.62, z]} material={pinturaLisa}>
            <boxGeometry args={[0.78, 0.5, 0.03]} />
          </mesh>
        )),
      )}

      {/* Salpicadero del color de la carrocería, volante y columna */}
      <mesh material={pinturaLisa} position={[0.58, 0.86, 0]} castShadow>
        <boxGeometry args={[0.28, 0.16, ANCHO * 2 - 0.08]} />
      </mesh>
      <group position={[0.36, 1.0, -0.36]} rotation={[0, Math.PI / 2, 0.55]}>
        <mesh rotation={[0, 0, 0]}>
          <torusGeometry args={[0.17, 0.014, 10, 40]} />
          <meshStandardMaterial color="#141210" roughness={0.5} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[0.34, 0.018, 0.01]} />
          <meshStandardMaterial color="#141210" roughness={0.5} />
        </mesh>
      </group>
      {tubo([0.36, 1.0, -0.36], [0.58, 0.82, -0.36], 0.016)}

      {/* Asientos */}
      {[0.36, -0.36].map((z) => (
        <group key={z} position={[0.02, 0, z]}>
          <mesh material={asiento} position={[0, 0.55, 0]} castShadow>
            <boxGeometry args={[0.46, 0.13, 0.52]} />
          </mesh>
          <mesh material={asiento} position={[-0.24, 0.84, 0]} rotation={[0, 0, -0.16]} castShadow>
            <boxGeometry args={[0.1, 0.52, 0.52]} />
          </mesh>
        </group>
      ))}
      <mesh material={asiento} position={[-0.78, 0.56, 0]} castShadow>
        <boxGeometry args={[0.46, 0.13, 1.22]} />
      </mesh>
      <mesh material={asiento} position={[-1.02, 0.84, 0]} rotation={[0, 0, -0.14]} castShadow>
        <boxGeometry args={[0.1, 0.5, 1.22]} />
      </mesh>

      {/* Cestas de mimbre */}
      {[0.33, -0.33].map((z) => (
        <mesh key={z} position={[-1.38, 0.78, z]} castShadow>
          <boxGeometry args={[0.42, 0.24, 0.56]} />
          <meshStandardMaterial map={mimbre} roughness={0.85} />
        </mesh>
      ))}
      <Flores visibles={flores} />

      {/* Parabrisas */}
      <group position={[0.66, 0.9, 0]} rotation={[0, 0, 0.16]}>
        {tubo([0, 0, ANCHO - 0.04], [0, 0.48, ANCHO - 0.04], 0.022)}
        {tubo([0, 0, -ANCHO + 0.04], [0, 0.48, -ANCHO + 0.04], 0.022)}
        {tubo([0, 0.48, ANCHO - 0.04], [0, 0.48, -ANCHO + 0.04], 0.022)}
        <mesh position={[0, 0.24, 0]}>
          <boxGeometry args={[0.008, 0.44, ANCHO * 2 - 0.12]} />
          <meshPhysicalMaterial color="#cfe3ea" transparent opacity={0.18} roughness={0.02} metalness={0.1} />
        </mesh>
      </group>

      {/* Arcos de la capota */}
      {[-0.28, -1.62].map((x) => (
        <group key={x}>
          {tubo([x, 0.92, ANCHO - 0.03], [x, 1.42, ANCHO - 0.03])}
          {tubo([x, 0.92, -ANCHO + 0.03], [x, 1.42, -ANCHO + 0.03])}
          {tubo([x, 1.42, ANCHO - 0.03], [x, 1.42, -ANCHO + 0.03])}
        </group>
      ))}
      {tubo([0.58, 1.37, ANCHO - 0.03], [-1.62, 1.42, ANCHO - 0.03], 0.014)}
      {tubo([0.58, 1.37, -ANCHO + 0.03], [-1.62, 1.42, -ANCHO + 0.03], 0.014)}

      {/* Lona: crece desde el parabrisas hacia atrás según la configuración */}
      <group ref={capota} position={[0.62, 1.43, 0]} scale={[largoCapota, 1, 1]}>
        <mesh material={lona} position={[-0.5, 0, 0]} castShadow>
          <boxGeometry args={[1, 0.025, ANCHO * 2 + 0.03]} />
        </mesh>
        <mesh ref={techoSolar} position={[-0.42, 0.016, 0]}>
          <boxGeometry args={[0.24, 0.006, 0.7]} />
          <meshStandardMaterial color="#5b544e" roughness={0.4} metalness={0.2} />
        </mesh>
      </group>
      <mesh ref={rollo} material={lona} position={[0.62 - largoCapota - 0.04, 1.43, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.06, ANCHO * 2, 20]} />
      </mesh>
      <mesh ref={trasera} material={lona} position={[-1.66, 1.19, 0]} scale={[1, 0.0001, 1]}>
        <boxGeometry args={[0.02, 0.48, ANCHO * 2 + 0.02]} />
      </mesh>

      {/* Ruedas */}
      <Rueda x={EJE_X} z={0.66} />
      <Rueda x={EJE_X} z={-0.66} />
      <Rueda x={-EJE_X} z={0.66} />
      <Rueda x={-EJE_X} z={-0.66} />
    </group>
  );
}
