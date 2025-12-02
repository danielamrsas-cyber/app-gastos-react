import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export async function exportarGastosExcel(gastos) {
  if (!gastos || gastos.length === 0) {
    alert("No hay datos para exportar");
    return;
  }

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Gastos");

  sheet.columns = [
    { header: "ID", key: "id", width: 10 },
    { header: "Fecha", key: "fecha", width: 15 },
    { header: "Monto", key: "monto", width: 10 },
    { header: "Categoría", key: "categoria", width: 20 },
    { header: "Persona", key: "persona", width: 20 },
    { header: "Proyecto", key: "proyecto", width: 30 },
  ];

  gastos.forEach((g) => {
    sheet.addRow({
      id: g.id,
      fecha: g.fecha ? g.fecha.substring(0, 10) : "",
      monto: g.monto,
      categoria: g.categoria,
      persona: g.persona,
      proyecto: g.proyecto,
    });
  });

  sheet.getRow(1).font = { bold: true };

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(blob, `gastos_${new Date().toISOString().slice(0, 10)}.xlsx`);
}
