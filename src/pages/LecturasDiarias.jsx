import { useEffect, useMemo, useRef, useState } from "react";
import { Headphones, Search, Play, Pause, Download, ExternalLink, CalendarDays } from "lucide-react";

function limpiarDescripcion(valor) {
  return String(valor || "")
    .replace(/No se pudo cargar el reproductor\.?/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

export default function LecturasDiarias({ data = [] }) {
  const [audiosFallback, setAudiosFallback] = useState([]);
  const audios = Array.isArray(data) && data.length ? data : audiosFallback;

  useEffect(() => {
    if (Array.isArray(data) && data.length) return;
    let activo = true;
    fetch("/data/audios.json", { cache: "no-store" })
      .then(r => r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`)))
      .then(json => { if (activo && Array.isArray(json)) setAudiosFallback(json); })
      .catch(err => console.warn("No se pudieron cargar las lecturas diarias:", err.message));
    return () => { activo = false; };
  }, [data]);
  const [busqueda, setBusqueda] = useState("");
  const [actual, setActual] = useState(null);
  const [reproduciendo, setReproduciendo] = useState(false);
  const audioRef = useRef(null);

  const resultados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    if (!q) return audios;
    return audios.filter((item) =>
      `${item.titulo || ""} ${item.fecha || ""} ${item.descripcion || ""}`.toLowerCase().includes(q)
    );
  }, [audios, busqueda]);

  const reproducir = (item) => {
    if (!item?.audio) return;
    setActual(item);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.load();
        audioRef.current.play().catch(() => {});
      }
    }, 0);
  };

  return (
    <div className="unanimes-page">
      <div className="unanimes-hero">
        <div>
          <span className="unanimes-kicker"><Headphones size={16}/> DEVOCIONALES EN AUDIO</span>
          <h1>Lecturas Diarias de Unánimes</h1>
          <p>Reflexiones cristianas en audio para escuchar directamente desde tu biblioteca.</p>
        </div>
        <div className="unanimes-count">
          <strong>{audios.length}</strong>
          <span>audios disponibles</span>
        </div>
      </div>

      <div className="unanimes-search">
        <Search size={19}/>
        <input value={busqueda} onChange={(e)=>setBusqueda(e.target.value)} placeholder="Buscar lectura por título, fecha o tema..." />
      </div>

      {actual && (
        <div className="unanimes-player">
          <div className="unanimes-player-icon"><Headphones size={24}/></div>
          <div className="unanimes-player-info">
            <small>REPRODUCIENDO</small>
            <strong>{actual.titulo}</strong>
            <span>{actual.fecha}</span>
          </div>
          <audio ref={audioRef} src={actual.audio} controls autoPlay onPlay={()=>setReproduciendo(true)} onPause={()=>setReproduciendo(false)} onEnded={()=>setReproduciendo(false)} />
        </div>
      )}

      <div className="unanimes-list">
        {resultados.map((item, idx) => {
          const activo = actual?.audio === item.audio;
          const desc = limpiarDescripcion(item.descripcion);
          return (
            <article className={`unanimes-card ${activo ? "active" : ""}`} key={`${item.audio}-${idx}`}>
              <button className="unanimes-play" onClick={()=>reproducir(item)} title="Reproducir">
                {activo && reproduciendo ? <Pause size={19}/> : <Play size={19}/>}
              </button>
              <div className="unanimes-copy">
                <h3>{item.titulo || "Lectura diaria"}</h3>
                <p>{desc || "Reflexión cristiana diaria"}</p>
                <span><CalendarDays size={13}/> {item.fecha || "Sin fecha"}</span>
              </div>
              <div className="unanimes-actions">
                {item.descarga && <a href={item.descarga} target="_blank" rel="noreferrer" title="Descargar audio"><Download size={17}/></a>}
                {item.audio && <a href={item.audio} target="_blank" rel="noreferrer" title="Abrir audio"><ExternalLink size={17}/></a>}
              </div>
            </article>
          );
        })}
      </div>

      {!resultados.length && <div className="unanimes-empty">No se encontraron lecturas con esa búsqueda.</div>}

      <style>{`
        .unanimes-page{max-width:1150px;margin:auto}.unanimes-hero{display:flex;justify-content:space-between;gap:24px;align-items:center;padding:28px;border-radius:22px;background:linear-gradient(135deg,#173d34,#256b59);color:white;margin-bottom:18px}.unanimes-kicker{display:flex;gap:8px;align-items:center;font-size:11px;font-weight:900;letter-spacing:.12em;opacity:.8}.unanimes-hero h1{margin:8px 0 8px;font-size:34px}.unanimes-hero p{margin:0;color:#d9eee8}.unanimes-count{min-width:155px;background:#ffffff16;border:1px solid #ffffff22;border-radius:16px;padding:16px;text-align:center}.unanimes-count strong{display:block;font-size:30px}.unanimes-count span{font-size:11px;opacity:.8}.unanimes-search{display:flex;align-items:center;gap:10px;background:white;border:1px solid #e2e8f0;border-radius:14px;padding:0 14px;height:48px;margin-bottom:15px;color:#7b8797}.unanimes-search input{border:0;outline:0;width:100%;font-size:14px}.unanimes-player{position:sticky;top:12px;z-index:4;display:flex;gap:12px;align-items:center;background:#fff;border:1px solid #dce5e1;border-radius:16px;padding:12px 14px;box-shadow:0 8px 28px #183b3215;margin-bottom:15px}.unanimes-player-icon{width:44px;height:44px;border-radius:12px;background:#e8f5f0;color:#1f6a58;display:grid;place-items:center}.unanimes-player-info{display:flex;flex-direction:column;min-width:220px;flex:1}.unanimes-player-info small{font-size:9px;font-weight:900;color:#1f6a58}.unanimes-player-info strong{font-size:13px;margin-top:2px}.unanimes-player-info span{font-size:10px;color:#8a94a2;margin-top:2px}.unanimes-player audio{max-width:430px;width:46%}.unanimes-list{display:grid;gap:10px}.unanimes-card{display:flex;align-items:center;gap:13px;background:#fff;border:1px solid #e4e9ef;border-radius:15px;padding:13px 14px;transition:.15s}.unanimes-card:hover{border-color:#9bc8ba;transform:translateY(-1px)}.unanimes-card.active{border-color:#3e8b76;background:#f5fbf8}.unanimes-play{width:42px;height:42px;border:0;border-radius:50%;display:grid;place-items:center;background:#e8f5f0;color:#1f6a58;cursor:pointer;flex:0 0 auto}.unanimes-copy{flex:1;min-width:0}.unanimes-copy h3{margin:0;color:#1d2939;font-size:14px}.unanimes-copy p{margin:5px 0;color:#667085;font-size:12px}.unanimes-copy span{display:flex;align-items:center;gap:5px;color:#98a2b3;font-size:10px}.unanimes-actions{display:flex;gap:7px}.unanimes-actions a{width:34px;height:34px;border-radius:9px;background:#f3f6f8;color:#52606d;display:grid;place-items:center}.unanimes-empty{text-align:center;padding:40px;color:#8791a2}@media(max-width:760px){.unanimes-hero{align-items:flex-start;flex-direction:column}.unanimes-count{width:100%}.unanimes-player{position:static;align-items:flex-start;flex-wrap:wrap}.unanimes-player audio{width:100%;max-width:none}.unanimes-actions{display:none}}
      `}</style>
    </div>
  );
}
