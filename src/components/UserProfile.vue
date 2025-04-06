<template>
  <div class="profile-card">
    <div class="profile-header">
      <h1>Perfil de Usuario</h1>
    </div>
    <div class="profile-content">
      <!-- Contenedor para la foto y la información -->
      <div class="profile-main">
        <!-- Foto de perfil -->
        <div class="profile-avatar">
          <img :src="fotoPerfil" alt="Foto de perfil" class="avatar" />
        </div>
        <!-- Información del usuario -->
        <div class="profile-info">
          <div class="info-item">
            <span class="info-icon">👤</span>
            <span class="info-text"><strong>Nombre:</strong> {{ nombreCompleto }}</span>
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
            <span class="info-icon">📞</span>
            <span class="info-text"><strong>Teléfono:</strong> {{ telefono }}</span>
          </div>
          <div class="info-item">
            <span class="info-icon">🔑</span>
            <span class="info-text"><strong>Rol:</strong> {{ rol }}</span>
          </div>
        </div>
      </div>
      <!-- Botón para abrir el modal -->
      <button class="edit-button" @click="abrirModal">Editar Perfil</button>
    </div>

    <!-- Modal de edición -->
    <div v-if="mostrarModal" class="modal-overlay">
      <div class="modal">
        <h2>Editar Perfil</h2>
        <!-- Formulario de edición -->
        <div class="form-group">
          <label for="telefono">Teléfono:</label>
          <input type="text" id="telefono" v-model="telefonoEditado" />
        </div>
        <div class="form-group">
          <label for="direccion">Dirección:</label>
          <input type="text" id="direccion" v-model="direccionEditada" />
        </div>
        <div class="form-group">
          <label for="foto">Cambiar Foto:</label>
          <input type="file" id="foto" @change="cambiarFoto" accept="image/*" />
        </div>
        <!-- Botones del modal -->
        <div class="modal-buttons">
          <button class="save-button" @click="guardarCambios">Guardar Cambios</button>
          <button class="cancel-button" @click="cerrarModal">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../api/api.js";  // Asegúrate de importar el archivo de servicios correctamente

export default {
  name: 'UserProfile',
  data() {
    return {
      nombreCompleto: '',
    fechaRegistro: '',
    fechaNacimiento: '',
    correo: '',
    telefono: '',
    rol: '',
      fotoPerfil: require('@/assets/Perfil.jpg'), // Imagen por defecto
      mostrarModal: false,
      telefonoEditado: '',
      direccionEditada: '',
    };
  },
  mounted() {
    this.obtenerUsuario();
  },
  methods: {
    async obtenerUsuario() {
      try {
    const datos = await api.obtenerUsuarioConPersona(); // Asegúrate de pasar el nombre de usuario si es necesario
    console.log("Datos del usuario y persona:", datos);

    const { usuario, persona } = datos;

    this.nombreCompleto = `${persona.nombre} ${persona.apellido} ${persona.segundo_apellido}`;
    this.fechaRegistro = usuario.fecha_registro;
    this.fechaNacimiento = persona.fecha_nacimiento;
    this.correo = usuario.correo;
    this.telefono = persona.telefono;
    this.rol = usuario.Rol;

  } catch (err) {
    console.error("Error al cargar datos del usuario:", err);
  }
    },
    abrirModal() {
      this.telefonoEditado = this.telefono;
      this.direccionEditada = this.direccion;
      this.mostrarModal = true;
    },
    cerrarModal() {
      this.mostrarModal = false;
    },
    guardarCambios() {
      this.telefono = this.telefonoEditado;
      this.direccion = this.direccionEditada;
      this.cerrarModal();
    },
    cambiarFoto(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.fotoPerfil = e.target.result; // Actualiza la foto de perfil
        };
        reader.readAsDataURL(file); // Convierte la imagen a base64
      }
    },
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
  max-width: 800px; /* Aumentamos el ancho máximo */
  width: 100%;
  animation: fadeIn 0.5s ease-in-out;
  margin: 20px auto; /* Ajustamos el margen superior */
  margin-top: -165px; /* Ajustamos el margen superior */
  padding: 0px;
}

/* Encabezado de la tarjeta */
.profile-header {
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: white;
  padding: 20px;
  text-align: center;
  border-radius: 15px 15px 0 0;
}

.profile-header h1 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
}

/* Contenido de la tarjeta */
.profile-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Contenedor principal para la foto y la información */
.profile-main {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  gap: 20px; /* Espacio entre la foto y la información */
}

/* Avatar */
.profile-avatar {
  flex: 1;
  max-width: 150px;
}

.avatar {
  width: 100%;
  height: auto;
  border-radius: 50%;
  border: 4px solid #007bff;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

/* Información del usuario */
.profile-info {
  flex: 2;
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

/* Botón de editar */
.edit-button {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  transition: background 0.3s ease;
}

.edit-button:hover {
  background: #0056b3;
}

/* Modal de edición */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 10px;
  padding: 20px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.modal h2 {
  margin-bottom: 20px;
  font-size: 20px;
  color: #007bff;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
  color: #333333;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.save-button {
  background: #28a745;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.save-button:hover {
  background: #218838;
}

.cancel-button {
  background: #dc3545;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.cancel-button:hover {
  background: #c82333;
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

/* Responsive Design */
@media (max-width: 768px) {
  .profile-main {
    flex-direction: column;
    align-items: center;
  }

  .profile-avatar {
    max-width: 100%;
    margin-bottom: 20px;
  }

  .profile-info {
    text-align: center;
  }

  .info-item {
    justify-content: center;
  }
}
</style>