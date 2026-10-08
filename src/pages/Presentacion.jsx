import { useMemo, useState } from "react";
import { Maximize, X, Sparkles, Palette, Type, Play, RotateCcw } from "lucide-react";

const TEMAS = {
  noche: { nombre: "Noche elegante", bg: "linear-gradient(135deg,#08111f 0%,#152b46 52%,#0a1525 100%)", color: "#fff", accent: "#d8b26e" },
  cielo: { nombre: "Cielo", bg: "linear-gradient(135deg,#0f4c75 0%,#3282b8 52%,#bbe1fa 130%)", color: "#fff", accent: "#dff3ff" },
  calido: { nombre: "Cálido", bg: "linear-gradient(135deg,#4a2617 0%,#8a4b2b 55%,#d49a61 130%)", color: "#fff9ef", accent: "#ffd9a8" },
  purpura: { nombre: "Púrpura", bg: "linear-gradient(135deg,#21143d 0%,#583b8c 55%,#9d78d4 130%)", color: "#fff", accent: "#eadcff" },
  claro: { nombre: "Claro", bg: "linear-gradient(135deg,#fffdf7 0%,#f2ead9 100%)", color: "#273247", accent: "#896526" },
};

const PRESETS = [
  { id:"bienvenidos", label:"Bienvenidos", titulo:"¡BIENVENIDOS!", subtitulo:"Nos alegra tenerte con nosotros", anim:"entrada" },
  { id:"culto", label:"Inicio del culto", titulo:"BIENVENIDOS A LA CASA DEL SEÑOR", subtitulo:"Preparemos nuestro corazón para adorar", anim:"suave" },
  { id:"oracion", label:"Momento de oración", titulo:"MOMENTO DE ORACIÓN", subtitulo:"Acerquémonos confiadamente al trono de la gracia", anim:"respirar" },
  { id:"ofrenda", label:"Ofrendas", titulo:"TIEMPO DE OFRENDAS", subtitulo:"Cada uno dé como propuso en su corazón", anim:"suave" },
  { id:"despedida", label:"Despedida", titulo:"DIOS LES BENDIGA", subtitulo:"Gracias por acompañarnos", anim:"entrada" },
];

