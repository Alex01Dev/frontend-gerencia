<template>
  <div class="dashboard">
    <Menu />
    <div class="content">
      <!-- Gráficas -->
      <div class="charts">
        <div class="chart-container">
          <Chart :chartData="chartData1" :chartOptions="chartOptions" chartType="line" />
        </div>
        <div class="chart-container">
          <Chart :chartData="chartData2" :chartOptions="chartOptions" chartType="bar" />
        </div>
      </div>

      <!-- Tabla de datos -->
      <div class="table-container">
        <div class="table-header">
          <h2>Transacciones</h2>
          <button @click="openModal(false)" class="add-transaction-button">Agregar Transacción</button>
        </div>
        <DataTable :data="tableData" :headers="headers" @edit="openModal(true, $event)" />
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
        { nombreUsuario: 'Juan Pérez', rol: 'Administrador', metodoPago: 'Tarjeta de Crédito', monto: '$100', detalles: 'Compra de equipo', estatus: 'Completado', fechaRegistro: '2023-10-01', fechaActualizacion: '2023-10-01', tipoTransaccion: 'Egreso' },
        { nombreUsuario: 'Alina Bonilla', rol: 'Usuario', metodoPago: 'Transferencia Bancaria', monto: '$150', detalles: 'Pago de servicios', estatus: 'Pendiente', fechaRegistro: '2023-10-01', fechaActualizacion: '2023-10-02', tipoTransaccion: 'Egreso' },
        { nombreUsuario: 'Ana Gómez', rol: 'Usuario', metodoPago: 'Efectivo', monto: '$200', detalles: 'Compra de suministros', estatus: 'Completado', fechaRegistro: '2023-10-02', fechaActualizacion: '2023-10-03', tipoTransaccion: 'Egreso' },
        { nombreUsuario: 'Carlos Ruiz', rol: 'Administrador', metodoPago: 'Tarjeta de Débito', monto: '$50', detalles: 'Pago de servicios', estatus: 'Cancelado', fechaRegistro: '2023-10-03', fechaActualizacion: '2023-10-04', tipoTransaccion: 'Egreso' },
        { nombreUsuario: 'Laura Díaz', rol: 'Usuario', metodoPago: 'Transferencia Bancaria', monto: '$300', detalles: 'Compra de equipo', estatus: 'Completado', fechaRegistro: '2023-10-04', fechaActualizacion: '2023-10-05', tipoTransaccion: 'Egreso' },
        { nombreUsuario: 'Amauri Garcia', rol: 'Usuario', metodoPago: 'Efectivo', monto: '$75', detalles: 'Pago de servicios', estatus: 'Pendiente', fechaRegistro: '2023-10-05', fechaActualizacion: '2023-10-06', tipoTransaccion: 'Egreso' },
        { nombreUsuario: 'Maria Cruz', rol: 'Usuario', metodoPago: 'Efectivo', monto: '$75', detalles: 'Pago de servicios', estatus: 'Pendiente', fechaRegistro: '2023-10-05', fechaActualizacion: '2023-10-06', tipoTransaccion: 'Egreso' },
        { nombreUsuario: 'Juan Carlos', rol: 'Usuario', metodoPago: 'Efectivo', monto: '$75', detalles: 'Pago de servicios', estatus: 'Pendiente', fechaRegistro: '2023-10-05', fechaActualizacion: '2023-10-06', tipoTransaccion: 'Egreso' },
        { nombreUsuario: 'Alberto Vazquez', rol: 'Usuario', metodoPago: 'Efectivo', monto: '$75', detalles: 'Pago de servicios', estatus: 'Pendiente', fechaRegistro: '2023-10-05', fechaActualizacion: '2023-10-06', tipoTransaccion: 'Egreso' },
        { nombreUsuario: 'Pedro Sánchez', rol: 'Usuario', metodoPago: 'Efectivo', monto: '$75', detalles: 'Pago de servicios', estatus: 'Pendiente', fechaRegistro: '2023-10-05', fechaActualizacion: '2023-10-06', tipoTransaccion: 'Egreso' },
      ],
      headers: ['Nombre Usuario', 'Rol', 'Método de Pago', 'Monto', 'Detalles', 'Estatus', 'Fecha de Registro', 'Fecha de Actualización', 'Tipo de Transacción'],
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
      this.currentTransaction = isEdit ? transaction : { nombreUsuario: '', rol: '', metodoPago: '', monto: '', detalles: '', estatus: '', fechaRegistro: '', fechaActualizacion: '' };
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
      this.showModal = false;
    },
  },
};
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 100px;
  height: calc(100vh - 60px); /* Ajusta la altura del contenido */
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

.charts {
  display: flex;
  gap: 20px;
  justify-content: space-between;
}

.chart-container {
  background-color: #ffffff; /* Fondo blanco */
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra más suave */
  flex: 1;
  height: 240px; /* Ajusta la altura de cada gráfica */
}

.table-container {
  background-color: #ffffff; /* Fondo blanco */
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra más suave */
  overflow-x: auto;
  transition: transform 0.3s ease;
  flex-grow: 1; /* Permite que el contenedor de la tabla crezca para llenar el espacio disponible */
  min-height: 610px; /* Altura mínima para el contenedor de la tabla */
}

.table-container:hover {
  transform: scale(1.01);
}

.table-container table {
  width: 100%;
  border-collapse: collapse;
}

.table-container th, .table-container td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: left;
  white-space: normal; /* Evita que el texto se rompa en varias líneas */
  overflow: hidden; /* Oculta el desbordamiento */
  text-overflow: ellipsis; /* Añade puntos suspensivos al texto desbordado */
}

.table-container th {
  background-color: #f4f4f4;
  cursor: pointer;
}

.table-container th span {
  margin-left: 5px;
}

h2 {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 15px;
  color: #333333; /* Título en gris oscuro */
}
</style>