import { useState } from "react";

const PERSONAS = ["Usuario General", "Julio Castellanos", "Daniel Ospitia", "Equipo Administrativo"];
const CATEGORIAS = [
  "Alimentación", "Hidratación", "Tiquetes aéreos",
  "Transporte urbano (casa-aeropuerto)",
  "Transporte (aeropuerto-casa)",
  "Transporte Casa -oficina cuando traen herramienta",
  "Transporte en sitio", "Alquiler vehiculo", "Compra materiales",
  "Atención personal", "Dotación", "Aseo", "Lavanderia",
  "Cafeteria", "Papeleria-fotocopias", "Combustible", "Peajes",
  "Medicamentos"
];

function Filtros({ aplicarFiltros, limpiarFiltros, proyectosUnicos = [] }) {
  const [categoria, setCategoria] = useState("");
  const [persona, setPersona] = useState("");
  const [proyecto, setProyecto] = useState("");
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");

  const manejarSubmit = (e) => {
    e.preventDefault();
    aplicarFiltros({ categoria, persona, proyecto, desde, hasta });
  };

  const manejarLimpiar = () => {
    setCategoria(""); setPersona(""); setProyecto(""); setDesde(""); setHasta("");
    limpiarFiltros();
  };

  return (
    <form onSubmit={manejarSubmit} style={{ marginTop: "20px" }}>
      <h3>Filtros de Gastos</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "15px" }}>
        <div>
          <label>Persona:</label>
          <select value={persona} onChange={(e) => setPersona(e.target.value)}>
            <option value="">-- Todas --</option>
            {PERSONAS.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        <div>
          <label>Categoría:</label>
          <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            <option value="">-- Todas --</option>
            {CATEGORIAS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <label>Proyecto:</label>
          <select value={proyecto} onChange={(e) => setProyecto(e.target.value)}>
            <option value="">-- Todos --</option>
            {proyectosUnicos.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        <div>
          <label>Desde:</label>
          <input type="date" value={desde} onChange={(e) => setDesde(e.target.value)} />
        </div>

        <div>
          <label>Hasta:</label>
          <input type="date" value={hasta} onChange={(e) => setHasta(e.target.value)} />
        </div>
      </div>

      <div style={{ marginTop: "15px" }}>
        <button type="submit" style={{ marginRight: "10px" }}>✅ Aplicar</button>
        <button type="button" onClick={manejarLimpiar}>♻️ Limpiar</button>
      </div>
    </form>
  );
}

export default Filtros;
