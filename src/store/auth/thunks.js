import { CheckingCredentials, login, logout } from './authSlice';

var URLuser = 'URLusuario';

// Función reutilizable para realizar solicitudes HTTP
const fetchData = async (url, method, body) => {
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error('Error en la conexión con el servidor');
  }

  return await response.json();
};

// Thunk para iniciar sesión con DNI y contraseña
export const startLoginWithDniAndPassword = ({ dni, password }) => {
  return async (dispatch) => {
    dispatch(CheckingCredentials()); // Cambia el estado a "checking"

    const url = `${URL}`; // URL de la API

    try {
    
      const data = await fetchData(url, 'POST', { dni, password });

      if (!data) {
        throw new Error('Error en la autenticación');
      }

      if (!data.activo) {
        throw new Error('El usuario no está activo.');
      }

   
      dispatch(
        login({
          uid: data.idUsuario,
          username: data.userName,
          rol: data.rol,
          nombre: data.nombre,
          apellido: data.apellido,
        })
      );

      return data; 
    } catch (error) {
      dispatch(logout({ errorMessage: error.message })); 
      return null; 
    }
  };
};
