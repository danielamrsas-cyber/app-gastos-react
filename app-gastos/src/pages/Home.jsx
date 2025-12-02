import { useEffect, useState } from "react";
import FormularioGastos from "../components/FormularioGastos";
import TablaGastos from "../components/TablaGastos";
import Filtros from "../components/Filtros";
import ResumenGastos from "../components/ResumenGastos";
import { exportarGastosExcel } from "../utils/exportarExcel";

function Home() {
  const [gastos, setGastos] = useState([]);
  const [gastosFiltrados, setGastosFiltrados] = useState(null);

  // 1️⃣ Cargar desde localStorage
  useEffect(() => {
    const data = localStorage.getItem("gastos");
    if (data) setGastos(JSON.parse(data));
  }, []);

  // 2️⃣ Guardar cambios en localStorage
  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos));
  }, [gastos]);

  // 3️⃣ Crear gasto
  const agregarGasto = (gasto) => {
    const nuevo = { id: Date.now(), ...gasto };
    setGastos([...gastos, nuevo]);
  };

  // 4️⃣ Eliminar gasto
  const eliminarGasto = (id) => {
    setGastos(gastos.filter((g) => g.id !== id));
  };

  // 5️⃣ Obtener lista única de proyectos
  const proyectosUnicos = [...new Set(gastos.map((g) => g.proyecto).filter((p) => p))];

  // 6️⃣ Aplicar filtros
  const aplicarFiltros = ({ categoria, persona, desde, hasta, proyecto }) => {
    let filtrados = [...gastos];
    if (categoria) filtrados = filtrados.filter((g) => g.categoria === categoria);
    if (persona) filtrados = filtrados.filter((g) => g.persona === persona);
    if (proyecto) filtrados = filtrados.filter((g) => g.proyecto === proyecto);
    if (desde) filtrados = filtrados.filter((g) => g.fecha >= desde);
    if (hasta) filtrados = filtrados.filter((g) => g.fecha <= hasta);
    setGastosFiltrados(filtrados);
  };

  const limpiarFiltros = () => {
    setGastosFiltrados(null);
  };

  const dataAmostrar = gastosFiltrados ?? gastos;

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        📊 Registro de Gastos
      </h1>

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
