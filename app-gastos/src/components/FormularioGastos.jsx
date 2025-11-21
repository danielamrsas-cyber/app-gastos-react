import { useState } from "react";

// 🎯 LISTA DE CATEGORÍAS (Movida desde utils/constantes)
const CATEGORIAS = [
    "Alimentación", 
    "Hidratación", 
    "Tiquetes aéreos", 
    "Transporte urbano (casa-aeropuerto)",
    "Transporte (aeropuerto-casa)",
    "Transporte Casa -oficina cuando traen herramienta",
    "Transporte en sitio",
    "Alquiler vehiculo",
    "Compra materiales",
    "Atención personal",
    "Dotación",
    "Aseo",
    "Lavanderia",
    "Cafeteria",
    "Papeleria-fotocopias",
    "Combustible",
    "Peajes",
    "Medicamentos"
];

// 👥 LISTA DE PERSONAS
const PERSONAS = ["Usuario General", "Julio Castellanos", "Daniel Ospitia", "Equipo Administrativo"]; 

function FormularioGastos({ agregarGasto }) {
  const [monto, setMonto] = useState("");
  const [categoria, setCategoria] = useState("");
  const [fecha, setFecha] = useState("");
  const [persona, setPersona] = useState(PERSONAS[0]);

  // 🆕 Nuevo estado para el proyecto
  const [proyecto, setProyecto] = useState("");

  const manejarSubmit = (e) => {
    e.preventDefault();

    if (!monto || !categoria || !fecha) {
      console.error("Completa todos los campos (Monto, Categoría, Fecha).");
      return;
    }

    const nuevoGasto = {
      monto: parseFloat(monto),
      categoria,
      fecha,
      persona,

      // 🆕 Agregar proyecto al objeto
      proyecto: proyecto.trim(),
    };

    agregarGasto(nuevoGasto);

    setMonto("");
    setFecha("");

    // 🆕 Limpiar también proyecto
    setProyecto("");
  };

  return (
    <form onSubmit={manejarSubmit} className="formulario-gasto">

      {/* 1. CAMPO PERSONA */}
      <div className="form-group">
        <label htmlFor="persona">Pagado por:</label>
        <select 
          id="persona"
          value={persona}
          onChange={(e) => setPersona(e.target.value)}
        >
          {PERSONAS.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      {/* 2. MONTO */}
      <div className="form-group">
        <label htmlFor="monto">Monto:</label>
        <input
          id="monto"
          type="number"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          placeholder="Ej: 50.000"
          required
        />
      </div>

      {/* 3. CATEGORÍA */}
      <div className="form-group">
        <label htmlFor="categoria">Categoría:</label>
        <select 
          id="categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          required
        >
          <option value="">-- Seleccionar Categoría --</option>
          {CATEGORIAS.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* 4. FECHA */}
      <div className="form-group">
        <label htmlFor="fecha">Fecha:</label>
        <input
          id="fecha"
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required
        />
      </div>

      {/* 🆕 5. NUEVO CAMPO DE PROYECTO */}
      <div className="form-group">
        <label htmlFor="proyecto">Nombre del Proyecto (Opcional):</label>
        <input
          id="proyecto"
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
