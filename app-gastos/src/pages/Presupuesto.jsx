import { useState } from "react";

/* =========================
   Helpers de Fecha y Números
   ========================= */

// Calcula diferencia de días INCLUYENDO el día final
const calcularDiferenciaDias = (fechaInicio, fechaFin) => {
  const unDia = 24 * 60 * 60 * 1000;
  const start = new Date(fechaInicio + "T00:00:00");
  const end = new Date(fechaFin + "T00:00:00");
  // No usar Math.abs aquí para preservar el orden lógico (validamos antes)
  return Math.round((end - start) / unDia) + 1;
};

// Crear timestamps SEGUROS (inicio del día / final del día) para comparaciones
const createUTCDate = (dateString, isEnd) => {
  if (!dateString) return null;
  let date = new Date(dateString);

  if (isEnd) {
    // mover al siguiente día 00:00 y restar 1ms -> representa 23:59:59.999 del día original
    date.setDate(date.getDate() + 1);
    date.setHours(0, 0, 0, 0);
    date = new Date(date.getTime() - 1);
  } else {
    date.setHours(0, 0, 0, 0);
  }

  return date.getTime();
};

// Formateador de moneda con DECIMALES (útil para CPD y proyección)
const formatoCOP = (valor, opciones = { minimumFractionDigits: 2, maximumFractionDigits: 2 }) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    ...opciones,
  }).format(Number(valor) || 0);

// Seguridad al convertir números (evita NaN)
const safeNumber = (v, fallback = 0) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
};

/* =========================
   Componente Presupuesto
   ========================= */

