import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const COLOR_PALETTE = [
  "#0066ff","#ff4d4d","#4CAF50","#FFC107","#9C27B0",
  "#00BCD4","#FF9800","#E91E63","#3F51B5","#8BC34A",
  "#795548","#607D8B",
];

function ResumenGastos({ gastos }) {
  const pieCanvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!pieCanvasRef.current) return;
    const ctxPie = pieCanvasRef.current.getContext("2d");
    if (chartRef.current) chartRef.current.destroy();

    const categorias = [...new Set(gastos.map((g) => g.categoria))];
    const totales = categorias.map((c) =>
      gastos.filter((g) => g.categoria === c)
            .reduce((sum, g) => sum + Number(g.monto), 0)
    );
    const backgroundColors = categorias.map((_, index) => COLOR_PALETTE[index % COLOR_PALETTE.length]);

    chartRef.current = new Chart(ctxPie, {
      type: "doughnut",
      data: { labels: categorias, datasets: [{ label: "Distribución de Gastos", data: totales, backgroundColor: backgroundColors, borderColor:'#fff', borderWidth:2 }] },
      options: { responsive: true, plugins:{ legend:{ position: "bottom" }, title:{ display:true, text:'Distribución de Gastos por Categoría' } } },
    });

    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, [gastos]);

  return (
    <div style={{ marginTop:"30px" }}>
      <h2>📊 Resumen por Categoría</h2>
      <canvas ref={pieCanvasRef}></canvas>
    </div>
  );
}

export default ResumenGastos;
