import { useEffect, useState } from "react";
import FormularioGastos from "./components/FormularioGastos";
import TablaGastos from "./TablaGastos";
import Filtros from "./Filtros";
import ResumenGastos from "./ResumenGastos";
import { exportarGastosExcel } from "./utils/exportarExcel";
import { supabase } from "./supabaseClient";

function Home() {
  const [gastos, setGastos] = useState([]);
  const [gastosFiltrados, setGastosFiltrados] = useState(null);

  // 1️⃣ Cargar gastos desde Supabase al inicio
  useEffect(() => {
    const fetchGastos = async () => {
      const { data, error } = await supabase
        .from("gastos")
        .select("*")
        .order("fecha", { ascending: false });

      if (error) {
        console.error("Error cargando gastos:", error);
      } else {
        setGastos(data);
      }
    };

    fetchGastos();
  }, []);

  // 3️⃣ Crear gasto en Supabase
  const agregarGasto = async (gasto) => {
    const nuevo = {
      ...gasto,
      fecha: gasto.fecha || new Date().toISOString().split("T")[0],
    };

    const { data, error } = await supabase.from("gastos").insert([nuevo]).select();

    if (error) {
      console.error("Error agregando gasto:", error);
    } else {
      setGastos((prev) => [...prev, data[0]]);
    }
  };

  // 4️⃣ Eliminar gasto desde Supabase
  const eliminarGasto = async (id) => {
    const { error } = await supabase.from("gastos").delete().eq("id", id);

    if (error) {
      console.error("Error eliminando gasto:", error);
    } else {
      setGastos((prev) => prev.filter((g) => g.id !== id));
    }
  };

  // 5️⃣ Obtener lista única de proyectos
  const proyectosUnicos = [...new Set(gastos.map(g => g.proyecto).filter(p => p))];

  // 6️⃣ Aplicar filtros
  const aplicarFiltros = ({ categoria, persona, desde, hasta, proyecto }) => {
    let filtrados = [...gastos];

    if (categoria) filtrados = filtrados.filter(g => g.categoria === categoria);
    if (persona) filtrados = filtrados.filter(g => g.persona === persona);
    if (proyecto) filtrados = filtrados.filter(g => g.proyecto === proyecto);

    if (desde) filtrados = filtrados.filter(g => g.fecha >= desde);
    if (hasta) filtrados = filtrados.filter(g => g.fecha <= hasta);

    setGastosFiltrados(filtrados);
  };

  const limpiarFiltros = () => {
    setGastosFiltrados(null);
  };

  const dataAmostrar = gastosFiltrados ?? gastos;

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>📊 Registro de Gastos</h1>

      {/* FORMULARIO */}
      <FormularioGastos agregarGasto={agregarGasto} />

      {/* FILTROS */}
      <Filtros
        aplicarFiltros={aplicarFiltros}
        limpiarFiltros={limpiarFiltros}
        proyectosUnicos={proyectosUnicos}
      />

      {/* BOTÓN EXPORTAR */}
      <div style={{ textAlign: "right", margin: "15px 0" }}>
        <button
          style={{ padding: "10px 15px", borderRadius: "6px", cursor: "pointer" }}
          onClick={() => exportarGastosExcel(dataAmostrar)}
        >
          📥 Exportar Excel
        </button>
      </div>

      {/* TABLA */}
      <TablaGastos gastos={dataAmostrar} eliminarGasto={eliminarGasto} />

      {/* RESUMEN */}
      <ResumenGastos gastos={dataAmostrar} />
    </div>
  );
}

export default Home;
