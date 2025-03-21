<template>
  <div class="modal" v-if="isVisible">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>{{ isEdit ? 'Actualizar Sucursal' : 'Registrar Sucursal' }}</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="nombre">Nombre:</label>
          <input type="text" id="nombre" v-model="sucursal.nombre" required />
        </div>
        <div class="form-group">
          <label for="direccion">Dirección:</label>
          <input type="text" id="direccion" v-model="sucursal.direccion" required />
        </div>
        <div class="form-group">
          <label for="telefono">Teléfono:</label>
          <input type="text" id="telefono" v-model="sucursal.telefono" required />
        </div>
        <div class="form-group">
          <label for="gerenteEncargado">Gerente Encargado:</label>
          <select id="gerenteEncargado" v-model="sucursal.gerenteEncargado" required>
            <option v-for="gerente in gerentes" :key="gerente.id" :value="gerente.id">
              {{ gerente.nombre }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="capacidadMaxima">Capacidad Máxima:</label>
          <input type="number" id="capacidadMaxima" v-model.number="sucursal.capacidadMaxima" required />
        </div>
        <div class="form-group">
          <label for="totalEmpleados">Total de Empleados:</label>
          <input type="number" id="totalEmpleados" v-model.number="sucursal.totalEmpleados" required />
        </div>
        <div class="form-group">
          <label for="horario">Horario:</label>
          <input type="text" id="horario" v-model="sucursal.horario" required />
        </div>
        <div class="form-group">
          <label for="estatus">Estatus:</label>
          <select id="estatus" v-model="sucursal.estatus" required>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>
        <button type="submit">{{ isEdit ? 'Actualizar' : 'Registrar' }}</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: Boolean,
    isEdit: Boolean,
    sucursalData: Object,
    gerentes: Array,
  },
  data() {
    return {
      sucursal: {
        nombre: '',
        direccion: '',
        telefono: '',
        gerenteEncargado: '',
        capacidadMaxima: 0,
        totalEmpleados: 0,
        horario: '',
        estatus: 'Activo',
      },
    };
  },
  watch: {
    isVisible(newVal) {
      if (newVal && !this.isEdit) {
        this.resetForm();
      }
    },
    sucursalData: {
      immediate: true,
      handler(newVal) {
        console.log("Cargando datos de sucursalData:", newVal); // 🔍 Verifica qué datos llegan aquí
        if (newVal && this.isEdit) {
          this.sucursal = { ...newVal };
        } else {
          this.resetForm();
        }
      },
    },
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    
    submitForm() {
      console.log("Datos a validar:", this.sucursal); // 🔍 Para depuración

      // Validación de campos requeridos
      if (
        !this.sucursal.nombre?.trim() ||
        !this.sucursal.direccion?.trim() ||
        !this.sucursal.telefono?.trim() ||
        this.sucursal.gerenteEncargado === '' ||
        this.sucursal.capacidadMaxima <= 0 ||
        this.sucursal.totalEmpleados < 0 ||
        !this.sucursal.horario?.trim() ||
        !this.sucursal.estatus
      ) {
        alert('Por favor, complete todos los campos requeridos correctamente.');
        return;
      }

      // Emitir el evento con los datos limpios
      this.$emit('submit', { ...this.sucursal });
      this.closeModal();
    },

    resetForm() {
      this.sucursal = {
        nombre: '',
        direccion: '',
        telefono: '',
        gerenteEncargado: '',
        capacidadMaxima: 0,
        totalEmpleados: 0,
        horario: '',
        estatus: 'Activo',
      };
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
  max-height: 80%;
  overflow-y: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
}

h2 {
  margin-bottom: 20px;
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
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}

button:hover {
  background-color: #0056b3;
}
</style>
