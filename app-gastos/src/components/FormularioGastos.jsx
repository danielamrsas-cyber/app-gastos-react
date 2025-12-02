import { useState } from "react";
import { supabase } from "../supabaseClient";

const CATEGORIAS = [
  "Alimentación", "Hidratación", "Tiquetes aéreos",
  "Transporte urbano (casa-aeropuerto)", "Transporte (aeropuerto-casa)",
  "Transporte Casa -oficina cuando traen herramienta", "Transporte en sitio",
  "Alquiler vehiculo", "Compra materiales", "Atención personal",
  "Dotación", "Aseo", "Lavanderia", "Cafeteria",
  "Papeleria-fotocopias", "Combustible", "Peajes", "Medicamentos"
];

const PERSONAS = [
  "Usuario General",
  "Julio Castellanos",
  "Daniel Ospitia",
  "Equipo Administrativo"
];

function FormularioGastos({ agregarGasto }) {
  const [monto, setMonto] = useState("");
  const [categoria, setCategoria] = useState("");
  const [fecha, setFecha] = useState("");
  const [persona, setPersona] = useState(PERSONAS[0]);
  const [proyecto, setProyecto] = useState("");

  const manejarSubmit = async (e) => {
    e.preventDefault();

    if (!monto || !categoria || !fecha) {
      alert("Todos los campos obligatorios deben estar completos.");
      return;
    }

    const nuevoGasto = {
      monto: parseFloat(monto),
      categoria,
      fecha,
      persona,
      viaje_id: proyecto.trim(), // <-- 👈 CAMBIO CORRECTO
    };

    try {
      const { data, error } = await supabase
        .from("gastos")
        .insert([nuevoGasto])
        .select("*");

      if (error) {
        console.error("🔥 ERROR SUPABASE:", error);
        alert("❌ Error guardando el gasto");
        return;
      }

      agregarGasto(data[0]);

      setMonto("");
      setCategoria("");
      setFecha("");
      setProyecto("");

    } catch (e) {
      console.error("EXCEPCIÓN:", e);
      alert("⚠️ Hubo un error inesperado.");
    }
  };

  return (
    <form onSubmit={manejarSubmit} className="formulario-gasto">

      <div className="form-group">
        <label>Pagado por:</label>
        <select value={persona} onChange={(e) => setPersona(e.target.value)}>
          {PERSONAS.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>

      <div className="form-group">
        <label>Monto:</label>
        <input
          type="number"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Categoría:</label>
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          required
        >
          <option value="">-- Seleccionar Categoría --</option>
          {CATEGORIAS.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="form-group">
        <label>Fecha:</label>
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Nombre del Proyecto (Opcional):</label>
        <input
          type="text"
          value={proyecto}
          onChange={(e) => setProyecto(e.target.value)}
          placeholder="Ej: Viaje a Cartagena Enero"
        />
      </div>

      <button type="submit" className="btn-primary">
        Agregar gasto
      </button>
    </form>
  );
}

export default FormularioGastos;
