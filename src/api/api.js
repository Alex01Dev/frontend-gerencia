import axios from "axios";

const API_URL = "http://192.168.1.74:8000"; 

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
};