export default function Presentacion() {
  const [titulo, setTitulo] = useState("¡BIENVENIDOS!");
  const [subtitulo, setSubtitulo] = useState("Nos alegra tenerte con nosotros");
  const [full, setFull] = useState(false);
  const [tema, setTema] = useState("noche");
  const [animacion, setAnimacion] = useState("entrada");
  const [alineacion, setAlineacion] = useState("center");
  const [tamano, setTamano] = useState(100);
  const [mostrarLinea, setMostrarLinea] = useState(true);

  const temaActual = useMemo(() => TEMAS[tema] || TEMAS.noche, [tema]);

  const aplicarPreset = (p) => {
    setTitulo(p.titulo);
    setSubtitulo(p.subtitulo);
    setAnimacion(p.anim);
  };

  const start = () => {
    setFull(true);
    setTimeout(() => document.documentElement.requestFullscreen?.().catch(()=>{}), 50);
  };

  const close = () => {
    setFull(false);
    document.exitFullscreen?.().catch(()=>{});
  };

  return (
    <div className={full ? "presentation-pro full" : "presentation-pro"}>
      {!full ? (
        <>
          <div className="pp-head">
            <div>
              <span className="pp-kicker"><Sparkles size={15}/> PRESENTACIÓN VISUAL</span>
              <h2>Proyectar mensajes</h2>
              <p>Crea pantallas bonitas para bienvenida, oración, anuncios y otros momentos.</p>
            </div>
            <button className="primary" onClick={start}><Maximize size={17}/> Proyectar</button>
          </div>

          <div className="pp-layout">
            <section className="pp-panel">
              <h3>Plantillas rápidas</h3>
              <div className="pp-presets">
                {PRESETS.map(p => <button key={p.id} onClick={()=>aplicarPreset(p)}>{p.label}</button>)}
              </div>

              <label className="pp-label">Título principal</label>
              <input className="pp-input" value={titulo} onChange={e=>setTitulo(e.target.value)} placeholder="Ej. ¡Bienvenidos!" />

              <label className="pp-label">Texto secundario</label>
              <textarea className="pp-textarea" value={subtitulo} onChange={e=>setSubtitulo(e.target.value)} placeholder="Escribe un mensaje..." />

              <div className="pp-grid2">
                <div>
                  <label className="pp-label"><Palette size={14}/> Apariencia</label>
                  <select value={tema} onChange={e=>setTema(e.target.value)}>{Object.entries(TEMAS).map(([k,v])=><option key={k} value={k}>{v.nombre}</option>)}</select>
                </div>
                <div>
                  <label className="pp-label"><Play size={14}/> Animación</label>
                  <select value={animacion} onChange={e=>setAnimacion(e.target.value)}>
                    <option value="entrada">Entrada cinematográfica</option>
                    <option value="suave">Aparecer suave</option>
                    <option value="respirar">Respirar</option>
                    <option value="ninguna">Sin animación</option>
                  </select>
                </div>
              </div>

              <div className="pp-grid2">
                <div>
                  <label className="pp-label"><Type size={14}/> Tamaño {tamano}%</label>
                  <input type="range" min="70" max="150" value={tamano} onChange={e=>setTamano(Number(e.target.value))}/>
                </div>
                <div>
                  <label className="pp-label">Alineación</label>
                  <select value={alineacion} onChange={e=>setAlineacion(e.target.value)}>
                    <option value="center">Centro</option>
                    <option value="left">Izquierda</option>
                    <option value="right">Derecha</option>
                  </select>
                </div>
              </div>

              <label className="pp-check"><input type="checkbox" checked={mostrarLinea} onChange={e=>setMostrarLinea(e.target.checked)}/> Mostrar detalle decorativo</label>
              <button className="pp-reset" onClick={()=>{setTitulo("¡BIENVENIDOS!");setSubtitulo("Nos alegra tenerte con nosotros");setTema("noche");setAnimacion("entrada");setTamano(100);}}><RotateCcw size={15}/> Restablecer</button>
            </section>

            <section className="pp-preview-wrap">
              <div className={`pp-stage anim-${animacion}`} style={{background:temaActual.bg,color:temaActual.color,textAlign:alineacion}}>
                <div className="pp-glow"/>
                <div className="pp-stage-inner" style={{fontSize:`${tamano}%`}}>
                  <span className="pp-small">MI BIBLIOTECA BÍBLICA</span>
                  <h1>{titulo || "Escribe un título"}</h1>
                  {mostrarLinea && <div className="pp-line" style={{background:temaActual.accent}}/>}
                  <p>{subtitulo}</p>
                </div>
              </div>
              <small>Vista previa 16:9</small>
            </section>
          </div>
        </>
      ) : (
        <div className={`pp-stage pp-project anim-${animacion}`} style={{background:temaActual.bg,color:temaActual.color,textAlign:alineacion}}>
          <button className="presentation-close" onClick={close}><X/></button>
          
          <div className="pp-glow"/>
          <div className="pp-stage-inner" style={{fontSize:`${tamano}%`}}>
            <span className="pp-small">MI BIBLIOTECA BÍBLICA</span>
            <h1>{titulo || "Bienvenidos"}</h1>
            {mostrarLinea && <div className="pp-line" style={{background:temaActual.accent}}/>}
            <p>{subtitulo}</p>
          </div>
        </div>
      )}

      <style>{`
        .pp-head{display:flex;justify-content:space-between;gap:20px;align-items:center;margin-bottom:22px}.pp-head h2{margin:6px 0}.pp-head p{margin:0;color:#7b8494}.pp-kicker{display:flex;align-items:center;gap:7px;font-size:10px;font-weight:900;letter-spacing:.12em;color:#7b6a39}
        .pp-layout{display:grid;grid-template-columns:390px 1fr;gap:22px}.pp-panel{background:#fff;border:1px solid #e5e9ef;border-radius:18px;padding:20px}.pp-panel h3{margin:0 0 14px}.pp-presets{display:flex;flex-wrap:wrap;gap:7px;margin-bottom:18px}.pp-presets button{border:1px solid #dfe5ed;background:#f8fafc;border-radius:20px;padding:7px 10px;font-size:11px}.pp-presets button:hover{border-color:#b79a5c;background:#fffaf0}.pp-label{display:flex;align-items:center;gap:6px;font-size:11px;font-weight:800;color:#667085;margin:13px 0 6px}.pp-input,.pp-textarea,.pp-panel select{width:100%;border:1px solid #dfe5ed;border-radius:10px;padding:10px 11px;background:#fff;color:inherit}.pp-textarea{min-height:90px;resize:vertical}.pp-grid2{display:grid;grid-template-columns:1fr 1fr;gap:10px}.pp-panel input[type=range]{width:100%}.pp-check{display:flex;align-items:center;gap:8px;font-size:12px;margin:16px 0}.pp-reset{border:0;background:#f3f5f8;color:#596273;border-radius:9px;padding:9px 11px;display:flex;gap:7px;align-items:center}
        .pp-preview-wrap{min-width:0}.pp-preview-wrap>small{display:block;text-align:center;margin-top:8px;color:#98a2b3}.pp-stage{aspect-ratio:16/9;border-radius:18px;overflow:hidden;position:relative;display:flex;align-items:center;justify-content:center;box-shadow:0 14px 40px #10182820}.pp-project{position:fixed;inset:0;z-index:1000;border-radius:0;aspect-ratio:auto}.pp-stage-inner{position:relative;z-index:2;width:80%;padding:40px}.pp-small{font-size:.72em;letter-spacing:.28em;font-weight:700;opacity:.7}.pp-stage h1{font-family:Georgia,"Times New Roman",serif;font-size:4em;line-height:1.02;letter-spacing:.02em;margin:.22em 0;text-wrap:balance;text-shadow:0 3px 22px #00000030}.pp-stage p{font-size:1.35em;line-height:1.45;margin:.7em 0 0;opacity:.92}.pp-line{width:90px;height:3px;border-radius:10px;margin:18px auto}.pp-stage[style*="text-align: left"] .pp-line{margin-left:0}.pp-stage[style*="text-align: right"] .pp-line{margin-right:0}.pp-glow{position:absolute;width:55%;height:80%;border-radius:50%;background:#ffffff12;filter:blur(50px);right:-10%;top:-25%}
        .anim-entrada .pp-stage-inner{animation:ppEntrance .9s cubic-bezier(.2,.7,.2,1) both}.anim-suave .pp-stage-inner{animation:ppFade 1.2s ease both}.anim-respirar .pp-stage-inner{animation:ppBreath 3s ease-in-out infinite}.anim-ninguna .pp-stage-inner{animation:none}@keyframes ppEntrance{from{opacity:0;transform:translateY(35px) scale(.97);filter:blur(8px)}to{opacity:1;transform:none;filter:none}}@keyframes ppFade{from{opacity:0}to{opacity:1}}@keyframes ppBreath{0%,100%{transform:scale(1)}50%{transform:scale(1.018)}}
        html.dark .pp-panel{background:#141d2d;border-color:#263248}html.dark .pp-input,html.dark .pp-textarea,html.dark .pp-panel select{background:#101827;border-color:#2a364c;color:#fff}
        @media(max-width:950px){.pp-layout{grid-template-columns:1fr}.pp-preview-wrap{order:-1}}@media(max-width:600px){.pp-head{align-items:flex-start;flex-direction:column}.pp-grid2{grid-template-columns:1fr}.pp-stage h1{font-size:2.5em}.pp-stage p{font-size:1em}.pp-stage-inner{width:92%;padding:20px}}
      `}</style>
    </div>
  );
}
