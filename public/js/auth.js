// auth.js
// Redirigir al login
function redirigirAlLogin(mensaje) {
  Swal.fire({
    title: 'Sesión expirada',
    text: mensaje || 'Por favor, vuelva a iniciar sesión.',
    icon: 'warning',
    confirmButtonText: 'Ir al login',
  }).then(() => {
    if(typeof handleBeforeUnload === 'function'){
      window.removeEventListener('beforeunload', handleBeforeUnload);
    }
    window.location.href = '/auth/login';
  });
}

// Realizar solicitud protegida con cookie JWT
async function realizarSolicitudProtegida(url, opciones = {}) {
  opciones.credentials = 'include';
  opciones.headers = {
    ...opciones.headers,
    'X-Solicitud-Fetch': 'true'
  };

  try {
    const respuesta = await fetch(url, opciones);
    const contentType = respuesta.headers.get('content-type');

    if (respuesta.status === 401) {
      // Sesión expirada (backend responde con JSON)
      redirigirAlLogin('Sesión expirada. Por favor, vuelve a iniciar sesión.');
      return null;
    }

    if (!respuesta.ok) {
      // Si no es JSON, no se parsea...
      if (contentType && contentType.includes('application/json')) {
        const error = await respuesta.json();
        throw new Error(error.message || 'Error en la solicitud');
      } else {
        throw new Error('Respuesta inesperada del servidor.');
      }
    }

    // Solo parseamos JSON si la respuesta lo es
    if (contentType && contentType.includes('application/json')) {
      return await respuesta.json();
    } else {
      return null; // o error si esperabas JSON siempre
    }

  } catch (error) {
    console.error('Error en la solicitud protegida:', error);
    Swal.fire('Error', error.message || 'No se pudo realizar la solicitud.', 'error');
    return null;
  }
}

