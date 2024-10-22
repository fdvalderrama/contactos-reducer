import { useEffect, useReducer, useState } from "react";
import TablaContactos from "./TablaContactos";
import Formulario from "./Formulario";
import { contactosReducer } from "../reducers/contactosReducer";

const init = () => {
  // Definimos el localStorage
  const contactos = localStorage.getItem("contactos");
  return contactos ? JSON.parse(contactos) : [];
};

const Contactos = () => {
  // Creamos el hook useReducer para manejar el estado de los contactos
  const [state, dispatch] = useReducer(contactosReducer, [], init);

  // Estado para manejar la vista del formulario
  const [formView, setFormView] = useState(false);

  // Estado para manejar el contacto seleccionado para editar
  const [selectedContact, setSelectedContact] = useState(null);

  // Efecto para guardar los contactos en localStorage cuando cambie el estado
  useEffect(() => {
    localStorage.setItem("contactos", JSON.stringify(state));
  }, [state]);

  // Función para manejar el cierre del formulario
  const handleCloseForm = () => {
    setFormView(false);
    setSelectedContact(null); // Limpiamos el contacto seleccionado al cerrar el formulario
  };

  return (
    <div className="container mt-3">
      <button
        onClick={() => setFormView(!formView)}
        className="btn btn-success"
      >
        {!formView ? "Agregar Contacto" : "Cerrar formulario"}
      </button>
      {formView && (
        <Formulario
          dispatch={dispatch}
          selectedContact={selectedContact}
          handleCloseForm={handleCloseForm}
        />
      )}
      <TablaContactos
        contactos={state}
        dispatch={dispatch}
        setSelectedContact={(contacto) => {
          setSelectedContact(contacto);
          setFormView(true); // Mostramos el formulario cuando se selecciona un contacto
        }}
      />
    </div>
  );
};

export default Contactos;
