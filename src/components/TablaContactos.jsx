const TablaContactos = ({ contactos = [], dispatch, setSelectedContact }) => {
  const handleDelete = (id) => {
    const deleteAction = {
      type: "delete",
      payload: id,
    };

    dispatch(deleteAction);
  };

  const handleEdit = (contacto) => {
    setSelectedContact(contacto);
  };

  // Función para calcular la edad a partir de la fecha de nacimiento
  const calcularEdad = (cumpleaños) => {
    const today = new Date();
    const birthDate = new Date(cumpleaños);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Numero</th>
          <th>Sexo</th>
          <th>Cumpleaños</th>
          <th>Edad</th>
          <th>Imagen</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {contactos.map((contacto) => {
          const finalId = contacto.id.split("-");
          return (
            <tr key={contacto.id}>
              <th>{finalId[0]}</th>
              <td>{contacto.nombre}</td>
              <td>{contacto.numero}</td>
              <td>{contacto.sexo}</td>
              <td>{contacto.cumpleaños}</td>
              <td>{calcularEdad(contacto.cumpleaños)} años</td>
              <td>
                <img
                  src={contacto.imagen}
                  alt="avatar"
                  style={{ width: "50px", height: "50px" }}
                />
              </td>
              <td>
                <button
                  onClick={() => handleEdit(contacto)}
                  className="btn btn-warning"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(contacto.id)}
                  className="btn btn-danger"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TablaContactos;
