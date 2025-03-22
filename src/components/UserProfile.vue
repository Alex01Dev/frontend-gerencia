<template>
    <div class="profile-card">
      <div class="profile-header">
        <h1>Perfil de Usuario</h1>
      </div>
      <div class="profile-content">
        <!-- Foto de perfil -->
        <div class="profile-avatar">
          <img src="@/assets/Perfil.jpg" alt="Foto de perfil" class="avatar" />
        </div>
        <!-- Información del usuario -->
        <div class="profile-info">
          <div class="info-item">
            <span class="info-icon">👤</span>
            <span class="info-text"><strong>Nombre:</strong> {{ nombre }}</span>
          </div>
          <div class="info-item">
            <span class="info-icon">📅</span>
            <span class="info-text"><strong>Fecha de Registro:</strong> {{ fechaRegistro }}</span>
          </div>
          <div class="info-item">
            <span class="info-icon">🎂</span>
            <span class="info-text"><strong>Fecha de Nacimiento:</strong> {{ fechaNacimiento }}</span>
          </div>
          <div class="info-item">
            <span class="info-icon">📧</span>
            <span class="info-text"><strong>Correo:</strong> {{ correo }}</span>
          </div>
          <div class="info-item">
            <span class="info-icon">🏠</span>
            <span class="info-text"><strong>Dirección:</strong> {{ direccion }}</span>
          </div>
          <div class="info-item">
            <span class="info-icon">🔑</span>
            <span class="info-text"><strong>Rol:</strong> {{ rol }}</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'UserProfile',
    data() {
      return {
        nombre: 'Juan',
        primerApellido: 'Pérez',
        segundoApellido: 'Gómez',
        fechaRegistro: '2023-10-01',
        fechaNacimiento: '1990-05-15',
        correo: 'juan.perez@example.com',
        direccion: 'Calle Falsa 123, Ciudad, País',
        rol: 'Gerente',
      };
    },
  };
  </script>
  
  <style scoped>
  /* Tarjeta de perfil */
  .profile-card {
    background: #ffffff;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    max-width: 500px;
    width: 100%;
    animation: fadeIn 0.5s ease-in-out;
    margin: 20px auto;
  }
  
  /* Encabezado de la tarjeta */
  .profile-header {
    background: linear-gradient(135deg, #007bff, #0056b3);
    color: white;
    padding: 20px;
    text-align: center;
  }
  
  .profile-header h1 {
    margin: 0;
    font-size: 24px;
    font-weight: 600;
  }
  
  /* Contenido de la tarjeta */
  .profile-content {
    padding: 20px;
    text-align: center;
  }
  
  /* Avatar */
  .profile-avatar {
    margin-bottom: 20px;
  }
  
  .avatar {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 4px solid #007bff;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
  
  /* Información del usuario */
  .profile-info {
    text-align: left;
  }
  
  .info-item {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }
  
  .info-icon {
    font-size: 24px;
    margin-right: 10px;
    color: #007bff;
  }
  
  .info-text {
    font-size: 16px;
    color: #333333;
  }
  
  /* Animación de entrada */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  </style>