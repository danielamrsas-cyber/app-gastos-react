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

// 👥 LISTA DE PERSONAS (Nombres del equipo)
const PERSONAS = ["Usuario General", "Julio Castellanos", "Daniel Ospitia", "Equipo Administrativo"]; 

function FormularioGastos({ agregarGasto }) {
  const [monto, setMonto] = useState("");
  const [categoria, setCategoria] = useState("");
  const [fecha, setFecha] = useState("");
  // NUEVO ESTADO: Inicializa con la primera persona de la lista
  const [persona, setPersona] = useState(PERSONAS[0]); 

  const manejarSubmit = (e) => {
    e.preventDefault();

    // ➡️ Validar campos obligatorios
    if (!monto || !categoria || !fecha) { 
      // Usar un modal o mensaje de error en lugar de alert()
      console.error("Completa todos los campos (Monto, Categoría, Fecha).");
      return;
    }

    const nuevoGasto = {
      monto: parseFloat(monto), 
      categoria,
      fecha,
      persona, // ✨ ¡Campo clave para la base de datos!
    };

    agregarGasto(nuevoGasto);
    setMonto("");
    setFecha(""); 
    // Mantenemos categoría y persona seleccionadas, ya que suele ser lo mismo
  };

  return (
    <form onSubmit={manejarSubmit} className="formulario-gasto">
      
      {/* 1. CAMPO DE PERSONA (NUEVO) */}
      <div className="form-group">
        <label htmlFor="persona">Pagado por:</label>
        <select 
          id="persona"
          value={persona} 
          onChange={(e) => setPersona(e.target.value)}
        >
          {PERSONAS.map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>
      
      {/* 2. CAMPO DE MONTO */}
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

      {/* 3. CAMPO DE CATEGORÍA */}
      <div className="form-group">
        <label htmlFor="categoria">Categoría:</label>
        <select 
          id="categoria"
          value={categoria} 
          onChange={(e) => setCategoria(e.target.value)}
          required
        >
          <option value="">-- Seleccionar Categoría --</option>
          {CATEGORIAS.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* 4. CAMPO DE FECHA */}
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
      
      <button type="submit" className="btn-primary">Agregar gasto</button>
    </form>
  );
}

export default FormularioGastos;