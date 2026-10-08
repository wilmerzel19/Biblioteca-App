import { Link } from "react-router-dom";
import { ArrowRight, BookOpenText, Headphones, Sprout } from "lucide-react";

export default function Biblioteca({ data }) {
  const items = [
    {
      to: "/devocionales?coleccion=semilla",
      title: "La Buena Semilla",
      text: "Versículo, lectura y meditación diaria",
      icon: Sprout,
      count: data.buenasemillas,
      tone: "seed",
      eyebrow: "DEVOCIONAL DIARIO"
    },
    {
      to: "/devocionales?coleccion=senor",
      title: "El Señor está Cerca",
      text: "Lecturas y meditaciones diarias",
      icon: BookOpenText,
      count: data.elSenorEstaCerca,
      tone: "near",
      eyebrow: "MEDITACIÓN DIARIA"
    },
    {
      to: "/lecturas-diarias",
      title: "Lecturas Diarias de Unánimes",
      text: "Reflexiones cristianas en audio",
      icon: Headphones,
      count: data.lecturasDiariasUnanimes,
      tone: "audio",
      eyebrow: "AUDIO DEVOCIONAL"
    },
  ];

  return (
    <section className="library-page">
      <header className="library-hero">
        <div>
          <span className="library-kicker">TU ESPACIO DE LECTURA</span>
          <h1>Biblioteca</h1>
          <p>Devocionales y lecturas para acompañarte cada día, en cualquier pantalla.</p>
        </div>
      </header>

      <div className="library-grid">
        {items.map(({ to, title, text, icon: Icon, count, tone, eyebrow }) => (
          <Link className={`library-card ${tone}`} to={to} key={to}>
            <div className="library-card-top">
              <div className="library-icon"><Icon size={23} /></div>
              <span className="library-card-eyebrow">{eyebrow}</span>
            </div>
            <div className="library-card-copy">
              <h2>{title}</h2>
              <p>{text}</p>
            </div>
            <div className="library-card-bottom">
              <span>{Array.isArray(count) ? `${count.length} disponibles` : "Disponible"}</span>
              <span className="library-open">Abrir <ArrowRight size={16} /></span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
