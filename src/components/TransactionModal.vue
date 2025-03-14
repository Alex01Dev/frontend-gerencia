<template>
    <div class="modal" v-if="isVisible">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>{{ isEdit ? 'Editar Transacción' : 'Nueva Transacción' }}</h2>
        <form @submit.prevent="submitForm">
          <div class="form-group">
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
            <label for="estatus">Estatus</label>
            <input type="text" id="estatus" v-model="form.estatus" required />
          </div>
          <div class="form-group">
            <label for="fechaRegistro">Fecha de Registro</label>
            <input type="date" id="fechaRegistro" v-model="form.fechaRegistro" required />
          </div>
          <div class="form-group">
            <label for="fechaActualizacion">Fecha de Actualización</label>
            <input type="date" id="fechaActualizacion" v-model="form.fechaActualizacion" required />
          </div>
          <button type="submit">{{ isEdit ? 'Actualizar' : 'Guardar' }}</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isVisible: Boolean,
      isEdit: Boolean,
      transaction: Object,
    },
    data() {
      return {
        form: {
          nombreUsuario: '',
          metodoPago: '',
          monto: '',
          estatus: '',
          fechaRegistro: '',
          fechaActualizacion: '',
        },
      };
    },
    watch: {
      transaction: {
        immediate: true,
        handler(newVal) {
          if (newVal) {
            this.form = { ...newVal };
          }
        },
      },
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
      submitForm() {
        this.$emit('submit', this.form);
        this.closeModal();
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
  }
  
  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    cursor: pointer;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
  }
  
  .form-group input {
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