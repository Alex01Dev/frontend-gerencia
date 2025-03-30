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
          <input 
            type="text" 
            id="telefono" 
            v-model="sucursal.telefono" 
            required 
            pattern="[0-9]{10}"
            title="Ingrese un número de 10 dígitos"
          />
        </div>
        
        <div class="form-group">
          <label for="gerenteEncargado">Gerente Encargado:</label>
          <select 
            id="gerenteEncargado" 
            v-model="sucursal.responsable_id" 
            required
          >
            <option value="">Seleccione un gerente</option>
            <option 
              v-for="gerente in gerentes" 
              :key="gerente.id" 
              :value="gerente.id"
            >
              {{ gerente.nombre_completo }}
            </option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="capacidadMaxima">Capacidad Máxima:</label>
          <input 
            type="number" 
            id="capacidadMaxima" 
            v-model.number="sucursal.capacidad_maxima" 
            min="1"
            required 
          />
        </div>
        
        <div class="form-group">
          <label for="horario">Horario:</label>
          <input 
            type="text" 
            id="horario" 
            v-model="sucursal.horario_disponibilidad" 
            placeholder="Ej: L-V 9:00-18:00"
            required 
          />
        </div>
        
        <div class="form-group" v-if="isEdit">
          <label>Estatus:</label>
          <div class="radio-group">
            <label>
              <input 
                type="radio" 
                v-model="sucursal.estatus" 
                value="Activa" 
              /> Activa
            </label>
            <label>
              <input 
                type="radio" 
                v-model="sucursal.estatus" 
                value="Inactiva" 
              /> Inactiva
            </label>
          </div>
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
import api from '@/api/api';

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
        responsable_id: '',
        capacidad_maxima: 0,
        horario_disponibilidad: '',
        detalles: '',
        estatus: 'Activa',
      },
      gerentes: [],
    };
  },
  async created() {
    await this.cargarGerentes();
  },
  watch: {
    isVisible(newVal) {
      if (newVal) {
        this.resetForm();
        if (this.isEdit && this.sucursalData) {
          this.cargarDatosEdicion();
        }
      }
    },
  },
  methods: {
    async cargarGerentes() {
      try {
        this.gerentes = await api.obtenerGerentesActivos();
      } catch (error) {
        console.error("Error al cargar gerentes:", error);
        this.$emit('error', 'No se pudieron cargar los gerentes');
      }
    },
    
    cargarDatosEdicion() {
      this.sucursal = {
        nombre: this.sucursalData.nombre,
        direccion: this.sucursalData.direccion,
        telefono: this.sucursalData.telefono || '',
        responsable_id: this.sucursalData.responsable_id,
        capacidad_maxima: this.sucursalData.capacidad_maxima,
        horario_disponibilidad: this.sucursalData.horario_disponibilidad,
        detalles: this.sucursalData.detalles || '',
        estatus: this.sucursalData.estatus,
      };
    },
    
    closeModal() {
      this.$emit('close');
    },
    
    async submitForm() {
      // Validación de campos
      if (!this.validarFormulario()) {
        return;
      }
      
      try {
        const datosParaEnviar = {
          nombre: this.sucursal.nombre.trim(),
          direccion: this.sucursal.direccion.trim(),
          responsable_id: this.sucursal.responsable_id,
          capacidad_maxima: this.sucursal.capacidad_maxima,
          horario_disponibilidad: this.sucursal.horario_disponibilidad.trim(),
          detalles: this.sucursal.detalles.trim(),
          estatus: this.sucursal.estatus === 'Activa',
        };
        
        // Agregar teléfono si existe
        if (this.sucursal.telefono) {
          datosParaEnviar.telefono = this.sucursal.telefono.trim();
        }
        
        if (this.isEdit) {
          await api.actualizarSucursal(this.sucursalData.id, datosParaEnviar);
          this.$emit('success', 'Sucursal actualizada correctamente');
        } else {
          await api.registrarSucursal(datosParaEnviar);
          this.$emit('success', 'Sucursal registrada correctamente');
        }
        
        this.closeModal();
        this.$emit('refresh');
      } catch (error) {
        console.error("Error al guardar sucursal:", error);
        this.$emit('error', error.response?.data?.detail || 'Error al guardar la sucursal');
      }
    },
    
    validarFormulario() {
      const errores = [];
      
      if (!this.sucursal.nombre?.trim()) {
        errores.push('El nombre es requerido');
      }
      
      if (!this.sucursal.direccion?.trim()) {
        errores.push('La dirección es requerida');
      }
      
      if (!this.sucursal.responsable_id) {
        errores.push('Debe seleccionar un gerente responsable');
      }
      
      if (!this.sucursal.capacidad_maxima || this.sucursal.capacidad_maxima <= 0) {
        errores.push('La capacidad máxima debe ser mayor a 0');
      }
      
      if (!this.sucursal.horario_disponibilidad?.trim()) {
        errores.push('El horario es requerido');
      }
      
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
