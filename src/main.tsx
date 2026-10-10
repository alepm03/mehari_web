import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { empezarArriba } from './hooks/scroll';
import './index.css';

empezarArriba();

createRoot(document.getElementById('root')!).render(<App />);
