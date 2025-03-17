<template>
  <Menu />
  <div class="sucursales-view">
    <h1>Sucursales</h1>
    <button @click="openModal(false)" class="add-sucursal-button">Agregar Sucursal</button>
    <div class="sucursales-list">
      <div v-for="sucursal in sucursales" :key="sucursal.id" class="sucursal-card">
        <div class="card-header">
          <h2>{{ sucursal.nombre }}</h2>
        </div>
        <p><strong>Dirección:</strong> {{ sucursal.direccion }}</p>
        <p><strong>Teléfono:</strong> {{ sucursal.telefono }}</p>
        <p><strong>Total de Clientes Atendidos:</strong> {{ sucursal.totalClientes }}</p>
        <p><strong>Promedio de Clientes por Día:</strong> {{ sucursal.promedioClientes }}</p>
        <p><strong>Capacidad Máxima:</strong> {{ sucursal.capacidadMaxima }}</p>
        <p><strong>Total de Empleados:</strong> {{ sucursal.totalEmpleados }}</p>
        <p><strong>Horario:</strong> {{ sucursal.horario }}</p>
        <p><strong>Estatus:</strong> {{ sucursal.estatus }}</p>
        <button @click="openModal(true, sucursal)" class="edit-button">Editar</button>
        <button @click="deleteSucursal(sucursal.id)" class="delete-button">Eliminar</button>
      </div>
    </div>
    <SucursalModal
      :isVisible="showModal"
      :isEdit="isEdit"
      :sucursalData="currentSucursal"
      @close="showModal = false"
      @submit="handleSucursal"
    />
  </div>
</template>

<script>
import Menu from '@/components/MainMenu.vue';
import SucursalModal from '@/components/SucursalModal.vue';

export default {
  components: { Menu, SucursalModal },
  name: 'SucursalesView',
  data() {
    return {
      showModal: false,
      isEdit: false,
      currentSucursal: null,
      sucursales: [
        { id: 1, nombre: 'Sucursal Centro', direccion: 'Calle Principal #123, Centro', telefono: '555-1234', totalClientes: 1000, promedioClientes: 50, capacidadMaxima: 200, totalEmpleados: 20, horario: '6:00 AM - 10:00 PM', estatus: 'Activo' },
        { id: 2, nombre: 'Sucursal Norte', direccion: 'Avenida Norte #456, Zona Norte', telefono: '555-5678', totalClientes: 800, promedioClientes: 40, capacidadMaxima: 150, totalEmpleados: 15, horario: '6:00 AM - 10:00 PM', estatus: 'Activo' },
        { id: 3, nombre: 'Sucursal Sur', direccion: 'Calle Sur #789, Zona Sur', telefono: '555-9101', totalClientes: 600, promedioClientes: 30, capacidadMaxima: 100, totalEmpleados: 10, horario: '6:00 AM - 10:00 PM', estatus: 'Activo' },
        { id: 4, nombre: 'Sucursal Este', direccion: 'Avenida Este #321, Zona Este', telefono: '555-1122', totalClientes: 700, promedioClientes: 35, capacidadMaxima: 120, totalEmpleados: 12, horario: '6:00 AM - 10:00 PM', estatus: 'Activo' },
        { id: 5, nombre: 'Sucursal Oeste', direccion: 'Calle Oeste #654, Zona Oeste', telefono: '555-3344', totalClientes: 900, promedioClientes: 45, capacidadMaxima: 180, totalEmpleados: 18, horario: '6:00 AM - 10:00 PM', estatus: 'Activo' },
        { id: 6, nombre: 'Sucursal Industrial', direccion: 'Parque Industrial #777', telefono: '555-7788', totalClientes: 500, promedioClientes: 25, capacidadMaxima: 80, totalEmpleados: 8, horario: '6:00 AM - 10:00 PM', estatus: 'Activo' },
      ],
    };
  },
  methods: {
    openModal(isEdit, sucursal = null) {
      this.isEdit = isEdit;
      this.currentSucursal = isEdit ? { ...sucursal } : null;
      this.showModal = true;
    },
    handleSucursal(sucursal) {
      if (this.isEdit) {
        const index = this.sucursales.findIndex(s => s.id === sucursal.id);
        if (index !== -1) {
          this.sucursales.splice(index, 1, sucursal);
        }
      } else {
        sucursal.id = this.sucursales.length + 1;
        this.sucursales.push(sucursal);
      }
    },
    deleteSucursal(id) {
      this.sucursales = this.sucursales.filter(s => s.id !== id);
    },
  },
};
</script>

<style scoped>
.sucursales-view {
  margin-top: 677px; /* Ajusta el margen superior según sea necesario */
  padding: 20px;
}

.sucursales-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center; /* Centra las cards horizontalmente */
}

.sucursal-card {
  background: linear-gradient(135deg, #3b1f24, #222222);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.6);
  color: #fff;
  flex: 1 1 calc(33.333% - 20px);
  min-width: 300px;
  transition: transform 0.3s ease-in-out;
}

.sucursal-card:hover {
  transform: translateY(-5px);
}

.card-header {
  margin-bottom: 10px;
  border-bottom: 2px solid #ff5722;
  padding-bottom: 5px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #f45c43;
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
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.add-sucursal-button:hover {
  background-color: #0056b3;
}

.edit-button, .delete-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  margin-right: 10px;
}

.edit-button:hover, .delete-button:hover {
  background-color: #0056b3;
}

.delete-button {
  background-color: #ff0000;
}

.delete-button:hover {
  background-color: #cc0000;
}

@media (max-width: 768px) {
  .sucursal-card {
    flex: 1 1 100%; /* Las cards ocupan el 100% del ancho en pantallas pequeñas */
  }
}
</style>