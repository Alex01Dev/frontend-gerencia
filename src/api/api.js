import axios from "axios";

const API_URL = "http://127.0.0.1:8000"; // Asegúrate de que la URL coincida con tu servidor FastAPI

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
};
