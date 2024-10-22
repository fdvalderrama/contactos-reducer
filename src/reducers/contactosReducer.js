/*
 Reducer de Contactos como función que recibe dos parametros que son un state y un action.
*/

export const contactosReducer = (state, action) => {
  switch (action.type) {
    case "add":
      // Agregar un nuevo contacto
      return [...state, action.payload];
    case "delete":
      // Eliminar un contacto por ID
      return state.filter((contacto) => contacto.id !== action.payload);
    case "edit":
      // Editar un contacto existente
      return state.map((contacto) =>
        contacto.id === action.payload.id ? action.payload : contacto
      );
    default:
      return state;
  }
};
