import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

export type Idioma = 'es' | 'en';
export type Texto = { es: string; en: string };

interface Contexto {
  idioma: Idioma;
  setIdioma: (i: Idioma) => void;
  t: (texto: Texto) => string;
}

const Ctx = createContext<Contexto | null>(null);

export function ProveedorSitio({ children }: { children: ReactNode }) {
  const [idioma, setIdioma] = useState<Idioma>(() =>
    typeof navigator !== 'undefined' && !navigator.language.startsWith('es') ? 'en' : 'es',
  );

  const valor = useMemo<Contexto>(
    () => ({
      idioma,
      setIdioma: (i) => {
        setIdioma(i);
        document.documentElement.lang = i;
      },
      t: (texto) => texto[idioma],
    }),
    [idioma],
  );

  return <Ctx.Provider value={valor}>{children}</Ctx.Provider>;
}

export function useSitio() {
  const c = useContext(Ctx);
  if (!c) throw new Error('useSitio fuera de ProveedorSitio');
  return c;
}
