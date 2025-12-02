import { useState } from "react";

function FormularioGastos({ agregarGasto }) {
  const [categoria, setCategoria] = useState("");
  const [persona, setPersona] = useState("");
  const [proyecto, setProyecto] = useState("");
  const [monto, setMonto] = useState("");
  const [fecha, setFecha] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!categoria || !persona || !monto || !fecha) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    // Crear el gasto
    const gasto = {
      categoria,
      persona,
      proyecto,
      monto: parseFloat(monto),
      fecha,
    };

    agregarGasto(gasto);

    // ✨ Limpiar todos los campos después de agregar el gasto
    setCategoria("");
    setPersona("");
    setProyecto("");
    setMonto("");
    setFecha("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {/* Categoría */}
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option value="">-- Selecciona categoría --</option>
          <option value="Comida">Comida</option>
          <option value="Transporte">Transporte</option>
          <option value="Hospedaje">Hospedaje</option>
          <option value="Viajes">Viajes</option>
          <option value="Otros">Otros</option>
        </select>

        {/* Persona */}
        <input
          type="text"
          placeholder="Persona"
          value={persona}
          onChange={(e) => setPersona(e.target.value)}
        />

        {/* Proyecto */}
        <input
          type="text"
          placeholder="Proyecto (opcional)"
          value={proyecto}
          onChange={(e) => setProyecto(e.target.value)}
        />

        {/* Monto */}
        <input
          type="number"
          placeholder="Monto"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
        />

        {/* Fecha */}
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />

        {/* Botón agregar */}
        <button
          type="submit"
          style={{
            padding: "10px 15px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          ➕ Agregar Gasto
        </button>
      </div>
    </form>
  );
}

export default FormularioGastos;
