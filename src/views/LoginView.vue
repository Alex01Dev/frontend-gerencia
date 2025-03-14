<template>
  <div class="login">
    <div class="background-overlay"></div>
    <div class="login-container animate-fade-in">
      <h1 class="inicio">Iniciar Sesión</h1>
      <h2>¡Bienvenido!</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username">Usuario</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div class="form-group">
          <label for="password">Contraseña</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Ingresar</button>
      </form>
      <p>
        ¿No tienes una cuenta? <router-link to="/register">Regístrate</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import api from "../api/api.js"; // Asegúrate de importar correctamente api.js

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        // Llamada a la API para autenticar al usuario
        const response = await api.loginUser(this.username, this.password);

        if (response && response.access_token) {
          // Si la respuesta contiene un token, guardarlo en el almacenamiento local
          localStorage.setItem("authenticated", true);
          localStorage.setItem("token", response.access_token); // Guardar el token

          // Redirigir al usuario al home o página deseada
          this.$router.push("/home");
        } else {
          alert("Usuario o contraseña incorrectos");
        }
      } catch (error) {
        alert("Hubo un error al intentar iniciar sesión. Intenta nuevamente.");
      }
    },
  },
};
</script>



<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: url('@/assets/Fondo_login.jpg') no-repeat center center/cover;
}

.background-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
}
.inicio{
  color: white;
}
.login-container {
  position: relative;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  width: 400px;
  text-align: center;
  backdrop-filter: blur(12px);
  animation: fadeIn 1s ease-in-out;
}

h2 {
  margin-bottom: 20px;
  color: #ffffff;
  font-size: 24px;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #ddd;
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

.form-group input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

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

p {
  margin-top: 15px;
  color: #ddd;
}

router-link {
  color: #00c6ff;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s;
}

router-link:hover {
  color: #ffffff;
  text-decoration: underline;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
