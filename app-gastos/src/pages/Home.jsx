import { useEffect, useState } from "react";
import FormularioGastos from "../components/FormularioGastos";
import TablaGastos from "../components/TablaGastos";
import Filtros from "../components/Filtros";
import ResumenGastos from "../components/ResumenGastos";
import { exportarGastosExcel } from "../utils/exportarExcel";
import { supabase } from "../supabaseClient";

function Home() {
  const [gastos, setGastos] = useState([]);
  const [gastosFiltrados, setGastosFiltrados] = useState(null);

  useEffect(() => {
    const fetchGastos = async () => {
      const { data, error } = await supabase
        .from("gastos")
        .select("*")
        .order("fecha", { ascending: false });

      if (error) {
        console.error("Error cargando gastos:", error);
        return;
      }

      // Transformación al mostrar
      const transformados = data.map(g => ({
        ...g,
        proyecto: g.viaje_id || ""   // NO cambia BD
      }));

      setGastos(transformados);
    };

    fetchGastos();
  }, []);

  const agregarGasto = (gastoDB) => {
    const transformado = {
      ...gastoDB,
      proyecto: gastoDB.viaje_id || ""
    };
    setGastos(prev => [...prev, transformado]);
  };

  const eliminarGasto = async (id) => {
    const { error } = await supabase.from("gastos").delete().eq("id", id);

    if (error) {
      console.error("Error eliminando gasto:", error);
      return;
    }

    setGastos(prev => prev.filter(g => g.id !== id));
  };

  const proyectosUnicos = [...new Set(gastos.map(g => g.proyecto).filter(Boolean))];

  const aplicarFiltros = ({ categoria, persona, desde, hasta, proyecto }) => {
    let filtrados = [...gastos];

    if (categoria) filtrados = filtrados.filter(g => g.categoria === categoria);
    if (persona) filtrados = filtrados.filter(g => g.persona === persona);
    if (proyecto) filtrados = filtrados.filter(g => g.proyecto === proyecto);

    if (desde) filtrados = filtrados.filter(g => g.fecha >= desde);
    if (hasta) filtrados = filtrados.filter(g => g.fecha <= hasta);

    setGastosFiltrados(filtrados);
  };

  const limpiarFiltros = () => setGastosFiltrados(null);

  const dataAmostrar = gastosFiltrados ?? gastos;

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>📊 Registro de Gastos</h1>

      <FormularioGastos agregarGasto={agregarGasto} />

      <Filtros
        aplicarFiltros={aplicarFiltros}
        limpiarFiltros={limpiarFiltros}
        proyectosUnicos={proyectosUnicos}
      />

      <div style={{ textAlign: "right", margin: "15px 0" }}>
        <button
          style={{ padding: "10px 15px", borderRadius: "6px", cursor: "pointer" }}
          onClick={() => exportarGastosExcel(dataAmostrar)}
        >
          📥 Exportar Excel
        </button>
      </div>

      <TablaGastos gastos={dataAmostrar} eliminarGasto={eliminarGasto} />

      <ResumenGastos gastos={dataAmostrar} />
    </div>
  );
}

export default Home;
