import { useState } from 'react';

const PERSONAS = ["Usuario General", "Julio Castellanos", "Daniel Ospitia", "Equipo Administrativo"]; 
const CATEGORIAS = [
  "Alimentación", "Hidratación", "Tiquetes aéreos",
  "Transporte urbano (casa-aeropuerto)", "Transporte (aeropuerto-casa)",
  "Transporte Casa -oficina cuando traen herramienta", "Transporte en sitio",
  "Alquiler vehiculo", "Compra materiales", "Atención personal",
  "Dotación", "Aseo", "Lavanderia", "Cafeteria",
  "Papeleria-fotocopias", "Combustible", "Peajes", "Medicamentos"
];

function Filtros({ aplicarFiltros, limpiarFiltros, proyectosUnicos = [] }) {
  const [categoria, setCategoria] = useState('');
  const [desde, setDesde] = useState('');
  const [hasta, setHasta] = useState('');
  const [persona, setPersona] = useState('');
  const [proyecto, setProyecto] = useState('');

  const manejarSubmit = (e) => {
    e.preventDefault();
    aplicarFiltros({ categoria, persona, desde, hasta, proyecto });
  };

  const manejarLimpiar = () => {
    setCategoria(''); setDesde(''); setHasta(''); setPersona(''); setProyecto('');
    limpiarFiltros();
  };

  return (
    <form onSubmit={manejarSubmit} className="form-analisis">
      <h3>Filtros de Gastos</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6">
        <div className="form-group">
          <label>Pagado por:</label>
          <select value={persona} onChange={(e) => setPersona(e.target.value)}>
            <option value="">-- Todas las Personas --</option>
            {PERSONAS.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label>Categoría:</label>
          <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            <option value="">-- Todas las Categorías --</option>
            {CATEGORIAS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label>Proyecto:</label>
          <select value={proyecto} onChange={(e) => setProyecto(e.target.value)}>
            <option value="">-- Todos los Proyectos --</option>
            {proyectosUnicos.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label>Desde:</label>
          <input type="date" value={desde} onChange={(e) => setDesde(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Hasta:</label>
          <input type="date" value={hasta} onChange={(e) => setHasta(e.target.value)} />
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        <button type="submit" className="flex-1 btn-sky">✅ Aplicar Filtros</button>
        <button type="button" onClick={manejarLimpiar} className="flex-1 btn-red">♻️ Limpiar Filtros</button>
      </div>
    </form>
  );
}

export default Filtros;
