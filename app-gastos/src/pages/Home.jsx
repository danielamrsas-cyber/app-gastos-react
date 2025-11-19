import { useEffect, useState } from "react";
import FormularioGastos from "../components/FormularioGastos";
import TablaGastos from "../components/TablaGastos";
import Filtros from "../components/Filtros";
import ResumenGastos from "../components/ResumenGastos";
import Presupuesto from "./Presupuesto"; // Importamos el nuevo componente

function Home({ gastos, agregarGasto, eliminarGasto }) {
  const [gastosFiltrados, setGastosFiltrados] = useState(gastos);
  // Estado para controlar la vista: 'gastos' o 'presupuesto'
  const [vistaActual, setVistaActual] = useState("gastos");

  useEffect(() => {
    // Cuando los gastos se cargan de Supabase, actualizamos la lista filtrada
    setGastosFiltrados(gastos);
  }, [gastos]);

  // FUNCIÓN CON LA NUEVA LÓGICA DE FECHAS
  const aplicarFiltros = ({ categoria, desde, hasta, persona }) => {
    let filtrados = [...gastos];

    // 1. Filtro de Categoría
    if (categoria.trim() !== "") {
      filtrados = filtrados.filter(
        (g) => g.categoria.toLowerCase() === categoria.toLowerCase()
      );
    }

    // 1.2. Filtro de Persona (NUEVO)
    if (persona.trim() !== "") {
      filtrados = filtrados.filter(
        (g) => g.persona.toLowerCase() === persona.toLowerCase()
      );
    }

    // 2. Aplicar el filtro de rango de fechas (COMPARACIÓN DE CADENAS "AAAA-MM-DD")
    filtrados = filtrados.filter((g) => {
      // La fecha del gasto debe estar en formato "AAAA-MM-DD"
      const gastoFechaStr = g.fecha.substring(0, 10);

      // A. Filtro 'Desde' (Mayor o Igual)
      if (desde && gastoFechaStr < desde) {
        return false;
      }

      // B. Filtro 'Hasta' (Menor o Igual)
      if (hasta && gastoFechaStr > hasta) {
        return false;
      }

      return true;
    });

    setGastosFiltrados(filtrados);
  };

  const limpiarFiltros = () => {
    setGastosFiltrados(gastos);
  };

  return (
    <div className="container-content">
      {/* 🧭 NAVEGACIÓN DE VISTAS */}
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
        // 1. VISTA DE GASTOS (Default)
        <>
          {/* FormularioGastos ahora tiene el campo "Persona" */}
          <FormularioGastos agregarGasto={agregarGasto} />
          <Filtros
            aplicarFiltros={aplicarFiltros}
            limpiarFiltros={limpiarFiltros}
          />
          <TablaGastos gastos={gastosFiltrados} eliminarGasto={eliminarGasto} />
          <ResumenGastos gastos={gastosFiltrados} />
        </>
      ) : (
        // 2. VISTA DE PRESUPUESTO
        <Presupuesto gastos={gastos} />
      )}
    </div>
  );
}

export default Home;
