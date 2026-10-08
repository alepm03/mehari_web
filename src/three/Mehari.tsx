/*
  Citroën Méhari a partir del modelo GLB retocado en Blender (unidades en metros, el coche mira hacia +X,
  apoyado en y = 0 y centrado en el origen).

  Nodos del GLB:
    Carroceria        coche completo (siempre visible)
    Parabrisas        cristal transparente
    Capota_Delantera  lona sobre los asientos delanteros (pivote en el parabrisas)
    Capota_Trasera    lona de la parte trasera (pivote en el arco central)
    Barras_Techo      largueros y arcos que se ven sin lona
    Flores            cestas de mimbre con flores (pivote en la base)

  El GLB trae la pintura naranja; el beige es una segunda textura que se funde en el shader,
  así el cambio de color es un fundido suave sin cargar otro modelo.
*/
import { useGLTF, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useLayoutEffect, useMemo } from 'react';
import * as THREE from 'three';

export type ColorCoche = 'naranja' | 'beige';
export type Techo = 'abierto' | 'semiabierto' | 'cerrado';

const MODELO = '/modelos/mehari.glb';
const TEXTURA_BEIGE = '/modelos/mehari_beige.jpg';
const DRACO = '/draco/';

/** Mezcla la textura naranja del GLB con la beige según `mezcla` (0 = naranja, 1 = beige). */
function prepararPintura(mat: THREE.MeshStandardMaterial, beige: THREE.Texture) {
  const uniformes = { mapBeige: { value: beige }, mezcla: { value: 0 } };
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.mapBeige = uniformes.mapBeige;
    shader.uniforms.mezcla = uniformes.mezcla;
    shader.fragmentShader =
      'uniform sampler2D mapBeige;\nuniform float mezcla;\n' +
      shader.fragmentShader.replace(
        '#include <map_fragment>',
        `#ifdef USE_MAP
          vec4 sampledDiffuseColor = mix( texture2D( map, vMapUv ), texture2D( mapBeige, vMapUv ), mezcla );
          diffuseColor *= sampledDiffuseColor;
        #endif`,
      );
  };
  mat.customProgramCacheKey = () => 'mehari-pintura-mezcla';
  mat.needsUpdate = true;
  return uniformes;
}

export function Mehari({ color, techo, flores }: { color: ColorCoche; techo: Techo; flores: boolean }) {
  const { scene } = useGLTF(MODELO, DRACO) as unknown as { scene: THREE.Group };
  const beige = useTexture(TEXTURA_BEIGE);

  const piezas = useMemo(() => {
    const nodo = (nombre: string) => {
      const o = scene.getObjectByName(nombre);
      if (!o) throw new Error(`El modelo del Méhari no tiene el nodo «${nombre}»`);
      return o;
    };
    return {
      capotaDelantera: nodo('Capota_Delantera'),
      capotaTrasera: nodo('Capota_Trasera'),
      barras: nodo('Barras_Techo'),
      flores: nodo('Flores'),
    };
  }, [scene]);

  const pintura = useMemo(() => {
    // glTF no voltea las UV: la textura extra tiene que ir igual que las del GLB
    beige.flipY = false;
    beige.colorSpace = THREE.SRGBColorSpace;
    beige.needsUpdate = true;
    let mat: THREE.MeshStandardMaterial | null = null;
    scene.traverse((o) => {
      const m = (o as THREE.Mesh).material as THREE.MeshStandardMaterial | undefined;
      if (m && m.name === 'Mehari_Pintura') mat = m;
    });
    if (!mat) throw new Error('El modelo del Méhari no tiene el material «Mehari_Pintura»');
    const pinturaMat = mat as THREE.MeshStandardMaterial;
    // filtrado anisótropo: mantiene nítida la chapa en ángulos rasantes
    for (const t of [pinturaMat.map, pinturaMat.normalMap, pinturaMat.roughnessMap, beige]) if (t) t.anisotropy = 8;
    return prepararPintura(pinturaMat, beige);
  }, [scene, beige]);

  useLayoutEffect(() => {
    scene.traverse((o) => {
      const malla = o as THREE.Mesh;
      if (!malla.isMesh) return;
      const cristal = (malla.material as THREE.Material).name === 'Cristal';
      malla.castShadow = !cristal;
      malla.receiveShadow = !cristal;
    });
  }, [scene]);

  // Estado inicial sin animación al montar (p. ej. «semiabierto» con flores).
  useLayoutEffect(() => {
    pintura.mezcla.value = color === 'beige' ? 1 : 0;
    piezas.capotaDelantera.scale.x = techo === 'abierto' ? 0.0001 : 1;
    piezas.capotaTrasera.scale.x = techo === 'cerrado' ? 1 : 0.0001;
    piezas.flores.scale.setScalar(flores ? 1 : 0.0001);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [piezas, pintura]);

  useFrame((_, dt) => {
    const d = Math.min(dt, 0.1);

    // Color: fundido entre las dos texturas
    pintura.mezcla.value = THREE.MathUtils.damp(pintura.mezcla.value, color === 'beige' ? 1 : 0, 5, d);

    // Techo: la lona se despliega desde el parabrisas (delantera) y desde el arco central (trasera)
    const { capotaDelantera: del, capotaTrasera: tra, barras, flores: cestas } = piezas;
    del.scale.x = THREE.MathUtils.damp(del.scale.x, techo === 'abierto' ? 0.0001 : 1, 5, d);
    del.visible = del.scale.x > 0.02;
    const objetivoTrasera = techo === 'cerrado' ? 1 : 0.0001;
    // la trasera espera a que la delantera esté casi desplegada, como al montar la lona de verdad
    const listaDelantera = del.scale.x > 0.85 || objetivoTrasera < 0.5;
    tra.scale.x = THREE.MathUtils.damp(tra.scale.x, listaDelantera ? objetivoTrasera : 0.0001, 5, d);
    tra.visible = tra.scale.x > 0.02;
    // los largueros quedan tapados por la lona cuando el techo está cerrado del todo
    barras.visible = tra.scale.x < 0.97;

    // Cestas con flores: crecen desde la base
    const s = THREE.MathUtils.damp(cestas.scale.y, flores ? 1 : 0.0001, 6, d);
    cestas.scale.setScalar(s);
    cestas.visible = s > 0.01;
  });

  return <primitive object={scene} />;
}

useGLTF.preload(MODELO, DRACO);
useTexture.preload(TEXTURA_BEIGE);
