import axios from "axios";

const API_URL = " http://127.0.0.1:8000"; 

export default {
  // Registro de usuario
  async registerUser(userData) {
    try {
      console.log(`Usuario: ${userData}`);
      const response = await axios.post(`${API_URL}/register`, userData, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(`---Usuario: ${userData}`);
      return response.data;
    } catch (error) {
      console.error("Error en el registro:", error.response?.data || error);
      throw error;
    }
  },

  // Registro de personas
  async registerPersonas(personData) {
    try {
      console.log(`Persona: ${personData}`); // Comillas invertidas añadidas
      const response = await axios.post(`${API_URL}/register-personas`, personData, { // Comillas invertidas añadidas
        headers: { "Content-Type": "application/json" },
      });
      console.log(`Persona registrada: ${personData}`); // Comillas invertidas añadidas
      return response.data;
    } catch (error) {
      console.error("Error en el registro de personas:", error.response?.data || error);
      throw error;
    }
  },

  // Login de usuario
  async loginUser(username, password) {
    try {
      const response = await axios.post(`${API_URL}/login`, { username, password }, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data; // Devuelve el token y tipo de token
    } catch (error) {
      console.error("Error en el login:", error.response?.data || error);
      throw error;
    }
  },

   // Obtener usuarios por tipo de transacción y rol
   async obtenerUsuariosPorTransaccion(tipoTransaccion, rol) {
    try {
      const token = localStorage.getItem("token"); // Asegúrate de almacenar el token al hacer login
      const response = await axios.get(`${API_URL}/usuarios-por-transaccion`, {
        params: { tipo_transaccion: tipoTransaccion, rol: rol },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Agregar el token aquí
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener usuarios:", error.response?.data || error);
      throw error;
    }
  },
  
  async registrarTransaccion(transaccionData) {
    try {
      const token = localStorage.getItem("token"); // Obtener token
      const response = await axios.post(`${API_URL}/register-tra/`, transaccionData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Incluir autenticación
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al registrar transacción:", error);  // Imprimir todo el error
      if (error.response) {
        // Si hay una respuesta de error de la API, imprímela
        console.error("Respuesta de error de la API:", error.response.data);
      }
      throw error;
    }
  },

  async obtenerTransacciones(skip = 0, limit = 100, filters = {}) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/obtener-todo`, {
        params: {
          skip,
          limit,
          ...filters // Puedes pasar filtros opcionales aquí
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener transacciones:", error.response?.data || error);
      throw error;
    }
  },
  async obtenerGerentesActivos() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/gerentes/activos`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener gerentes:", error.response?.data || error);
      throw error;
    }
  },

  async registrarSucursal(sucursalData) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${API_URL}/sucursales/`, sucursalData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al registrar sucursal:", error.response?.data || error);
      throw error;
    }
  },

  async actualizarSucursal(sucursalId, sucursalData) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`${API_URL}/sucursales/${sucursalId}`, sucursalData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al actualizar sucursal:", error.response?.data || error);
      throw error;
    }
  }
};