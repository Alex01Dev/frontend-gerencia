<template>
  <div class="modal" v-if="isVisible">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>Nueva Transacción</h2>
      <div class="form-container">
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="tipoTransaccion">Tipo de Transacción</label>
            <select id="tipoTransaccion" v-model="form.tipoTransaccion" @change="handleTransactionTypeChange" required>
              <option value="Ingreso">Ingreso</option>
              <option value="Egreso">Egreso</option>
            </select>
          </div>
          <div class="form-group">
            <label for="rol">Rol</label>
            <select id="rol" v-model="form.rol" @change="fetchUsuarios" required>
              <option v-if="form.tipoTransaccion === 'Ingreso'" value="Cliente">Cliente</option>
              <option v-if="form.tipoTransaccion === 'Ingreso'" value="Visitante">Visitante</option>
              <option v-if="form.tipoTransaccion === 'Egreso'" value="Colaborador">Colaborador</option>
              <option v-if="form.tipoTransaccion === 'Egreso'" value="Administrador">Administrador</option>
            </select>
          </div>
          <div class="form-group" v-if="form.rol !== 'Visitante'">
            <label for="nombreUsuario">Nombre Usuario</label>
            <select id="nombreUsuario" v-model="form.nombreUsuario" required>
              <option value="" disabled>Selecciona un usuario</option> <!-- Opción por defecto -->
              <option v-for="usuario in usuarios" :key="usuario.id" :value="usuario.id">
                {{ usuario.nombre_usuario }} <!-- Muestra el nombre_usuario -->
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="metodoPago">Método de Pago</label>
            <input type="text" id="metodoPago" v-model="form.metodoPago" required />
          </div>
          <div class="form-group">
            <label for="monto">Monto</label>
            <input type="number" id="monto" v-model="form.monto" required />
          </div>
          <div class="form-group">
            <label for="detalles">Detalles</label>
            <input type="text" id="detalles" v-model="form.detalles" required />
          </div>
          <button type="submit">Guardar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/api.js";

export default {
  props: {
    isVisible: Boolean,
  },
  data() {
    return {
      form: {
        rol: '',
        nombreUsuario: '', // Este ahora almacenará el user_id
        metodoPago: '',
        monto: '',
        detalles: '',
        estatus: 'Procesando',
        tipoTransaccion: 'Ingreso',
      },
      usuarios: [],
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    async fetchUsuarios() {
      if (this.form.rol && this.form.rol !== 'Visitante') {
        try {
          const response = await api.obtenerUsuariosPorTransaccion(this.form.tipoTransaccion, this.form.rol);
          console.log("Usuarios obtenidos:", response);
          
          // Guardamos los objetos completos
          this.usuarios = response;
        } catch (error) {
          console.error("Error al cargar usuarios:", error);
          this.usuarios = [];
        }
      } else {
        this.usuarios = [];
      }
    },
    async submitForm() {
      try {
        const transaccionData = {
          tipo_transaccion: this.form.tipoTransaccion,
          usuario_id: this.form.nombreUsuario, // Aquí es el user_id
          metodo_pago: this.form.metodoPago,
          monto: parseFloat(this.form.monto),
          detalles: this.form.detalles,
          estatus: this.form.estatus,
        };

        console.log("Datos a enviar:", transaccionData);  

        const response = await api.registrarTransaccion(transaccionData);
        console.log("Transacción registrada:", response);

        this.$emit("submit", transaccionData);
        this.closeModal();
      } catch (error) {
        console.error("Error al registrar transacción:", error);
      }
    },
    handleTransactionTypeChange() {
      this.form.rol = '';
      this.usuarios = [];
    },
  },
};
</script>


<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  max-height: 90%; /* Limita la altura máxima del contenido del modal */
  overflow-y: auto; /* Habilita el desplazamiento vertical */
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
}

.form-container {
  max-height: 70vh; /* Limita la altura máxima del contenedor del formulario */
  overflow-y: auto; /* Habilita el desplazamiento vertical */
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button {
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>