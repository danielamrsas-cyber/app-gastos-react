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
                        <th>Fecha</th>
                        <th>Persona</th>
                        <th>Proyecto</th> {/* NUEVO 🔥 */}
                        <th>Monto</th>
                        <th>Categoría</th>
                        <th>Acción</th>
                    </tr>
                </thead>

                <tbody>
                    {gastos.map(gasto => (
                        <tr key={gasto.id}>
                            <td>{gasto.fecha}</td>
                            <td>{gasto.persona}</td>

                            <td>{gasto.proyecto || "-"}</td> {/* NUEVO 🔥 */}

                            <td>{formatter.format(gasto.monto)}</td>
                            <td>{gasto.categoria}</td>

                            <td>
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
