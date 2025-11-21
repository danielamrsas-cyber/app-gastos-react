import { useState } from 'react';

// 👥 LISTA DE PERSONAS (Duplicada aquí para el filtro)
const PERSONAS = ["Usuario General", "Julio Castellanos", "Daniel Ospitia", "Equipo Administrativo"]; 
// 🎯 LISTA DE CATEGORÍAS (Usada para el filtro de Categoría)
const CATEGORIAS = [
    "Alimentación", 
    "Hidratación", 
    "Tiquetes aéreos", 
    "Transporte urbano (casa-aeropuerto)",
    "Transporte (aeropuerto-casa)",
    "Transporte Casa -oficina cuando traen herramienta",
    "Transporte en sitio",
    "Alquiler vehiculo",
    "Compra materiales",
    "Atención personal",
    "Dotación",
    "Aseo",
    "Lavanderia",
    "Cafeteria",
    "Papeleria-fotocopias",
    "Combustible",
    "Peajes",
    "Medicamentos"
];

// ✔️ 1. Agregar proyectosUnicos como prop
function Filtros({ aplicarFiltros, limpiarFiltros, proyectosUnicos = [] }) {

    const [categoria, setCategoria] = useState('');
    const [desde, setDesde] = useState('');
    const [hasta, setHasta] = useState('');
    const [persona, setPersona] = useState('');

    // ✔️ 2. NUEVO estado para proyecto
    const [proyecto, setProyecto] = useState('');

    const manejarSubmit = (e) => {
        e.preventDefault();

        // ✔️ 3A. Enviar proyecto junto a los demás filtros
        aplicarFiltros({ categoria, desde, hasta, persona, proyecto });
    };

    const manejarLimpiar = () => {
        setCategoria('');
        setDesde('');
        setHasta('');
        setPersona('');
        // ✔️ 3B. Limpiar también el proyecto
        setProyecto('');
        limpiarFiltros();
    };

    return (
        <form onSubmit={manejarSubmit} className="form-analisis" style={{ marginTop: '20px' }}>
            <h3>Filtros de Gastos</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6">
                
                {/* 1. FILTRO POR PERSONA */}
                <div className="form-group">
                    <label>Pagado por:</label>
                    <select 
                        value={persona} 
                        onChange={(e) => setPersona(e.target.value)}
                    >
                        <option value="">-- Todas las Personas --</option>
                        {PERSONAS.map(p => (
                            <option key={`f-${p}`} value={p}>{p}</option>
                        ))}
                    </select>
                </div>

                {/* 2. FILTRO POR CATEGORÍA */}
                <div className="form-group">
                    <label>Categoría:</label>
                    <select 
                        value={categoria} 
                        onChange={(e) => setCategoria(e.target.value)}
                    >
                        <option value="">-- Todas las Categorías --</option>
                        {CATEGORIAS.map(c => (
                            <option key={`f-${c}`} value={c}>{c}</option>
                        ))}
                    </select>
                </div>

                {/* ✔️ 4. NUEVO FILTRO POR PROYECTO */}
                <div className="form-group">
                    <label>Proyecto:</label>
                    <select 
                        value={proyecto} 
                        onChange={(e) => setProyecto(e.target.value)}
                    >
                        <option value="">-- Todos los Proyectos --</option>

                        {/* Mapeamos la lista de proyectos únicos pasada desde Home */}
                        {proyectosUnicos.map((proj) => (
                            <option key={proj} value={proj}>{proj}</option>
                        ))}
                    </select>
                </div>

                {/* 3. FILTRO POR FECHA DESDE */}
                <div className="form-group">
                    <label>Desde:</label>
                    <input
                        type="date"
                        value={desde}
                        onChange={(e) => setDesde(e.target.value)}
                    />
                </div>

                {/* 4. FILTRO POR FECHA HASTA */}
                <div className="form-group">
                    <label>Hasta:</label>
                    <input
                        type="date"
                        value={hasta}
                        onChange={(e) => setHasta(e.target.value)}
                    />
                </div>
            </div>

            <div className="mt-8 flex gap-3">
                <button 
                    type="submit" 
                    className="flex-1 bg-sky-600 text-white px-4 py-2 rounded shadow hover:bg-sky-700 text-sm font-semibold transition"
                >
                    ✅ Aplicar Filtros
                </button>

                <button 
                    type="button" 
                    onClick={manejarLimpiar} 
                    className="flex-1 bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 text-sm font-semibold transition"
                >
                    ♻️ Limpiar Filtros
                </button>
            </div>
        </form>
    );
}

export default Filtros;
