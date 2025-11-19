import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

// 💡 AÑADIMOS UNA PALETA DE COLORES MÁS EXTENSA Y VARIADA
const COLOR_PALETTE = [
  "#0066ff",  // Azul
  "#ff4d4d",  // Rojo
  "#4CAF50",  // Verde
  "#FFC107",  // Amarillo/Naranja
  "#9C27B0",  // Púrpura
  "#00BCD4",  // Cyan
  "#FF9800",  // Naranja Oscuro
  "#E91E63",  // Rosa
  "#3F51B5",  // Índigo
  "#8BC34A",  // Verde Lima
  "#795548",  // Marrón
  "#607D8B",  // Gris Azulado
];


function ResumenGastos({ gastos }) {
  const pieCanvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    // ⚠️ Evitamos errores si el elemento no está listo
    if (!pieCanvasRef.current) return;

    const ctxPie = pieCanvasRef.current.getContext("2d");

    if (chartRef.current) chartRef.current.destroy();

    // Lógica de cálculo (tu código, que es correcto)
    const categorias = [...new Set(gastos.map((g) => g.categoria))];
    const totales = categorias.map((c) =>
      gastos
        .filter((g) => g.categoria === c)
        .reduce((sum, g) => sum + Number(g.monto), 0)
    );

    // 💡 CORRECCIÓN PRINCIPAL: Asignar colores dinámicamente
    // Usamos .map() en las categorías y el operador módulo (%) para ciclar la paleta.
    const backgroundColors = categorias.map((_, index) => 
      COLOR_PALETTE[index % COLOR_PALETTE.length]
    );

    chartRef.current = new Chart(ctxPie, {
      type: "doughnut",
      data: {
        labels: categorias,
        datasets: [
          {
            label: "Distribución de Gastos",
            data: totales,
            // APLICAMOS LA PALETA DE COLORES DINÁMICA
            backgroundColor: backgroundColors,
            // (Opcional) Color de borde para mejor separación
            borderColor: '#ffffff', 
            borderWidth: 2, 
          },
        ],
      },
      options: {
        responsive: true, // Asegura que se adapte al tamaño del div padre
        plugins: {
          legend: {
            position: "bottom",
          },
          // (Opcional) Muestra el título
          title: {
            display: true,
            text: 'Distribución de Gastos por Categoría',
          }
        },
      },
    });

    return () => {
      if (chartRef.current) chartRef.current.destroy();
    };
  }, [gastos]);

  return (
    <div className="resumen-container">
      <h2 className="titulo-resumen">Resumen por Categoría</h2>
      <div className="graficos">
        <canvas ref={pieCanvasRef}></canvas>
      </div>
    </div>
  );
}

export default ResumenGastos;