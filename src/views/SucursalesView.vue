<template>
  <Menu />
  <div class="sucursales-view">
    <h1>Sucursales</h1>
    <button @click="openModal(false)" class="add-sucursal-button">Agregar Sucursal</button>
    <div class="sucursales-list">
      <div v-for="sucursal in sucursales" :key="sucursal.id" class="sucursal-card">
        <div class="card-header">
          <h2>{{ sucursal.Nombre }}</h2>
        </div>
        <p><strong>Dirección:</strong> {{ sucursal.Direccion }}</p>
        <p><strong>Teléfono:</strong> {{ sucursal.Telefono }}</p>
        <p><strong>Correo:</strong> {{ sucursal.Correo_Electronico }}</p>
        <p><strong>Gerente Encargado:</strong> {{ sucursal.Responsable_Nombre }}</p>
        <p><strong>Capacidad Máxima:</strong> {{ sucursal.Capacidad_Maxima }}</p>
        <p><strong>Estatus:</strong> {{ sucursal.Estatus }}</p>
        <p><strong>Fecha de Registro:</strong> {{ formatearFecha(sucursal.Fecha_Registro) }}</p>
        <p v-if="sucursal.Fecha_Actualizacion"><strong>Última Actualización:</strong> {{
          formatearFecha(sucursal.Fecha_Actualizacion) }}</p>
        <button @click="openModal(true, sucursal)" class="edit-button">Editar</button>
        <button @click="deleteSucursal(sucursal.id)" class="delete-button">Eliminar</button>
      </div>
    </div>
    <SucursalModal :isVisible="showModal" :isEdit="isEdit" :sucursalData="currentSucursal" :gerentes="gerentes"
      @close="showModal = false" @submit="handleSucursal" />
    <ConfirmModal :isVisible="confirmModalVisible" message="¿Estás seguro de que deseas eliminar esta sucursal?"
      @confirm="confirmDelete" @cancel="cancelDelete" />

  </div>
</template>

<script>
import Menu from '@/components/MainMenu.vue';
import SucursalModal from '@/components/SucursalModal.vue';
import ConfirmModal from '@/components/ModalComponent.vue';
import api from "../api/api.js";

export default {
  components: { Menu, SucursalModal,ConfirmModal,  },
  name: 'SucursalesView',
  data() {
    return {
      showModal: false,
      isEdit: false,
      currentSucursal: null,
      gerentes: [
        { id: 1, nombre: 'Juan Pérez' },
        { id: 2, nombre: 'Ana Gómez' },
        { id: 3, nombre: 'Carlos Ruiz' },
        { id: 4, nombre: 'María López' },
        { id: 5, nombre: 'Luis Martínez' },
        { id: 6, nombre: 'Sofía Ramírez' },
      ],
      sucursales: [],
      confirmModalVisible: false,   // <-- Aquí
      sucursalToDelete: null
    };
  },
  mounted() {
    this.cargarSucursales();
  },
  methods: {
    // Cargar todas las sucursales
    async cargarSucursales() {
      try {
        const data = await api.obtenerSucursales();
        console.log("Sucursales cargadas:", data);
        this.sucursales = data;
      } catch (error) {
        console.log("Error al cargar sucursales:", error);
      }
    },

    // Abrir el modal para agregar o editar
    openModal(isEdit, sucursal = null) {
      this.isEdit = isEdit;
      this.currentSucursal = isEdit ? { ...sucursal } : null;
      this.showModal = true;
    },

    // Manejar el formulario de agregar/editar sucursal
    async handleSucursal(sucursal) {
      const capacidadMaxima = parseInt(sucursal.capacidadMaxima, 10);

      if (
        !sucursal.nombre?.trim() ||
        !sucursal.direccion?.trim() ||
        !sucursal.telefono?.trim() ||
        !sucursal.gerenteEncargado ||
        isNaN(capacidadMaxima) || capacidadMaxima <= 0
      ) {
        alert('Por favor, complete todos los campos requeridos correctamente.');
        return;
      }

      sucursal.capacidadMaxima = capacidadMaxima;

      try {
        if (this.isEdit) {
          await api.actualizarSucursal(sucursal.id, sucursal);
        } else {
          await api.registrarSucursal(sucursal);
        }

        await this.cargarSucursales();
        this.showModal = false;
      } catch (error) {
        console.error("Error al guardar sucursal:", error);
      }
    },

    // Eliminar una sucursal (soft delete)
    async deleteSucursal(id) {
      this.sucursalToDelete = id;
      this.confirmModalVisible = true;
    },
    confirmDelete() {
      if (!this.sucursalToDelete) return;

      api.eliminarSucursal(this.sucursalToDelete)
        .then(() => {
          this.cargarSucursales();
        })
        .catch(error => {
          console.error("Error al eliminar la sucursal:", error);
          alert("No se pudo eliminar la sucursal.");
        })
        .finally(() => {
          this.confirmModalVisible = false;
          this.sucursalToDelete = null;
        });
    },
    cancelDelete() {
      this.confirmModalVisible = false;
      this.sucursalToDelete = null;
    },

    // Función para formatear la fecha
    formatearFecha(fechaISO) {
      if (!fechaISO) return 'Sin registro';
      const fecha = new Date(fechaISO);
      return fecha.toLocaleDateString('es-MX', {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
      });
    }
  },
};
</script>

<style scoped>
.sucursales-view {
  margin-top: 850px;
  padding: 44px;
  color: black;
}

.sucursales-list {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  justify-content: center;
}

.sucursal-card {
  background: rgb(221, 219, 219);
  color: black;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 11px 30px 41px 0px rgba(0, 0, 0, 0.75);
  flex: 1 1 100%;
  min-width: 320px;
  max-width: 420px;
  box-sizing: border-box;
  word-wrap: break-word;
  overflow-wrap: break-word;
  transition: transform 0.3s ease-in-out;
}


.sucursal-card:hover {
  transform: translateY(-5px);
}

.card-header {
  margin-bottom: 10px;
  border-bottom: 2px solid #ff2222;
  padding-bottom: 5px;
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
  color: white;
  text-align: left;
}

h2 {
  margin-bottom: 10px;
  font-size: 1.4rem;
}

p {
  margin: 5px 0;
  font-size: 1rem;
}

.add-sucursal-button {
  display: flex;
  align-items: center;
  background: linear-gradient(to right, #420303, #140d0d);
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
  border-radius: 30px;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  margin-bottom: 32px;
}

.add-sucursal-button:hover {
  transform: translateY(-3px);
}

.edit-button,
.delete-button {
  padding: 12px;
  background-color: #0056b3;
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
  border-radius: 30px;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  border: none;
  margin-right: 16px;
  margin-top: 20px;
  color: white;
}

.edit-button:hover,
.delete-button:hover {
  background-color: #053f7e;
}

.delete-button {
  background-color: #ff0000;
}

.delete-button:hover {
  background-color: #cc0000;
}

@media (max-width: 768px) {
  .sucursal-card {
    flex: 1 1 100%;
  }
}
</style>
