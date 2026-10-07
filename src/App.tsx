import { useCallback, useState } from 'react';
import { BotonFlotante, Contacto, Pie, Preguntas, SelectorMarca } from './components/Cierre';
import { ElDia } from './components/ElDia';
import { Galeria } from './components/Galeria';
import { Hero } from './components/Hero';
import { Intro } from './components/Intro';
import { Manifiesto } from './components/Manifiesto';
import { Nav } from './components/Nav';
import { Prensa } from './components/Prensa';
import { SevillaExperience } from './components/SevillaExperience';
import { Taller } from './components/Taller';
import { useScrollSuave } from './hooks/scroll';
import { ProveedorSitio } from './i18n/contexto';

function Pagina() {
  const [listo, setListo] = useState(false);
  const alTerminar = useCallback(() => setListo(true), []);
  useScrollSuave();

  return (
    <div className="grano">
      <Intro alTerminar={alTerminar} />
      <Nav />
      <main>
        <Hero listo={listo} />
        <Manifiesto />
        <ElDia />
        <Taller />
        <Prensa />
        <SevillaExperience />
        <Galeria />
        <Preguntas />
        <Contacto />
      </main>
      <Pie />
      <BotonFlotante />
      <SelectorMarca />
    </div>
  );
}

export default function App() {
  return (
    <ProveedorSitio>
      <Pagina />
    </ProveedorSitio>
  );
}
