import { useLocation } from "react-router-dom";
import CalendarioLibros from "./CalendarioLibros";

/**
 * Centro de devocionales.
 * Usa los JSON reales de La Buena Semilla y El Señor está cerca
 * que App carga mediante dataService.js.
 */
export default function Devocionales({ dataSemilla, dataSenor }) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const coleccion = params.get("coleccion");
  const tabInicial = coleccion === "senor" ? "senor" : "semilla";

  // key fuerza a CalendarioLibros a sincronizar la pestaña cuando se navega
  // desde el menú lateral entre ambas colecciones.
  return (
    <CalendarioLibros
      key={`${location.pathname}-${coleccion || "semilla"}`}
      dataSemilla={dataSemilla}
      dataSenor={dataSenor}
      tabInicial={tabInicial}
    />
  );
}
