/*
 Reducer de Contactos como función que recibe dos parametros que son un state y un action.
*/

export const contactosReducer = (state, action) => {
  switch (action.type) {
    case "add":
      return [...state, action.payload];
    case "delete":
      return state.filter((contacto) => contacto.id !== action.payload);
    default:
      return state;
  }
};
