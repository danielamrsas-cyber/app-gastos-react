import React, { useState } from "react";
import { supabase } from "../supabaseClient";

export default function RegistroGasto() {
  const [monto, setMonto] = useState("");
  const [categoria, setCategoria] = useState("");
  const [fecha, setFecha] = useState("");

  const guardarGasto = async () => {
    if (!monto || !categoria || !fecha)
      return alert("Completa todos los campos");

    const { error } = await supabase.from("gastos").insert([
      {
        monto: parseFloat(monto),
        categoria,
        fecha,
      },
    ]);

    if (error) alert("Error al guardar");
    else {
      setMonto("");
      setCategoria("");
      setFecha("");
      alert("Guardado con éxito");
    }
  };

  return (
    <div>
      <h2>Registrar gasto</h2>

      <input
        placeholder="Monto"
        value={monto}
        onChange={(e) => setMonto(e.target.value)}
      />

      <input
        placeholder="Categoría"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
      />

      <input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
      />

      <button onClick={guardarGasto}>Guardar</button>
    </div>
  );
}
