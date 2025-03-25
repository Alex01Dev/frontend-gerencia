<template>
  <div class="dashboard">
    <Menu />
    <div class="content">
      <!-- Gráficas -->
      <div class="charts">
        <div class="chart-container stacked-column-chart">
          <StackedColumnChart :data="graficaReportesData" /> <!-- Gráfica de reportes -->
        </div>
        <div class="chart-container">
          <ZoomableTimeseriesChart :data="tableData" /> <!-- Nueva gráfica de transacciones -->
        </div>
      </div>
      <!-- Tabla de transacciones -->
      <div class="transactions-table-container">
        <div class="table-header">
          <h2>Transacciones</h2>
          <button @click="openModal" class="add-transaction-button">Agregar Transacción</button>
        </div>
        <DataTable :data="tableData" :headers="headers" />
      </div>

      <!-- Tabla de reportes -->
      <div class="reports-table-container">
        <div class="table-header">
          <h2>Reportes</h2>
        </div>
        <ReportesTable :data="reportesData" :headers="reportesHeaders" />
      </div>
    </div>

    <!-- Modal para agregar transacción -->
    <TransactionModal :isVisible="showModal" @close="showModal = false" @submit="handleTransaction" />
  </div>
</template>

<script>

import Menu from '@/components/MainMenu.vue';
import DataTable from '@/components/DataTable.vue';
import TransactionModal from '@/components/TransactionModal.vue';
import ReportesTable from '@/components/ReportesTable.vue'; // Importa el nuevo componente
import StackedColumnChart from '@/components/StackedColumnChart.vue';
import ZoomableTimeseriesChart from '@/components/ZoomableTimeseriesChart.vue'; // Importa el nuevo componente

export default {
  components: {
    Menu,
    DataTable,
    TransactionModal,
    ReportesTable,
    StackedColumnChart,
    ZoomableTimeseriesChart,
  },
  data() {
    return {
      showModal: false,
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
      reportesData: [
        { sucursal: 'Sucursal A', mes: 'Enero', ingresos: 10000, egresos: 5000, ganancias: 5000, estatus: 'Activo' },
        { sucursal: 'Sucursal B', mes: 'Febrero', ingresos: 12000, egresos: 6000, ganancias: 6000, estatus: 'Inactivo' },
        { sucursal: 'Sucursal C', mes: 'Marzo', ingresos: 15000, egresos: 7000, ganancias: 8000, estatus: 'Activo' },
        { sucursal: 'Sucursal D', mes: 'Abril', ingresos: 18000, egresos: 8000, ganancias: 10000, estatus: 'Activo' },
        { sucursal: 'Sucursal E', mes: 'Mayo', ingresos: 20000, egresos: 9000, ganancias: 11000, estatus: 'Inactivo' },
        { sucursal: 'Sucursal F', mes: 'Junio', ingresos: 20000, egresos: 9000, ganancias: 11000, estatus: 'Inactivo' },
        { sucursal: 'Sucursal G', mes: 'Julio', ingresos: 20000, egresos: 9000, ganancias: 11000, estatus: 'Inactivo' },
        { sucursal: 'Sucursal H', mes: 'Agosto', ingresos: 20000, egresos: 9000, ganancias: 11000, estatus: 'Inactivo' },
        { sucursal: 'Sucursal I', mes: 'Septiembre', ingresos: 20000, egresos: 9000, ganancias: 11000, estatus: 'Inactivo' },
        { sucursal: 'Sucursal J', mes: 'Octubre', ingresos: 20000, egresos: 9000, ganancias: 11000, estatus: 'Inactivo' },
        { sucursal: 'Sucursal K', mes: 'Noviembre', ingresos: 20000, egresos: 9000, ganancias: 11000, estatus: 'Inactivo' },
        { sucursal: 'Sucursal L', mes: 'Diciembre', ingresos: 20000, egresos: 9000, ganancias: 11000, estatus: 'Inactivo' },
      ],
      reportesHeaders: ['Sucursal', 'Mes', 'Ingresos', 'Egresos', 'Ganancias', 'Estatus'], // Encabezados para la tabla de reportes
      graficaReportesData: [
        { mes: 'Enero', ingresos: 10000, egresos: 5000 },
        { mes: 'Febrero', ingresos: 12000, egresos: 6000 },
        { mes: 'Marzo', ingresos: 15000, egresos: 7000 },
        { mes: 'Abril', ingresos: 18000, egresos: 8000 },
        { mes: 'Mayo', ingresos: 20000, egresos: 9000 },
        { mes: 'Junio', ingresos: 20000, egresos: 9000 },
        { mes: 'Julio', ingresos: 20000, egresos: 9000 },
        { mes: 'Agosto', ingresos: 20000, egresos: 9000 },
        { mes: 'Septiembre', ingresos: 20000, egresos:9000},
        { mes: 'Octubre', ingresos: 20000, egresos: 9000 },
        { mes: 'Noviembre', ingresos: 20000, egresos: 9000 },
        { mes: 'Diciembre', ingresos: 20000, egresos: 9000 },
      ],
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
    openModal() {
      this.showModal = true;
    },
    handleTransaction(transaction) {
      this.tableData.push(transaction); // Agrega la nueva transacción a la tabla
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
  height: 340px; /* Ajusta la altura de cada gráfica */
}


/* Contenedor de la tabla de transacciones */
.transactions-table-container {
  background-color: #ffffff; /* Fondo blanco */
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra más suave */
  overflow-x: auto;
  transition: transform 0.3s ease;
  min-height: 600px; /* Altura mínima para la tabla de transacciones */
}

/* Contenedor de la tabla de reportes */
.reports-table-container {
  background-color: #ffffff; /* Fondo blanco */
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra más suave */
  overflow-x: auto;
  transition: transform 0.3s ease;
  min-height: 480px; /* Altura mínima para la tabla de reportes */
}

.transactions-table-container:hover,
.reports-table-container:hover {
  transform: scale(1.01);
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

h2 {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 0; /* Elimina el margen inferior para alinear mejor con el botón */
  color: #333333; /* Título en gris oscuro */
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: left;
  white-space: normal; /* Evita que el texto se rompa en varias líneas */
  overflow: hidden; /* Oculta el desbordamiento */
  text-overflow: ellipsis; /* Añade puntos suspensivos al texto desbordado */
}

th {
  background-color: #f4f4f4;
  cursor: pointer;
}
</style>