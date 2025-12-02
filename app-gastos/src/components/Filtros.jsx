import { useState } from 'react';

const PERSONAS = ["Usuario General", "Julio Castellanos", "Daniel Ospitia", "Equipo Administrativo"];
const CATEGORIAS = [
    "Alimentación","Hidratación","Tiquetes aéreos","Transporte urbano (casa-aeropuerto)",
    "Transporte (aeropuerto-casa)","Transporte Casa -oficina cuando traen herramienta",
    "Transporte en sitio","Alquiler vehiculo","Compra materiales","Atención personal",
    "Dotación","Aseo","Lavanderia","Cafeteria","Papeleria-fotocopias","Combustible",
    "Peajes","Medicamentos"
];

function Filtros({ aplicarFiltros, limpiarFiltros, proyectosUnicos = [] }) {
    const [categoria, setCategoria] = useState('');
    const [desde, setDesde] = useState('');
    const [hasta, setHasta] = useState('');
    const [persona, setPersona] = useState('');
    const [proyecto, setProyecto] = useState('');

    const manejarSubmit = (e) => {
        e.preventDefault();
        aplicarFiltros({ categoria, desde, hasta, persona, proyecto });
    };

    const manejarLimpiar = () => {
        setCategoria('');
        setDesde('');
        setHasta('');
        setPersona('');
        setProyecto('');
        limpiarFiltros();
    };

    return (
        <form onSubmit={manejarSubmit} style={{ marginTop: '20px' }}>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <select value={persona} onChange={e => setPersona(e.target.value)}>
                    <option value="">-- Todas las Personas --</option>
                    {PERSONAS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>

                <select value={categoria} onChange={e => setCategoria(e.target.value)}>
                    <option value="">-- Todas las Categorías --</option>
                    {CATEGORIAS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>

                <select value={proyecto} onChange={e => setProyecto(e.target.value)}>
                    <option value="">-- Todos los Proyectos --</option>
                    {proyectosUnicos.map(p => <option key={p} value={p}>{p}</option>)}
                </select>

                <input type="date" value={desde} onChange={e => setDesde(e.target.value)} />
                <input type="date" value={hasta} onChange={e => setHasta(e.target.value)} />
            </div>

            <div style={{ marginTop: '10px' }}>
                <button type="submit">✅ Aplicar Filtros</button>
                <button type="button" onClick={manejarLimpiar}>♻️ Limpiar Filtros</button>
            </div>
        </form>
    );
}

export default Filtros;
