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
              <option value="ingreso">Ingreso</option>
              <option value="egreso">Egreso</option>
            </select>
          </div>
          <div class="form-group">
            <label for="rol">Rol</label>
            <select id="rol" v-model="form.rol" required>
              <option v-if="form.tipoTransaccion === 'ingreso'" value="usuario">Usuario</option>
              <option v-if="form.tipoTransaccion === 'ingreso'" value="visitante">Visitante</option>
              <option v-if="form.tipoTransaccion === 'egreso'" value="colaborador">Colaborador</option>
              <option v-if="form.tipoTransaccion === 'egreso'" value="administrador">Administrador</option>
            </select>
          </div>
          <div class="form-group" v-if="form.rol !== 'visitante'">
            <label for="nombreUsuario">Nombre Usuario</label>
            <input type="text" id="nombreUsuario" v-model="form.nombreUsuario" required />
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
export default {
  props: {
    isVisible: Boolean,
  },
  data() {
    return {
      form: {
        rol: '',
        nombreUsuario: '',
        metodoPago: '',
        monto: '',
        detalles: '',
        estatus: 'procesando',
        tipoTransaccion: 'ingreso',
      },
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    submitForm() {
      this.$emit('submit', this.form);
      this.closeModal();
    },
    handleTransactionTypeChange() {
      // Reset the role when transaction type changes
      this.form.rol = '';
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