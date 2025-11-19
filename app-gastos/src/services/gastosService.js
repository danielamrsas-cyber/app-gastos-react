export const cargarGastosLocal = () => {
  const data = localStorage.getItem("gastos");
  return data ? JSON.parse(data) : [];
};

export const guardarGastosLocal = (gastos) => {
  localStorage.setItem("gastos", JSON.stringify(gastos));
};
