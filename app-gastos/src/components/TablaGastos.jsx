const formatter = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' });

const TablaGastos = ({ gastos, eliminarGasto }) => {
  return (
    <div className="contenedor-tabla">
      <h3>Gastos Registrados ({gastos.length})</h3>
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Persona</th>
            <th>Monto</th>
            <th>Categoría</th>
            <th>Proyecto</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {gastos.map(g => (
            <tr key={g.id}>
              <td data-label="Fecha">{g.fecha}</td>
              <td data-label="Persona">{g.persona}</td>
              <td data-label="Monto">{formatter.format(g.monto)}</td>
              <td data-label="Categoría">{g.categoria}</td>
              <td data-label="Proyecto">{g.proyecto}</td>
              <td data-label="Acción">
                <button className="btn-eliminar" onClick={() => eliminarGasto(g.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaGastos;
