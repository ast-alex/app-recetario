// auth.js

// Guardar token en localStorage
function guardarToken(token) {
    localStorage.setItem('token', token);
}

// Obtener token de localStorage
function obtenerToken() {
    return localStorage.getItem('token');
}

// Eliminar token (por ejemplo, para cerrar sesión)
function eliminarToken() {
    localStorage.removeItem('token');
}

// Redirigir si no hay token
function verificarAutenticacion() {
    const token = obtenerToken();
    if (!token) {
        window.location.href = '/login'; // Redirige al login si no hay token
    }
}

// Enviar token en solicitudes protegidas
async function realizarSolicitudProtegida(url, opciones = {}) {
    const token = obtenerToken();

    if (!token) {
        alert('No estás autenticado. Por favor, inicia sesión.');
        window.location.href = '/login';
        return;
    }

    // Agregar el token en los headers
    opciones.headers = {
        ...opciones.headers,
        Authorization: `Bearer ${token}`
    };

    try {
        const respuesta = await fetch(url, opciones);
        if (respuesta.status === 401) {
            alert('Sesión expirada o no autorizado.');
            eliminarToken();
            window.location.href = '/login';
        }
        return await respuesta.json();
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
}
