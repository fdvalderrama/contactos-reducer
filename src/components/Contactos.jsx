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
  //Creamos el hook useReducer para poder utilizar el ReducerContactos pasandole un estado inicial
  const [state, dispatch] = useReducer(contactosReducer, [], init);

  const [formView, setFormView] = useState(false);

  //Agregando un useEffect para guardar en el localStorage
  useEffect(() => {
    localStorage.setItem("contactos", JSON.stringify(state));
  }, [state]);

  return (
    <div className="container mt-3">
      <button
        onClick={() => setFormView(!formView)}
        className="btn btn-success"
      >
        {!formView ? "Agregar Contacto" : "Cerrar formulario"}
      </button>
      {formView && <Formulario dispatch={dispatch} />}
      <TablaContactos contactos={state} dispatch={dispatch} />
    </div>
  );
};

export default Contactos;
