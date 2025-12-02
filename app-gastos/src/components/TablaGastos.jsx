function TablaGastos({ gastos, eliminarGasto }) {
    return (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Persona</th>
                    <th>Categoría</th>
                    <th>Proyecto</th>
                    <th>Monto</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {gastos.map(g => (
                    <tr key={g.id}>
                        <td>{g.fecha}</td>
                        <td>{g.persona}</td>
                        <td>{g.categoria}</td>
                        <td>{g.proyecto}</td>
                        <td>${g.monto.toLocaleString()}</td>
                        <td>
                            <button onClick={() => eliminarGasto(g.id)}>❌</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default TablaGastos;
