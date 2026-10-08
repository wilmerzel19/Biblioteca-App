import { Link } from "react-router-dom";
import { BookOpen, Search, Star, Music2, GraduationCap, Presentation, FileText, StickyNote, ArrowRight, Sprout, Heart, Sun } from "lucide-react";

const quick=[['Búsqueda',Search,'/busqueda'],['Favoritos',Star,'/favoritos'],['Himnos',Music2,'/himnos'],['Estudios',GraduationCap,'/estudios'],['Presentación',Presentation,'/presentacion']];
export default function Inicio(){
 return <div className="cinema-home">
  <section className="cinema-hero">
   <div className="cinema-hero-copy"><span>BIENVENIDO A</span><h2>Mi Biblioteca</h2><p>“Lámpara es a mis pies tu palabra,<br/>y lumbrera a mi camino.”</p><b>Salmo 119:105</b></div>
   <div className="verse-glass"><div><Sun size={17}/> Versículo del día</div><blockquote>“Confía en el Señor de todo tu corazón, y no te apoyes en tu propia inteligencia.”</blockquote><span>— Proverbios 3:5</span></div>
  </section>
  <div className="cinema-feature-row">
   <Link to="/biblia" className="visual-card bible"><div><h3>Leer la Biblia</h3><p>Todas las versiones en un solo lugar</p></div><i><ArrowRight/></i></Link>
   <Link to="/devocionales?coleccion=semilla" className="visual-card seed"><div><h3>La Buena Semilla</h3><p>Devocional diario</p></div><i><ArrowRight/></i></Link>
   <Link to="/devocionales?coleccion=senor" className="visual-card near"><div><h3>El Señor está cerca</h3><p>Meditaciones diarias</p></div><i><ArrowRight/></i></Link>
   <Link to="/favoritos" className="visual-card notes"><div><h3>Mis Notas</h3><p>Guarda tus reflexiones</p></div><i><ArrowRight/></i></Link>
  </div>
  <div className="dev-home-grid">
   <Link to="/devocionales?coleccion=semilla" className="dev-home-card green"><header><Sprout/><div><h3>Devocional de hoy</h3><span>La Buena Semilla</span></div><time>23 de septiembre</time></header><div className="dev-card-body"><div className="dev-art seed-art"/><div><b>Semillas de esperanza</b><blockquote>“Bienaventurado el varón que confía en el Señor.”</blockquote><p>Una lectura tranquila para comenzar el día con la Palabra.</p><button>Leer devocional completo <ArrowRight size={15}/></button></div></div></Link>
   <Link to="/devocionales?coleccion=senor" className="dev-home-card amber"><header><Heart/><div><h3>El Señor está cerca</h3><span>Meditación diaria</span></div><time>23 de septiembre</time></header><div className="dev-card-body"><div className="dev-art near-art"/><div><b>Dios en cada momento</b><blockquote>“Cercano está Jehová a los quebrantados de corazón.”</blockquote><p>Lecturas para recordar su presencia y compañía durante el día.</p><button>Leer meditación completa <ArrowRight size={15}/></button></div></div></Link>
  </div>
  <section className="home-bottom"><div><h3>Últimos libros leídos</h3><div className="recent-books"><span>📘 Génesis<small>Capítulo 1</small></span><span>📗 Salmos<small>Capítulo 23</small></span><span>📙 Proverbios<small>Capítulo 3</small></span><span>📕 Juan<small>Capítulo 1</small></span></div></div><div><h3>Herramientas rápidas</h3><div className="quick-tools">{quick.map(([n,I,to])=><Link to={to} key={n}><I/><small>{n}</small></Link>)}</div></div></section>
 </div>
}
