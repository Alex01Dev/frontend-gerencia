<template>
  <div class="dashboard">
    <Menu />
    <div class="content">
      <!-- Gráficas -->
      <div class="charts">
        <div class="chart-container">
          <ZoomableTimeseriesChart :data="tableData" />
        </div>
        <div class="chart-container stacked-column-chart">
          <StackedColumnChart :data="graficaReportesData" />
        </div>
      </div>
      
      <!-- Tabla de transacciones - Versión corregida -->
      <div class="transactions-table-container">
        <div class="table-header">
          <h2>Transacciones</h2>
          <button @click="openModal" class="add-transaction-button">Agregar Transacción</button>
        </div>
        
        <div class="table-wrapper">
          <table class="transactions-table">
            <thead>
              <tr>
                <th v-for="header in headers" :key="header">{{ header }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in tableData" :key="index">
                <td>{{ item['Nombre Usuario'] }}</td>
                <td>{{ item['Rol'] }}</td>
                <td>{{ item['Método de Pago'] }}</td>
                <td>{{ item['Monto'] }}</td>
                <td>{{ item['Estatus'] }}</td>
                <td>{{ item['Fecha de Registro'] }}</td>
                <td>{{ item['Tipo de Transacción'] }}</td>
              </tr>
              <tr v-if="tableData.length === 0">
                <td :colspan="headers.length" class="no-data">No hay transacciones disponibles</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Tabla de reportes -->
      <div class="reports-table-container">
        <div class="table-header">
          <h2>Reportes</h2>
        </div>
        <ReportesTable :data="reportesData" :headers="reportesHeaders" />
      </div>
    </div>

    <TransactionModal :isVisible="showModal" @close="showModal = false" @submit="handleTransaction" />
  </div>
</template>

<script>
import api from '@/api/api.js';
import Menu from '@/components/MainMenu.vue';
import TransactionModal from '@/components/TransactionModal.vue';
import ReportesTable from '@/components/ReportesTable.vue'; // Importa el nuevo componente
import StackedColumnChart from '@/components/StackedColumnChart.vue';
import ZoomableTimeseriesChart from '@/components/ZoomableTimeseriesChart.vue'; // Importa el nuevo componente

export default {
  components: {
    Menu,
    TransactionModal,
    ReportesTable,
    StackedColumnChart,
    ZoomableTimeseriesChart,
  },
  data() {
    return {
      showModal: false,
      tableData: [],
      headers: [
        'Nombre Usuario',
        'Rol',
        'Método de Pago',
        'Monto',
        'Estatus',
        'Fecha de Registro',
        'Tipo de Transacción',
      ],
      reportesData: [
        { sucursal: 'Sucursal A', mes: 'Enero', ingresos: 10000, egresos: 5000, beneficio_neto: 5000, actividad: 'Activo' },
        { sucursal: 'Sucursal B', mes: 'Febrero', ingresos: 12000, egresos: 6000, beneficio_neto: 6000, actividad: 'Inactivo' },
        { sucursal: 'Sucursal C', mes: 'Marzo', ingresos: 15000, egresos: 7000, beneficio_neto: 8000, actividad: 'Activo' },
        { sucursal: 'Sucursal D', mes: 'Abril', ingresos: 18000, egresos: 8000, beneficio_neto: 10000, actividad: 'Activo' },
        { sucursal: 'Sucursal E', mes: 'Mayo', ingresos: 20000, egresos: 9000, beneficio_neto: 11000, actividad: 'Inactivo' },
        { sucursal: 'Sucursal F', mes: 'Junio', ingresos: 20000, egresos: 9000, beneficio_neto: 11000, actividad: 'Inactivo' },
        { sucursal: 'Sucursal G', mes: 'Julio', ingresos: 20000, egresos: 9000, beneficio_neto: 11000, actividad: 'Inactivo' },
        { sucursal: 'Sucursal H', mes: 'Agosto', ingresos: 20000, egresos: 9000, beneficio_neto: 11000, actividad: 'Inactivo' },
        { sucursal: 'Sucursal I', mes: 'Septiembre', ingresos: 20000, egresos: 9000, beneficio_neto: 11000, actividad: 'Inactivo' },
        { sucursal: 'Sucursal J', mes: 'Octubre', ingresos: 20000, egresos: 9000, beneficio_neto: 11000, actividad: 'Inactivo' },
        { sucursal: 'Sucursal K', mes: 'Noviembre', ingresos: 20000, egresos: 9000, beneficio_neto: 11000, actividad: 'Inactivo' },
        { sucursal: 'Sucursal L', mes: 'Diciembre', ingresos: 20000, egresos: 9000, beneficio_neto: 11000, actividad: 'Inactivo' },
      ],
      reportesHeaders: ['Sucursal', 'Mes', 'Ingresos', 'Egresos', 'Beneficio Neto', 'Actividad'], // Encabezados para la tabla de reportes
      graficaReportesData: [
        { mes: 'Enero', ingresos: 10000, egresos: 5000 },
        { mes: 'Febrero', ingresos: 12000, egresos: 6000 },
        { mes: 'Marzo', ingresos: 15000, egresos: 7000 },
        { mes: 'Abril', ingresos: 18000, egresos: 8000 },
        { mes: 'Mayo', ingresos: 20000, egresos: 9000 },
        { mes: 'Junio', ingresos: 20000, egresos: 9000 },
        { mes: 'Julio', ingresos: 20000, egresos: 9000 },
        { mes: 'Agosto', ingresos: 20000, egresos: 9000 },
        { mes: 'Septiembre', ingresos: 20000, egresos: 9000 },
        { mes: 'Octubre', ingresos: 20000, egresos: 9000 },
        { mes: 'Noviembre', ingresos: 20000, egresos: 9000 },
        { mes: 'Diciembre', ingresos: 20000, egresos: 9000 },
      ],
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    handleTransaction(transaction) {
      this.tableData.push(transaction);
      this.showModal = false;
    },
    async fetchTransacciones() {
  try {
    const transacciones = await api.obtenerTransacciones();
    console.log('Datos recibidos de la API:', transacciones);

    this.tableData = transacciones.map(t => ({
      'Nombre Usuario': t.nombre_usuario,
      'Rol': t.rol,
      'Método de Pago': t.metodo_pago,
      'Monto': `$${t.monto.toFixed(2)}`, // Formatear el monto con dos decimales
      'Detalles': t.detalles,
      'Estatus': t.estatus,
      'Fecha de Registro': new Date(t.fecha_registro).toLocaleString(),
      'Fecha de Actualización': t.fecha_actualizacion 
        ? new Date(t.fecha_actualizacion).toLocaleString() 
        : 'N/A',
      'Tipo de Transacción': t.tipo_transaccion,
    }));

    console.log('Datos mapeados para tabla:', this.tableData);
  } catch (error) {
    console.error("Error al obtener transacciones:", error);
  }
},
  },
  mounted() {
    this.fetchTransacciones(); // Llamar a la API al cargar el componente para obtener todas las transacciones
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
  min-width: 1100px; /* Ancho mínimo para la vista de escritorio */
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