// Nota: La divisa puede ajustarse según tu país (e.g., 'USD', 'COP', 'MXN')
const formatter = new Intl.NumberFormat('es-CO', { 
    style: 'currency', 
    currency: 'COP', 
});

const TablaGastos = ({ gastos, eliminarGasto }) => {
    return (
        <div className="contenedor-tabla">
            <h3>Gastos Registrados ({gastos.length})</h3>

            <table>
                <thead>
                    <tr>
                        {/* ✨ Nueva columna Persona */}
                        <th>Fecha</th>
                        <th>Persona</th>
                        <th>Monto</th>
                        <th>Categoría</th>
                        <th>Acción</th>
                    </tr>
                </thead>

                <tbody>
                    {gastos.map(gasto => (
                        <tr key={gasto.id}>
                            <td data-label="Fecha">{gasto.fecha}</td>

                            {/* ✨ Muestra el nombre */}
                            <td data-label="Persona">{gasto.persona}</td>

                            <td data-label="Monto">
                                {formatter.format(gasto.monto)}
                            </td>

                            <td data-label="Categoría">{gasto.categoria}</td>

                            <td data-label="Acción">
                                <button 
                                    className="btn-eliminar"
                                    onClick={() => eliminarGasto(gasto.id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TablaGastos;
