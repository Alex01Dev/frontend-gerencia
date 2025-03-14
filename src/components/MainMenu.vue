<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <img src="@/assets/logo3.png" alt="GYM Bulls Logo" class="logo" />
      <span class="gym-name">GYM BULLS</span>
    </div>
    <span class="management-title">Gerencia</span>
    <ul class="navbar-menu">
      <li class="navbar-item">
        <router-link to="/home" class="navbar-link">Inicio</router-link>
      </li>
      <li class="navbar-item">
        <router-link to="/sucursales" class="navbar-link">Sucursales</router-link>
      </li>
      <li class="navbar-item">
        <router-link to="/reportes" class="navbar-link">Reportes</router-link>
      </li>
      <li class="navbar-item">
        <router-link to="/dashboard" class="navbar-link">Dashboard</router-link>
      </li>
      <li class="navbar-item">
        <button @click="logout" class="navbar-link logout-btn">Cerrar Sesión</button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'MainMenu',
  methods: {
    logout() {
      localStorage.removeItem('authenticated');
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
/* Navbar base */
.navbar {
  position: fixed; 
  top: 0;
  left: 0;
  width: 100%;
  height: 80px; /* Altura fija del navbar */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  background: linear-gradient(135deg, #1c1c1c, #0c0000); /* Fondo con gradiente */
  color: white;
  z-index: 1000; 
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); /* Sombra suave */
  box-sizing: border-box;
}

/* Contenedor del logo y nombre */
.navbar-brand {
  display: flex;
  align-items: center;
}

.logo {
  height: 45px;
  margin-right: 15px;
}

.gym-name {
  font-size: 1.5rem;
  font-weight: 700; 
  font-family: 'Poppins', sans-serif;
  color: #ff2222;
  text-transform: uppercase;
}

/* Título central */
.management-title {
  font-size: 1.3rem;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
  color: #ff2222;
  position: absolute;
  left: 35%;
  transform: translateX(-50%);
}

/* Menú de navegación */
.navbar-menu {
  display: flex;
  align-items: center;
  list-style: none;
  gap: 10px; 
}

.navbar-link {
  color: white;
  text-decoration: none;
  font-size: 1rem;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-family: 'Montserrat', sans-serif;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.navbar-link:hover {
  background-color: #eb1f1f;
  transform: scale(1.05);
}

.logout-btn {
  background-color: #ff2222;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  transition: background-color 0.3s ease;
}

.logout-btn:hover {
  background-color: #ff0000;
}

@media (max-width: 768px) {
  .navbar {
    padding: 1rem;
  }

  .navbar-menu {
    flex-direction: column;
    gap: 10px;
  }

  .management-title {
    font-size: 1.1rem;
  }
}
</style>
