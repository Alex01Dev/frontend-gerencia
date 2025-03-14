<template>
  <div class="dashboard">
    <Menu />
    <div class="content">
      <!-- Tabla de datos -->
      <div class="table-container">
        <div class="table-header">
          <h2>Transferencias</h2>
          <button @click="openModal(false)" class="add-transaction-button">Agregar Transacción</button>
        </div>
        <DataTable :data="tableData" :headers="headers" @edit="openModal(true, $event)" />
      </div>

      <!-- Gráficas a la derecha -->
      <div class="charts">
        <div class="chart-container">
          <Chart :chartData="chartData1" :chartOptions="chartOptions" chartType="line" />
        </div>
        <div class="chart-container">
          <Chart :chartData="chartData2" :chartOptions="chartOptions" chartType="bar" />
        </div>
      </div>
    </div>

    <!-- Modal para agregar/editar transacción -->
    <TransactionModal :isVisible="showModal" :isEdit="isEdit" :transaction="currentTransaction" @close="showModal = false" @submit="handleTransaction" />
  </div>
</template>

<script>
import Chart from '@/components/ChartComponent.vue';
import Menu from '@/components/MainMenu.vue';
import DataTable from '@/components/DataTable.vue';
import TransactionModal from '@/components/TransactionModal.vue';

export default {
  components: {
    Chart,
    Menu,
    DataTable,
    TransactionModal,
  },
  data() {
    return {
      showModal: false,
      isEdit: false,
      currentTransaction: null,
      tableData: [
        { nombreUsuario: 'Juan Pérez', metodoPago: 'Tarjeta de Crédito', monto: '$100', estatus: 'Completado', fechaRegistro: '2023-10-01', fechaActualizacion: '2023-10-01' },
        { nombreUsuario: 'Alina Bonilla', metodoPago: 'Transferencia Bancaria', monto: '$150', estatus: 'Pendiente', fechaRegistro: '2023-10-01', fechaActualizacion: '2023-10-02' },
        { nombreUsuario: 'Ana Gómez', metodoPago: 'Efectivo', monto: '$200', estatus: 'Completado', fechaRegistro: '2023-10-02', fechaActualizacion: '2023-10-03' },
        { nombreUsuario: 'Carlos Ruiz', metodoPago: 'Tarjeta de Débito', monto: '$50', estatus: 'Cancelado', fechaRegistro: '2023-10-03', fechaActualizacion: '2023-10-04' },
        { nombreUsuario: 'Laura Díaz', metodoPago: 'Transferencia Bancaria', monto: '$300', estatus: 'Completado', fechaRegistro: '2023-10-04', fechaActualizacion: '2023-10-05' },
        { nombreUsuario: 'Amauri Garcia', metodoPago: 'Efectivo', monto: '$75', estatus: 'Pendiente', fechaRegistro: '2023-10-05', fechaActualizacion: '2023-10-06' },
        { nombreUsuario: 'Maria Cruz', metodoPago: 'Efectivo', monto: '$75', estatus: 'Pendiente', fechaRegistro: '2023-10-05', fechaActualizacion: '2023-10-06' },
        { nombreUsuario: 'Juan Carlos', metodoPago: 'Efectivo', monto: '$75', estatus: 'Pendiente', fechaRegistro: '2023-10-05', fechaActualizacion: '2023-10-06' },
        { nombreUsuario: 'Alberto Vazquez', metodoPago: 'Efectivo', monto: '$75', estatus: 'Pendiente', fechaRegistro: '2023-10-05', fechaActualizacion: '2023-10-06' },
        { nombreUsuario: 'Pedro Sánchez', metodoPago: 'Efectivo', monto: '$75', estatus: 'Pendiente', fechaRegistro: '2023-10-05', fechaActualizacion: '2023-10-06' },
      ],
      headers: ['Nombre Usuario', 'Método de Pago', 'Monto', 'Estatus', 'Fecha de Registro', 'Fecha de Actualización'],
      chartData1: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
        datasets: [
          {
            label: 'Ventas 2023',
            data: [65, 59, 80, 81, 56],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      chartData2: {
        labels: ['Rojo', 'Azul', 'Amarillo'],
        datasets: [
          {
            label: 'Colores',
            data: [55, 55, 55],
            backgroundColor: ['red', 'blue', 'yellow'],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  methods: {
    openModal(isEdit, transaction = null) {
      this.isEdit = isEdit;
      this.currentTransaction = transaction;
      this.showModal = true;
    },
    handleTransaction(transaction) {
      if (this.isEdit) {
        const index = this.tableData.findIndex(t => t === this.currentTransaction);
        if (index !== -1) {
          this.tableData.splice(index, 1, transaction);
        }
      } else {
        this.tableData.push(transaction);
      }
    },
  },
};
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  height: 70%;
  
}

.content {
  display: flex;
  gap: 20px;
  padding: 20px;
  height: calc(100vh - 100px); /* Ajusta la altura del contenido */
}

.add-transaction-button {
  margin-bottom: 20px;
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-transaction-button:hover {
  background-color: #0056b3;
}

.table-container {
  flex: 2;
  background-color: #ffffff; /* Fondo blanco */
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra más suave */
  overflow-x: auto;
  transition: transform 0.3s ease;
  height: calc(100vh - 60px); /* Ajusta la altura de la tabla */
}

.table-container:hover {
  transform: scale(1.01);
}

.charts {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
  height: calc(100vh - 130px); /* Ajusta la altura de las gráficas */
}

.chart-container {
  background-color: #ffffff; /* Fondo blanco */
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra más suave */
  height: calc(50% - 10px); /* Ajusta la altura de cada gráfica */
}

h2 {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 15px;
  color: #333333; /* Título en gris oscuro */
}
</style>