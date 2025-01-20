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

export const startLoginWithDniAndPassword = ({ dni, password }) => {
  return async (dispatch) => {
    dispatch(CheckingCredentials()); 

    const url = `${URL}`; 

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

export const startLogout = () => {
  return async (dispatch) => {
    try {

       await fetchData(`${URL}/logout`, 'POST', {});

      dispatch(logout());
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
    }
  };
};
