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

function FormularioGastos({ agregarGasto }) {
  const [fecha, setFecha] = useState("");
  const [categoria, setCategoria] = useState("");
  const [persona, setPersona] = useState("");
  const [proyecto, setProyecto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState("");

  const manejarSubmit = (e) => {
    e.preventDefault();
    if (!fecha || !categoria || !persona || !monto) {
      alert("Fecha, Categoría, Persona y Monto son obligatorios");
      return;
    }
    agregarGasto({ fecha, categoria, persona, proyecto, descripcion, monto });
    // Limpiar campos
    setFecha(""); setCategoria(""); setPersona(""); setProyecto(""); setDescripcion(""); setMonto("");
  };

  return (
    <form onSubmit={manejarSubmit} style={{ marginBottom: "30px" }}>
      <h3>Agregar Gasto</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "15px" }}>
        <div>
          <label>Fecha:</label>
          <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
        </div>

        <div>
          <label>Categoría:</label>
          <select value={categoria} onChange={(e) => setCategoria(e.target.value)} required>
            <option value="">-- Selecciona --</option>
            {CATEGORIAS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <label>Persona:</label>
          <select value={persona} onChange={(e) => setPersona(e.target.value)} required>
            <option value="">-- Selecciona --</option>
            {PERSONAS.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        <div>
          <label>Proyecto:</label>
          <input type="text" value={proyecto} onChange={(e) => setProyecto(e.target.value)} placeholder="Opcional" />
        </div>

        <div>
          <label>Descripción:</label>
          <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Opcional" />
        </div>

        <div>
          <label>Monto:</label>
          <input type="number" value={monto} onChange={(e) => setMonto(e.target.value)} required min="0" step="0.01" />
        </div>
      </div>

      <div style={{ marginTop: "15px" }}>
        <button type="submit">➕ Agregar Gasto</button>
      </div>
    </form>
  );
}

export default FormularioGastos;
