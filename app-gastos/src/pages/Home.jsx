import { useEffect, useState } from "react";
import FormularioGastos from "../components/FormularioGastos";
import TablaGastos from "../components/TablaGastos";
import Filtros from "../components/Filtros";
import ResumenGastos from "../components/ResumenGastos";
import Presupuesto from "./Presupuesto"; // Pestaña de análisis y futuros viajes
import { exportarGastosExcel } from "../utils/exportarExcel";

function Home() {
  const [gastos, setGastos] = useState([]);
  const [gastosFiltrados, setGastosFiltrados] = useState(null);
  const [vistaActual, setVistaActual] = useState("gastos");

  // Cargar desde localStorage
  useEffect(() => {
    const data = localStorage.getItem("gastos");
    if (data) setGastos(JSON.parse(data));
  }, []);

  // Guardar en localStorage
  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos));
  }, [gastos]);

  // Crear gasto
  const agregarGasto = (gasto) => {
    const nuevo = { id: Date.now(), ...gasto };
    setGastos([...gastos, nuevo]);
  };

  // Eliminar gasto
  const eliminarGasto = (id) => {
    setGastos(gastos.filter((g) => g.id !== id));
  };

  // Obtener lista única de proyectos
  const proyectosUnicos = [...new Set(gastos.map((g) => g.proyecto).filter(p => p))];

  // Aplicar filtros
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
    <div className="container-content">
      <div className="navigation-tabs">
        <button
          className={vistaActual === "gastos" ? "active" : ""}
          onClick={() => setVistaActual("gastos")}
        >
          📝 Gestión de Gastos
        </button>
        <button
          className={vistaActual === "presupuesto" ? "active" : ""}
          onClick={() => setVistaActual("presupuesto")}
        >
          📊 Analizar y Presupuestar
        </button>
      </div>

      {vistaActual === "gastos" ? (
        <>
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
        </>
      ) : (
        <Presupuesto gastos={gastos} />
      )}
    </div>
  );
}

export default Home;
