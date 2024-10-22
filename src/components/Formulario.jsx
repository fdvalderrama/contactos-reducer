import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

const Formulario = ({ dispatch, selectedContact = null }) => {
  // Inicializamos el estado con los campos del formulario
  const [data, setData] = useState({
    nombre: "",
    numero: "",
    sexo: "",
    cumpleaños: "",
    imagen: "",
  });
  const { nombre, numero, sexo, cumpleaños, imagen } = data;

  // Efecto para llenar el formulario cuando un contacto es seleccionado para editar
  useEffect(() => {
    if (selectedContact) {
      setData(selectedContact);
    }
  }, [selectedContact]);

  // Validaciones simples
  const isValid = () => {
    return nombre && numero && sexo && cumpleaños && imagen;
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  // Acción para agregar o modificar un contacto
  const handleAddOrEdit = (e) => {
    e.preventDefault();
    if (!isValid()) {
      alert("Por favor complete todos los campos.");
      return;
    }

    const action = {
      type: selectedContact ? "edit" : "add",
      payload: {
        ...data,
        id: selectedContact ? selectedContact.id : uuid(),
      },
    };

    dispatch(action);
    clearForm();
  };

  // Limpiar el formulario
  const clearForm = () => {
    setData({ nombre: "", numero: "", sexo: "", cumpleaños: "", imagen: "" });
  };

  return (
    <div className="container">
      <label htmlFor="nombre">
        Nombre
        <input
          onChange={handleChange}
          type="text"
          name="nombre"
          value={nombre}
          className="form-control"
        />
      </label>
      <label htmlFor="numero">
        Número
        <input
          onChange={handleChange}
          name="numero"
          value={numero}
          type="text"
          className="form-control"
        />
      </label>

      {/* Campo para capturar el sexo */}
      <label htmlFor="sexo">
        Sexo
        <select
          name="sexo"
          value={sexo}
          onChange={handleChange}
          className="form-control"
        >
          <option value="">Seleccionar</option>
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
          <option value="otro">Otro</option>
        </select>
      </label>

      {/* Campo para capturar la fecha de cumpleaños */}
      <label htmlFor="cumpleaños">
        Cumpleaños
        <input
          onChange={handleChange}
          type="date"
          name="cumpleaños"
          value={cumpleaños}
          className="form-control"
        />
      </label>

      {/* Campo para capturar la URL de la imagen */}
      <label htmlFor="imagen">
        Imagen (URL)
        <input
          onChange={handleChange}
          type="url"
          name="imagen"
          value={imagen}
          className="form-control"
        />
      </label>

      <div className="mx-1 d-grid gap-2">
        <button onClick={handleAddOrEdit} className="btn btn-info mt-2">
          {selectedContact ? "Modificar" : "Agregar"}
        </button>
      </div>
    </div>
  );
};

export default Formulario;
