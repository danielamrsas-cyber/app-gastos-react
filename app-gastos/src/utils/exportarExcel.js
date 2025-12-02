import * as XLSX from "xlsx";

export function exportarGastosExcel(gastos) {
    if (!gastos || gastos.length === 0) return alert("No hay datos para exportar");

    const wsData = gastos.map(g => ({
        Fecha: g.fecha,
        Persona: g.persona,
        Categoría: g.categoria,
        Proyecto: g.proyecto || "",
        Monto: g.monto
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, "Gastos");
    XLSX.writeFile(wb, "Gastos.xlsx");
}
