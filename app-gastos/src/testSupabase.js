// src/testSupabase.js
import { supabase } from "./supabaseClient"; // <- CORRECCIÓN: antes './lib/supabaseClient'

async function testConnection() {
  const { data, error } = await supabase.from("gastos").select("*");
  if (error) console.error("Error:", error);
  else console.log("Conexión exitosa, datos:", data);
}

testConnection();
