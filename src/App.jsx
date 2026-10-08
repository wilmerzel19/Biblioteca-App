import { useEffect, useMemo, useState } from "react";
import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import {
  BookOpen, Library, Music2, Settings, Menu, X, Home, Presentation,
  Moon, Sun, RefreshCw, StickyNote, Headphones
} from "lucide-react";
import { loadAllData } from "./services/dataService";
import { saveSetting, getSetting } from "./services/storageService";
import Inicio from "./pages/Inicio";
import Biblia from "./pages/Biblia";
import Biblioteca from "./pages/Biblioteca";
import Himnos from "./pages/Himnos";
import Devocionales from "./pages/Devocionales";
import Presentacion from "./pages/Presentacion";
import Configuracion from "./pages/Configuracion";
import LecturasDiarias from "./pages/LecturasDiarias";


const menu = [
  { to: "/", label: "Inicio", icon: Home },
  { to: "/biblia", label: "Biblia", icon: BookOpen },
  { to: "/biblioteca", label: "Biblioteca", icon: Library },
  { to: "/himnos", label: "Celebremos su Gloria", icon: Music2 },
  { to: "/himnario-evangelio", label: "Himnos varios", icon: StickyNote },
  { to: "/himnos-coros", label: "Cantar Alegres", icon: Music2 },
  { to: "/lecturas-diarias", label: "Lecturas Diarias", icon: Headphones },
  { to: "/presentacion", label: "Presentación", icon: Presentation },
];

export default function App() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(() => getSetting("dark", false));
  const [theme, setTheme] = useState(() => getSetting("theme", "sanctuary"));
  const location = useLocation();

  const refresh = async () => {
    setLoading(true);
    try {
      setData(await loadAllData());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { refresh(); }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    saveSetting("dark", dark);
  }, [dark]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    saveSetting("theme", theme);
  }, [theme]);

  const title = useMemo(() => {
    const item = menu.find(x => x.to.split("?")[0] === location.pathname);
    return item?.label || "Mi Biblioteca";
  }, [location.pathname]);

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="brand">
          <div className="brand-logo"><BookOpen size={24}/></div>
          <div>
            <strong>Mi Biblioteca</strong>
            <span>Bíblica</span>
          </div>
          <button className="icon-btn mobile-close" onClick={() => setMobileOpen(false)}><X/></button>
        </div>

        <nav>
          {menu.map(({to, label, icon: Icon}) => (
            <NavLink key={to} to={to} end={to === "/"} onClick={() => setMobileOpen(false)}
              className={({isActive}) => `nav-item ${isActive ? "active" : ""}`}>
              <Icon size={19}/><span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <NavLink to="/configuracion" className="nav-item" onClick={() => setMobileOpen(false)}>
            <Settings size={19}/><span>Configuración</span>
          </NavLink>
        </div>
      </aside>

      {mobileOpen && <div className="overlay" onClick={() => setMobileOpen(false)} />}

      <main className="main">
        <header className="topbar">
          <button className="icon-btn mobile-menu" onClick={() => setMobileOpen(true)}><Menu/></button>
          <div className="top-search" style={{justifyContent:"flex-start"}}><strong>{title}</strong></div>
          <div className="top-actions">
            <button className="icon-btn" title="Recargar JSON" onClick={refresh}><RefreshCw size={19}/></button>
            <button className="icon-btn" title="Cambiar tema" onClick={() => setDark(v => !v)}>
              {dark ? <Sun size={19}/> : <Moon size={19}/>}
            </button>
          </div>
        </header>

        {loading ? (
          <div className="loading"><div className="spinner"/><p>Cargando biblioteca...</p></div>
        ) : (
          <div className="page">
            <Routes>
              <Route path="/" element={<Inicio data={data} />} />
              <Route path="/biblia" element={<Biblia data={data.biblia} />} />
              <Route path="/biblioteca" element={<Biblioteca data={data} />} />
              <Route path="/himnos" element={<Himnos data={data.himnos} audios={data.audiosHimnos} tituloSeccion="Celebremos su Gloria" tituloVacio="No hay himnos" archivoAyuda="public/data/himnos.json" />} />
              <Route path="/himnario-evangelio" element={<Himnos data={data.himnarioEvangelio} audios={data.audiosHimnarioEvangelio} tituloSeccion="Himnos varios" tituloVacio="No hay himnos en Himnario Evangelio" archivoAyuda="public/data/himnario-evangelio.json" />} />
              <Route path="/himnos-coros" element={<Himnos data={data.himnosCoros} audios={data.audiosHimnosCoros} tituloSeccion="Cantar Alegres" tituloVacio="Todavía no hay coros agregados" archivoAyuda="public/data/himnos-coros.json" />} />
              <Route path="/lecturas-diarias" element={<LecturasDiarias data={data.lecturasDiariasUnanimes} />} />
              <Route path="/devocionales" element={<Devocionales dataSemilla={data.buenasemillas} dataSenor={data.elSenorEstaCerca} />} />
              <Route path="/presentacion" element={<Presentacion data={data} />} />
              <Route path="/configuracion" element={<Configuracion data={data} onRefresh={refresh} theme={theme} setTheme={setTheme} dark={dark} setDark={setDark} />} />
            </Routes>
          </div>
        )}
      </main>
    </div>
  );
}