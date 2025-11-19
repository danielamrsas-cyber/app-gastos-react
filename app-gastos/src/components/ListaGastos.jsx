import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function ListaGastos() {
  const [gastos, setGastos] = useState([]);

  const cargar = async () => {
    const { data, error } = await supabase
      .from("gastos")
      .select("*")
      .order("id", { ascending: false });

    if (!error) setGastos(data);
  };

  useEffect(() => {
    cargar();
  }, []);

  return (
    <div>
      <h2>Lista de gastos</h2>

      {gastos.map((g) => (
        <div key={g.id}>
          ${g.monto} — {g.categoria} — {g.fecha}
        </div>
      ))}
    </div>
  );
}
