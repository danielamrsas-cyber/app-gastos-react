import { useEffect, useState, useMemo } from "react";
import FormularioGastos from "../components/FormularioGastos";
import TablaGastos from "../components/TablaGastos";
import Filtros from "../components/Filtros";
import ResumenGastos from "../components/ResumenGastos";
import Presupuesto from "./Presupuesto"; // Importamos el nuevo componente

function Home({ gastos, agregarGasto, eliminarGasto }) {
  const [gastosFiltrados, setGastosFiltrados] = useState(gastos);
  const [vistaActual, setVistaActual] = useState("gastos");

  useEffect(() => {
    setGastosFiltrados(gastos);
  }, [gastos]);

  // 1. CALCULAR PROYECTOS ÚNICOS
  const proyectosUnicos = useMemo(() => {
    const proyectos = gastos
      .map((g) => g.proyecto)
      .filter((p) => p && p.trim() !== "");
    return [...new Set(proyectos)].sort();
  }, [gastos]);

  // Ahora recibe 'proyecto' también
  const aplicarFiltros = ({ categoria, desde, hasta, persona, proyecto }) => {
    let filtrados = [...gastos];

    // 1. Filtro de Categoría
    if (categoria.trim() !== "") {
      filtrados = filtrados.filter(
        (g) => g.categoria.toLowerCase() === categoria.toLowerCase()
      );
    }

    // 1.2 Filtro de Persona
    if (persona.trim() !== "") {
      filtrados = filtrados.filter(
        (g) => g.persona.toLowerCase() === persona.toLowerCase()
      );
    }

    // NUEVO: Filtro Proyecto
    if (proyecto && proyecto.trim() !== "") {
      filtrados = filtrados.filter((g) => g.proyecto === proyecto);
    }

    // 2. Filtro de fechas
    filtrados = filtrados.filter((g) => {
      const gastoFechaStr = g.fecha.substring(0, 10);

      if (desde && gastoFechaStr < desde) return false;
      if (hasta && gastoFechaStr > hasta) return false;

      return true;
    });

    setGastosFiltrados(filtrados);
  };

  const limpiarFiltros = () => {
    setGastosFiltrados(gastos);
  };

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
            proyectosUnicos={proyectosUnicos} // <--- AGREGADO
          />
          <TablaGastos gastos={gastosFiltrados} eliminarGasto={eliminarGasto} />
          <ResumenGastos gastos={gastosFiltrados} />
        </>
      ) : (
        <Presupuesto gastos={gastos} />
      )}
    </div>
  );
}

export default Home;
