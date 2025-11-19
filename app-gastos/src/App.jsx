import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient"; // Asegúrate de que este archivo exista
import Home from "./pages/Home";
import "./styles/styles.css";

function App() {
  const [gastos, setGastos] = useState([]);

  // CARGAR DATOS: Se ejecuta una vez al abrir la app para traer los datos de Supabase
  useEffect(() => {
    fetchGastos();
  }, []);

  const fetchGastos = async () => {
    // Pedimos a Supabase todos los gastos
    const { data, error } = await supabase
      .from('gastos')
      .select('*')
      .order('fecha', { ascending: false }); 

    if (error) {
      console.error("Error cargando gastos:", error);
    } else {
      setGastos(data);
    }
  };

  // AGREGAR GASTO: Guarda el gasto en la nube
  const agregarGasto = async (nuevoGasto) => {
    const { data, error } = await supabase
      .from('gastos')
      .insert([{
          monto: parseFloat(nuevoGasto.monto), // Aseguramos que sea número
          categoria: nuevoGasto.categoria,
          fecha: nuevoGasto.fecha,
          persona: nuevoGasto.persona // ✨ Campo 'persona' añadido
      }])
      .select(); 

    if (error) {
      console.error("Error al guardar:", error);
    } else {
      // Agregamos el nuevo gasto (data[0]) a la lista sin recargar
      setGastos((prev) => [data[0], ...prev]);
    }
  };

  // ELIMINAR GASTO: Borra de la nube
  const eliminarGasto = async (id) => {
    const { error } = await supabase
      .from('gastos')
      .delete()
      .eq('id', id); // Busca el gasto por su ID

    if (error) {
      console.error("Error al eliminar:", error);
    } else {
      // Si borró bien, lo quitamos de la pantalla
      setGastos((prev) => prev.filter((g) => g.id !== id));
    }
  };

  return (
    <div className="container">
      <h1>App de Gastos de Viaje</h1>
      <Home
        gastos={gastos}
        agregarGasto={agregarGasto}
        eliminarGasto={eliminarGasto}
      />
    </div>
  );
}

export default App;