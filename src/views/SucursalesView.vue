<template>
  <Menu />
  <div class="sucursales-view">
    <h1>Sucursales</h1>
    <div class="sucursales-list">
      <div v-for="sucursal in sucursales" :key="sucursal.id" class="sucursal-card">
        <div class="card-header">
          <h2>{{ sucursal.nombre }}</h2>
        </div>
        <p><strong>Dirección:</strong> {{ sucursal.direccion }}</p>
        <p><strong>Teléfono:</strong> {{ sucursal.telefono }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from '@/components/MainMenu.vue';

export default {
  components: { Menu },
  name: 'SucursalesView',
  data() {
    return {
      sucursales: [
        { id: 1, nombre: 'Sucursal Centro', direccion: 'Calle Principal #123, Centro', telefono: '555-1234' },
        { id: 2, nombre: 'Sucursal Norte', direccion: 'Avenida Norte #456, Zona Norte', telefono: '555-5678' },
        { id: 3, nombre: 'Sucursal Sur', direccion: 'Calle Sur #789, Zona Sur', telefono: '555-9101' },
        { id: 4, nombre: 'Sucursal Este', direccion: 'Avenida Este #321, Zona Este', telefono: '555-1122' },
        { id: 5, nombre: 'Sucursal Oeste', direccion: 'Calle Oeste #654, Zona Oeste', telefono: '555-3344' },
        { id: 6, nombre: 'Sucursal Industrial', direccion: 'Parque Industrial #777', telefono: '555-7788' },
      ],
    };
  },
};
</script>

<style scoped>
.sucursales-view {
  position: relative;
  top: 80px;
  padding: 20px;
}

.sucursales-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;
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
.card-header{
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
</style>