function Presupuesto({ gastos = [] }) {
  // ====== Estados - BASE HISTÓRICA ======
  const [baseDesde, setBaseDesde] = useState("");
  const [baseHasta, setBaseHasta] = useState("");
  const [basePersonas, setBasePersonas] = useState(2);

  // ====== Estados - PROYECCIÓN ======
  const [nuevoDias, setNuevoDias] = useState("");
  const [nuevoPersonas, setNuevoPersonas] = useState("");
  const [nuevoNombre, setNuevoNombre] = useState("Nuevo Presupuesto");

  // ====== Resultado & Error ======
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState("");

  const calcularPresupuesto = (e) => {
    e.preventDefault();
    setResultado(null);
    setError("");

    // Validaciones básicas y sanitización
    if (!baseDesde || !baseHasta) {
      setError("Debes seleccionar las fechas de la base histórica.");
      return;
    }
    if (!basePersonas || safeNumber(basePersonas) < 1) {
      setError("Indica correctamente el número de personas de la base histórica (mínimo 1).");
      return;
    }
    if (!nuevoDias || safeNumber(nuevoDias) < 1 || !nuevoPersonas || safeNumber(nuevoPersonas) < 1) {
      setError("Indica correctamente los días y personas del nuevo viaje (mínimo 1).");
      return;
    }

    const tiempoDesde = createUTCDate(baseDesde, false);
    const tiempoHasta = createUTCDate(baseHasta, true);

    if (tiempoDesde > tiempoHasta) {
      setError("La fecha 'Desde' no puede ser posterior a la fecha 'Hasta'.");
      return;
    }

    const diasBase = calcularDiferenciaDias(baseDesde, baseHasta);

    // Filtrar usando timestamps seguros
    const gastosBase = gastos.filter((g) => {
      // Aseguramos que g.fecha exista y sea interpretable
      const gastoTiempo = new Date(g.fecha).getTime();
      return gastoTiempo >= tiempoDesde && gastoTiempo <= tiempoHasta;
    });

    if (gastosBase.length === 0) {
      setError("No se encontraron gastos dentro del rango seleccionado.");
      return;
    }

    // Calcular costo total base (sumatoria montos)
    const costoTotalBase = gastosBase.reduce((sum, g) => sum + safeNumber(g.monto), 0);

    // CPD por persona (decimal)
    const cpdPersona = costoTotalBase / (diasBase * safeNumber(basePersonas, 1));

    // Proyección (decimal)
    const proyectado = cpdPersona * safeNumber(nuevoDias, 1) * safeNumber(nuevoPersonas, 1);

    setResultado({
      nombre: nuevoNombre,
      costoTotalBase,
      diasBase,
      personasBase: safeNumber(basePersonas, 1),
      cpdPersona,
      diasNuevo: safeNumber(nuevoDias, 1),
      personasNuevo: safeNumber(nuevoPersonas, 1),
      proyectado,
      gastosBaseCount: gastosBase.length,
    });
  };

  const limpiar = () => {
    setBaseDesde("");
    setBaseHasta("");
    setBasePersonas(2);
    setNuevoDias("");
    setNuevoPersonas("");
    setNuevoNombre("Nuevo Presupuesto");
    setResultado(null);
    setError("");
  };

  /* =========================
     UI - Manteniendo estructura Tailwind
     ========================= */
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Cabecera */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Herramienta de Análisis y Presupuesto</h2>
        <p className="text-sm text-slate-500">
          Estima el costo de un nuevo viaje basado en tu historial real de gastos. La
          estimación usa costo promedio diario por persona (CPD) calculado sobre la base histórica.
        </p>
        <div className="mt-3 text-xs text-slate-600">
          <span className="inline-block bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Aviso importante</span>{" "}
          <span className="ml-2">La proyección es solo una estimación basada en datos históricos.</span>
        </div>
      </div>

      {/* Error visual */}
      {error && (
        <div className="mb-4 rounded-md bg-red-50 border border-red-200 p-3">
          <p className="text-sm text-red-700">⚠️ {error}</p>
        </div>
      )}

      {/* Formulario */}
      <form onSubmit={calcularPresupuesto} className="bg-white shadow-sm rounded-lg p-6 grid gap-6">
        {/* --- BASE HISTÓRICA --- */}
        <div>
          <h3 className="text-lg font-semibold text-slate-700">1. Base Histórica</h3>
          <p className="text-sm text-slate-500">Selecciona el rango de fechas y cuántas personas participaron en la base.</p>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-6">
            <div>
              <label className="block text-sm text-slate-600 mb-1">Fecha Desde</label>
              <input
                type="date"
                value={baseDesde}
                onChange={(e) => setBaseDesde(e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-600 mb-1">Fecha Hasta</label>
              <input
                type="date"
                value={baseHasta}
                onChange={(e) => setBaseHasta(e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-600 mb-1">Personas (Base)</label>
              <input
                type="number"
                min="1"
                value={basePersonas}
                onChange={(e) => setBasePersonas(e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200"
              />
            </div>
          </div>
        </div>

        {/* --- PROYECCIÓN --- */}
        <div>
          <h3 className="text-lg font-semibold text-slate-700">2. Proyección</h3>
          <p className="text-sm text-slate-500">Define el nuevo viaje que quieres proyectar.</p>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-6">
            <div>
              <label className="block text-sm text-slate-600 mb-1">Nombre del Presupuesto</label>
              <input
                type="text"
                value={nuevoNombre}
                onChange={(e) => setNuevoNombre(e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-600 mb-1">Días del Nuevo Viaje</label>
              <input
                type="number"
                min="1"
                value={nuevoDias}
                onChange={(e) => setNuevoDias(e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-600 mb-1">Personas (Nuevo)</label>
              <input
                type="number"
                min="1"
                value={nuevoPersonas}
                onChange={(e) => setNuevoPersonas(e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200"
              />
            </div>
          </div>
        </div>

        {/* Botones */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="bg-sky-600 text-white px-4 py-2 rounded shadow hover:bg-sky-700 text-sm"
          >
            🔍 Analizar y Proyectar
          </button>

          <button
            type="button"
            onClick={limpiar}
            className="bg-slate-50 border text-slate-700 px-4 py-2 rounded hover:bg-slate-100 text-sm"
          >
            ♻️ Limpiar
          </button>

          <div className="ml-auto text-xs text-slate-500">
            <span>Gastos analizados: </span>
            <strong>{resultado ? resultado.gastosBaseCount : "-"}</strong>
          </div>
        </div>
      </form>

      {/* Resultado — diseño estilo original con métricas */}
      {resultado && (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* CARD 1: Resumen histórico */}
          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <h4 className="text-sm font-semibold text-slate-700">📌 Resumen Histórico</h4>
            <p className="mt-2 text-xs text-slate-500">Base: {resultado.diasBase} días · {resultado.personasBase} personas</p>

            <div className="mt-3">
              <p className="text-sm text-slate-600">Costo Total Histórico</p>
              <div className="mt-1 text-2xl font-bold text-slate-800">{formatoCOP(resultado.costoTotalBase, {minimumFractionDigits: 0, maximumFractionDigits: 0})}</div>
            </div>

            <div className="mt-3 text-xs text-slate-500">
              <p>Datos usados: {resultado.gastosBaseCount} registros</p>
            </div>
          </div>

          {/* CARD 2: Métrica CPD */}
          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <h4 className="text-sm font-semibold text-slate-700">📊 Métrica</h4>
            <p className="mt-2 text-xs text-slate-500">Costo Promedio Diario por Persona (CPD)</p>

            <div className="mt-3 flex items-end justify-between">
              <div>
                <div className="text-3xl font-bold">{formatoCOP(resultado.cpdPersona)}</div>
                <p className="text-xs text-slate-500 mt-1">Promedio por día y persona</p>
              </div>
              <div className="text-xs text-slate-400">CPD</div>
            </div>

            <div className="mt-3 text-xs text-slate-500">
              <p>Fórmula: (Costo total histórico) ÷ (días base × personas base)</p>
            </div>
          </div>

          {/* CARD 3: Proyección */}
          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <h4 className="text-sm font-semibold text-slate-700">💰 Presupuesto Proyectado</h4>
            <p className="mt-2 text-xs text-slate-500">Para {resultado.personasNuevo} personas • {resultado.diasNuevo} días</p>

            <div className="mt-3">
              <div className="text-3xl font-extrabold text-slate-800">{formatoCOP(resultado.proyectado, {minimumFractionDigits: 0, maximumFractionDigits: 0})}</div>
              <p className="text-xs text-slate-500 mt-2">Proyección basada en el CPD histórico.</p>
            </div>

            <div className="mt-3 flex gap-2">
              <span className="px-2 py-1 bg-slate-100 rounded text-xs">CPD: {formatoCOP(resultado.cpdPersona)}</span>
              <span className="px-2 py-1 bg-slate-100 rounded text-xs">Días: {resultado.diasNuevo}</span>
              <span className="px-2 py-1 bg-slate-100 rounded text-xs">Personas: {resultado.personasNuevo}</span>
            </div>
          </div>
        </div>
      )}

      {/* Pie informativo */}
      <div className="mt-6 text-sm text-slate-500">
        <p>ℹ️ Tip: revisa categorías y registros atípicos si la proyección parece elevada — puedes filtrar o limpiar datos históricos para obtener estimaciones más precisas.</p>
      </div>
    </div>
  );
}

export default Presupuesto;
