function TablaGastos({ gastos, eliminarGasto }) {
  if (!gastos || gastos.length === 0) return <p>No hay gastos para mostrar</p>;

  return (
    <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
      <thead>
        <tr style={{ background: "#f0f0f0" }}>
          <th>Fecha</th>
          <th>Persona</th>
          <th>Categoría</th>
          <th>Proyecto</th>
          <th>Descripción</th>
          <th>Monto</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {gastos.map((g) => (
          <tr key={g.id} style={{ borderBottom: "1px solid #ddd" }}>
            <td>{g.fecha}</td>
            <td>{g.persona}</td>
            <td>{g.categoria}</td>
            <td>{g.proyecto}</td>
            <td>{g.descripcion}</td>
            <td>{g.monto}</td>
            <td>
              <button onClick={() => eliminarGasto(g.id)} style={{ cursor: "pointer" }}>❌</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TablaGastos;
