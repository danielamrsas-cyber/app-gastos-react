import { useEffect, useState } from "react";
import FormularioGastos from "../components/FormularioGastos";
import TablaGastos from "../components/TablaGastos";
import Filtros from "../components/Filtros";
import ResumenGastos from "../components/ResumenGastos";
import { exportarGastosExcel } from "../utils/exportarExcel";

function Home() {
  const [gastos, setGastos] = useState([]);
  const [gastosFiltrados, setGastosFiltrados] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("gastos");
    if (data) setGastos(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos));
  }, [gastos]);

  const agregarGasto = (gasto) => {
    const nuevo = { id: Date.now(), ...gasto };
    setGastos([...gastos, nuevo]);
  };

  const eliminarGasto = (id) => {
    setGastos(gastos.filter((g) => g.id !== id));
  };

  const proyectosUnicos = [...new Set(gastos.map((g) => g.proyecto).filter(p => p))];

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

  // FUTUROS VIAJES
  const futurosViajes = dataAmostrar.filter(g => g.proyecto && g.fecha > new Date().toISOString().substring(0,10));

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "20px" }}>

      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        📊 Registro de Gastos
      </h1>

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

      {futurosViajes.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <h2>✈️ Futuros Viajes / Proyectos</h2>
          <ul>
            {futurosViajes.map(g => (
              <li key={g.id}>
                {g.proyecto} - {g.fecha} - {g.persona} - {g.categoria} - ${g.monto.toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
}

export default Home;
