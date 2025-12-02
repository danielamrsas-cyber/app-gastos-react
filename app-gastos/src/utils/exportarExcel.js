import * as XLSX from "xlsx";

export function exportarGastosExcel(gastos) {
  if (!gastos || gastos.length === 0) {
    alert("No hay datos para exportar");
    return;
  }

  const datosParaExcel = gastos.map((g) => ({
    Fecha: g.fecha,
    Categoría: g.categoria,
    Persona: g.persona,
    Proyecto: g.proyecto || "",
    Descripción: g.descripcion || "",
    Monto: g.monto
  }));

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(datosParaExcel);
  XLSX.utils.book_append_sheet(wb, ws, "Gastos");

  const fecha = new Date().toISOString().split("T")[0];
  XLSX.writeFile(wb, `Gastos_${fecha}.xlsx`);
}
