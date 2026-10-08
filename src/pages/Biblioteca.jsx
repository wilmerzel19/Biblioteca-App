import { Link } from "react-router-dom";
import { BookOpenText, Headphones, Sprout } from "lucide-react";

export default function Biblioteca({ data }) {
  const items = [
    {to:"/devocionales?coleccion=semilla", title:"La Buena Semilla", text:"Versículo, lectura y meditación diaria", icon:Sprout, count:data.buenasemillas},
    {to:"/devocionales?coleccion=senor", title:"El Señor está Cerca", text:"Lecturas y meditaciones diarias", icon:BookOpenText, count:data.elSenorEstaCerca},
    {to:"/lecturas-diarias", title:"Lecturas Diarias de Unánimes", text:"Reflexiones cristianas en audio", icon:Headphones, count:data.lecturasDiariasUnanimes},
  ];
  return <div><div style={{marginBottom:20}}><h2 style={{margin:"0 0 6px"}}>Biblioteca</h2><p style={{margin:0,color:"#7b8494"}}>Devocionales y lecturas para cada día.</p></div><div className="card-grid">{items.map(({to,title,text,icon:Icon,count}) => <Link className="feature-card" to={to} key={to}><div className="feature-icon"><Icon/></div><h3>{title}</h3><p>{text}</p><span className="count">{Array.isArray(count) ? `${count.length} disponibles` : "Disponible"}</span></Link>)}</div></div>;
}
