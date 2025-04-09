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
          <input type="text" id="telefono" v-model="sucursal.telefono" required pattern="[0-9]{10}"
            title="Ingrese un número de 10 dígitos" />
        </div>
        <div class="form-group">
          <label for="email">Correo:</label>
          <input type="email" id="correo" v-model="sucursal.correo_electronico" required
            title="Ingrese un correo válido" />
        </div>

        <div class="form-group">
  <label for="gerenteEncargado">Gerente Encargado:</label>
  <input
    type="text"
    id="gerenteEncargado"
    v-model="busquedaGerente"
    placeholder="Buscar gerente..."
    @input="buscarGerente"
    class="input"
  />
  
  <ul v-if="gerentesFiltrados.length > 0" class="search-results">
    <li
      v-for="gerente in gerentesFiltrados"
      :key="gerente.id"
      @click="seleccionarGerente(gerente)"
      class="search-item"
    >
      {{ gerente.nombre_usuario }}
    </li>
  </ul>
</div>

        <div class="form-group">
          <label for="capacidadMaxima">Capacidad Máxima:</label>
          <input type="number" id="capacidadMaxima" v-model.number="sucursal.capacidad_maxima" min="1" required />
        </div>

        <div class="form-actions">
          <button type="button" @click="closeModal">Cancelar</button>
          <button type="submit">{{ isEdit ? 'Actualizar' : 'Registrar' }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

import api from "../api/api.js";
export default {
  props: {
    isVisible: Boolean,
    isEdit: Boolean,
    sucursalData: Object,
  },
  data() {
    return {
      sucursal: {
        nombre: '',
        direccion: '',
        telefono: '',
        correo_electronico: '',
        responsable_id: '',
        capacidad_maxima: 0,
        estatus: 'Activa',
      },
      busquedaGerente: '',  // Lo que el usuario escribe en el input
    gerentes: [],  // Lista completa de gerentes
    gerentesFiltrados: [],
    };
  },
  created() {
    // Nada que cargar desde API
  },
  watch: {
    isVisible(newVal) {
      if (newVal) {
        console.log("Datos recibidos en modal:", this.sucursalData); // <- DEBUG
        this.resetForm();
        if (this.isEdit && this.sucursalData) {
          this.cargarDatosEdicion();
        }
      }
    },
  },
  methods: {
    cargarDatosEdicion() {
      this.sucursal = {
        nombre: this.sucursalData.nombre,
        direccion: this.sucursalData.direccion,
        telefono: this.sucursalData.telefono || '',
        correo_electronico: this.sucursalData.correo_electronico || '',
        responsable_id: this.sucursalData.responsable_id,
        capacidad_maxima: this.sucursalData.capacidad_maxima,
        estatus: this.sucursalData.estatus,
      };
    },
    closeModal() {
      this.$emit('close');
    },
    async submitForm() {
      if (!this.validarFormulario()) {
        return;
      }

      const datosParaEnviar = {
        nombre: this.sucursal.nombre.trim(),
        direccion: this.sucursal.direccion.trim(),
        telefono: this.sucursal.telefono.trim(),
        responsable_id: parseInt(this.sucursal.responsable_id, 10),
        capacidad_maxima: parseInt(this.sucursal.capacidad_maxima, 10),
        estatus: this.sucursal.estatus,
      };

      try {
        if (this.isEdit) {
          await this.actualizarSucursal(this.sucursalData.id, datosParaEnviar);

          this.$emit("success", "Sucursal actualizada correctamente");
        } else {
          // Aquí iría tu lógica para registrar nueva sucursal
          console.log("Lógica de registro no implementada aún");
        }

        this.closeModal();
        this.$emit("refresh");
      } catch (error) {
        this.$emit("error", "Error al actualizar la sucursal");
      }
    },
    validarFormulario() {
      const errores = [];

      if (!this.sucursal.nombre?.trim()) errores.push('El nombre es requerido');
      if (!this.sucursal.direccion?.trim()) errores.push('La dirección es requerida');
      if (!this.sucursal.responsable_id) errores.push('Debe seleccionar un gerente responsable');
      if (!this.sucursal.capacidad_maxima || this.sucursal.capacidad_maxima <= 0) errores.push('La capacidad máxima debe ser mayor a 0');

      if (errores.length > 0) {
        this.$emit('error', errores.join(', '));
        return false;
      }

      return true;
    },
    resetForm() {
      this.sucursal = {
        nombre: '',
        direccion: '',
        telefono: '',
        responsable_id: '',
        capacidad_maxima: 0,
        horario_disponibilidad: '',
        detalles: '',
        estatus: 'Activa',
      };
    },
    async actualizarSucursal(sucursalId, sucursalData) {
      try {
        const token = localStorage.getItem("token");
        const response = await api.put(`/sucursales/${sucursalId}`, sucursalData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        console.error("Error al actualizar sucursal:", error.response?.data || error);
        throw error;
      }
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

textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
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
