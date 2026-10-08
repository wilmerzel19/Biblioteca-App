import { Check, Moon, Sun, Sparkles } from "lucide-react";

const themes = [
  { id: "sanctuary", name: "Santuario", desc: "Verde profundo y dorado", icon: "✦" },
  { id: "parchment", name: "Pergamino", desc: "Cálido, clásico y bíblico", icon: "☼" },
  { id: "midnight", name: "Medianoche", desc: "Azul nocturno elegante", icon: "✧" },
  { id: "olive", name: "Olivo", desc: "Natural, sereno y moderno", icon: "❧" },
  { id: "royal", name: "Real", desc: "Púrpura y oro premium", icon: "♔" },
];

export default function Configuracion({ onRefresh, theme, setTheme, dark, setDark }) {
  return (
    <div className="settings settings-pro">
      <section className="theme-hero">
        <div className="theme-hero-glow" />
        <span className="theme-kicker"><Sparkles size={14}/> PERSONALIZA TU EXPERIENCIA</span>
        <h2>Haz tu biblioteca realmente tuya</h2>
        <p>Elige un ambiente visual. Cada tema transforma colores, fondos, tarjetas y lecturas con transiciones suaves.</p>
      </section>

      <section className="panel theme-panel">
        <div className="theme-heading"><div><h2>Temas visuales</h2><p>El cambio se aplica a todo el sistema.</p></div><div className="mode-switch"><button className={!dark ? "on" : ""} onClick={()=>setDark(false)}><Sun size={16}/> Claro</button><button className={dark ? "on" : ""} onClick={()=>setDark(true)}><Moon size={16}/> Oscuro</button></div></div>
        <div className="theme-grid">
          {themes.map(t => <button key={t.id} className={`theme-card theme-${t.id} ${theme===t.id ? "selected" : ""}`} onClick={()=>setTheme(t.id)}>
            <div className="theme-preview"><span className="theme-preview-orb">{t.icon}</span><i/><i/><i/></div>
            <div className="theme-card-copy"><strong>{t.name}</strong><small>{t.desc}</small></div>
            {theme===t.id && <span className="theme-check"><Check size={14}/></span>}
          </button>)}
        </div>
      </section>

      <section className="panel motion-panel"><div><h2>Movimiento sutil</h2><p>Las pantallas, tarjetas y botones ahora tienen animaciones suaves de entrada, elevación y brillo.</p></div><span className="motion-demo"><i/><i/><i/></span></section>
      <section className="panel"><h2>Contenido</h2><p>Recarga los archivos de la biblioteca cuando agregues nuevas lecturas o himnos.</p><button className="primary" onClick={onRefresh}>Recargar contenido</button></section>
    </div>
  );
}
