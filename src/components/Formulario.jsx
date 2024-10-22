import { useState } from "react";
import { v4 as uuid } from "uuid";

const Formulario = ({ dispatch }) => {
  //Agregamos un estado para almacenar los datos.
  const [data, setData] = useState({ nombre: "", numero: "" });

  //Desestructuramos los valores del estado data
  const { nombre, numero } = data;

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  //Definimos el objeto action para Add
  const actionAdd = {
    type: "add",
    payload: {
      id: uuid(),
      nombre,
      numero,
    },
  };

  const handleAdd = (e) => {
    e.preventDefault();
    dispatch(actionAdd);
  };

  return (
    <div className="container">
      <label htmlFor="mx-1 d-grid gap-2">
        Nombre
        <input
          onChange={handleChange}
          type="text"
          name="nombre"
          value={nombre}
          className="form-control"
        />
      </label>
      <label htmlFor="mx-1 d-grid gap-2">
        Numero
        <input
          onChange={handleChange}
          name="numero"
          value={numero}
          type="text"
          className="form-control"
        />
      </label>
      <div className="mx-1 d-grid gap-2">
        <button onClick={handleAdd} className="btn btn-info mt-2">
          Agregar
        </button>
      </div>
    </div>
  );
};

export default Formulario;
