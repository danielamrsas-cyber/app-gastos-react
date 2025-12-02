import { useState } from "react";

const categorias = [
    "Alimentación","Hidratación","Tiquetes aéreos","Transporte urbano (casa-aeropuerto)",
    "Transporte (aeropuerto-casa)","Transporte Casa -oficina cuando traen herramienta",
    "Transporte en sitio","Alquiler vehiculo","Compra materiales","Atención personal",
    "Dotación","Aseo","Lavanderia","Cafeteria","Papeleria-fotocopias","Combustible",
    "Peajes","Medicamentos"
];

const personas = ["Usuario General", "Julio Castellanos", "Daniel Ospitia", "Equipo Administrativo"];

function FormularioGastos({ agregarGasto }) {
    const [monto, setMonto] = useState("");
    const [categoria, setCategoria] = useState("");
    const [persona, setPersona] = useState("");
    const [fecha, setFecha] = useState("");
    const [proyecto, setProyecto] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!monto || !categoria || !persona || !fecha) return;
        agregarGasto({ monto: Number(monto), categoria, persona, fecha, proyecto });
        setMonto(""); setCategoria(""); setPersona(""); setFecha(""); setProyecto("");
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
            <input type="number" placeholder="Monto" value={monto} onChange={e => setMonto(e.target.value)} required />
            <select value={categoria} onChange={e => setCategoria(e.target.value)} required>
                <option value="">-- Seleccione Categoría --</option>
                {categorias.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={persona} onChange={e => setPersona(e.target.value)} required>
                <option value="">-- Seleccione Persona --</option>
                {personas.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} required />
            <input type="text" placeholder="Proyecto (opcional)" value={proyecto} onChange={e => setProyecto(e.target.value)} />
            <button type="submit">➕ Agregar Gasto</button>
        </form>
    );
}

export default FormularioGastos;
