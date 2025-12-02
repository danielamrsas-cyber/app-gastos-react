import * as XLSX from 'xlsx';

export function exportarGastosExcel(gastos) {
  if (!gastos || gastos.length === 0) return;

  const wsData = [
    ["Fecha", "Persona", "Monto", "Categoría", "Proyecto"]
  ];

  gastos.forEach(g => wsData.push([g.fecha, g.persona, g.monto, g.categoria, g.proyecto]));

  const ws = XLSX.utils.aoa_to_sheet(wsData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Gastos");
  XLSX.writeFile(wb, "gastos.xlsx");
}
