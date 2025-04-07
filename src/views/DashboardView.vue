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
      
      <!-- Tabla de transacciones con paginación -->
      <div class="transactions-table-container">
        <div class="table-header">
          <h2>Transacciones</h2>
          <button @click="openModal" class="add-transaction-button">Agregar Transacción</button>
        </div>
        
        <!-- Usa el componente DataTable -->
        <DataTable :data="formattedTableData" :headers="headers" />
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
import ReportesTable from '@/components/ReportesTable.vue';
import StackedColumnChart from '@/components/StackedColumnChart.vue';
import ZoomableTimeseriesChart from '@/components/ZoomableTimeseriesChart.vue';
import DataTable from '@/components/DataTable.vue'; // Importa el componente DataTable

export default {
  components: {
    Menu,
    TransactionModal,
    ReportesTable,
    StackedColumnChart,
    ZoomableTimeseriesChart,
    DataTable, // Registra el componente DataTable
  },
  data() {
    return {
      showModal: false,
      tableData: [], // Datos originales de la API
      formattedTableData: [], // Datos formateados para DataTable
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
        // ...otros datos
      ],
      reportesHeaders: ['Sucursal', 'Mes', 'Ingresos', 'Egresos', 'Beneficio Neto', 'Actividad'],
      graficaReportesData: [
        { mes: 'Enero', ingresos: 10000, egresos: 5000 },
        // ...otros datos
      ],
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    handleTransaction(transaction) {
      this.tableData.push(transaction);
      this.formatTableData(); // Actualiza los datos formateados
      this.showModal = false;
    },
    async fetchTransacciones() {
      try {
        const transacciones = await api.obtenerTransacciones();
        console.log('Datos recibidos de la API:', transacciones);

        // Guarda los datos originales
        this.tableData = transacciones;

        // Formatea los datos para DataTable
        this.formatTableData();
      } catch (error) {
        console.error("Error al obtener transacciones:", error);
      }
    },
    formatTableData() {
      // Mapea los datos al formato esperado por DataTable
      this.formattedTableData = this.tableData.map(t => ({
        nombreUsuario: t.nombre_usuario,
        rol: t.rol,
        metodoPago: t.metodo_pago,
        monto: `$${t.monto.toFixed(2)}`, // Formatear el monto con dos decimales
        estatus: t.estatus,
        fechaRegistro: new Date(t.fecha_registro).toLocaleString(),
        tipoTransaccion: t.tipo_transaccion,
      }));
    },
  },
  mounted() {
    this.fetchTransacciones(); // Llama a la API al cargar el componente
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