<template>
  <div class="register">
    <div class="register-container">
      <h2>Registrar Usuario</h2>
      <form @submit.prevent="register">
        <div class="form-group">
          <label for="nombre_usuario">Nombre Completo</label>
          <input type="text" id="nombre" v-model="user.nombre" required />
        </div>
        <div class="form-group">
          <label for="nombre_usuario">Nombre de Usuario</label>
          <input type="text" id="nombre_usuario" v-model="user.nombre_usuario" required />
        </div>
        <div class="form-group">
          <label for="correo_electronico">Correo Electrónico</label>
          <input type="email" id="correo_electronico" v-model="user.correo_electronico" required />
        </div>
        <div class="form-group">
          <label for="contraseña">Contraseña</label>
          <input type="password" id="contrasena" v-model="user.contrasena" required />
        </div>
        <div class="form-group">
          <label for="numero_telefonico">Número Telefónico</label>
          <input type="text" id="numero_telefonico" v-model="user.numero_telefonico" required />
        </div>
        <button type="submit">Registrar</button>
      </form>
      <p>¿Ya tienes una cuenta? <router-link to="/login">Inicia sesión</router-link></p>
    </div>
  </div>
</template>

<script>
import api from "../api/api.js"

export default {
  data() {
    return {
      user: {
        nombre: "",
        nombre_usuario: "",
        correo_electronico: "",
        contrasena: "",
        numero_telefonico: "",
      },
    };
  },
  methods: {
  async register() {
    try {
      const userWithStatus = { ...this.user, estatus: "Activo" };
      console.log("Usuario a registrar:", userWithStatus);  // Verifica los datos antes de enviarlos

      const response = await api.registerUser(userWithStatus);
      alert("Usuario registrado con éxito: " + response.nombre_usuario);
      this.$router.push("/login");
    } catch (error) {
      console.error("Error en el registro:", error);
      alert("Error en el registro: " + (error.response?.data?.detail || "Desconocido"));
    }
  },
}


};
</script>

  
  <style scoped>
  /* Contenedor principal con imagen de fondo difuminada y sombreada */
  .register {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow: hidden;
    background: url('@/assets/Fondo_login.jpg') no-repeat center center/cover;
  }
  
  /* Capa de difuminado adicional para mejor visibilidad */
  .register::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); /* Oscurece un poco */
    backdrop-filter: blur(10px);
    box-shadow: inset 0 0 60px rgba(0, 0, 0, 0.3); /* Sombra en los bordes */
  }
  
  /* Caja del formulario */
  .register-container {
    position: relative;
    z-index: 1;
    background: rgba(255, 255, 255, 0.1);
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
    width: 400px;
    text-align: center;
    backdrop-filter: blur(12px);
    animation: fadeIn 1s ease-in-out;
    color: white;
  }
  
  /* Animación de entrada */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Título */
  h2 {
    margin-bottom: 20px;
  }
  
  /* Inputs */
  .form-group {
    margin-bottom: 15px;
    text-align: left;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
  }
  
  .form-group input {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
    outline: none;
  }
  
  /* Botón */
  button {
    width: 100%;
    padding: 12px;
    background: linear-gradient(90deg, #ff000d, #ffd000);
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 18px;
    transition: 0.3s;
  }
  
  button:hover {
    background: linear-gradient(90deg, #ffa600, #ff000d);
    transform: scale(1.05);
  }
  
  /* Enlace */
  p {
    margin-top: 15px;
  }
  
  </style>
  