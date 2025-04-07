<template>
  <div id="chart">
    <ApexChart
      type="pie"
      :options="chartOptions"
      :series="series"
    ></ApexChart>
  </div>
</template>

<script>
export default {
  name: 'SimplePieChart',
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    // Agrupar los datos por tipo de transacción
    const groupedData = props.data.reduce((acc, item) => {
      if (!acc[item.tipoTransaccion]) {
        acc[item.tipoTransaccion] = 0;
      }
      acc[item.tipoTransaccion] += item.monto;
      return acc;
    }, {});

    // Extraer las series (montos) y etiquetas (tipos de transacción)
    const series = Object.values(groupedData); // Montos agrupados
    const labels = Object.keys(groupedData); // Tipos de transacción

    console.log('Series:', series); // Verifica los montos agrupados
    console.log('Labels:', labels); // Verifica los tipos de transacción

    // Configurar las opciones de la gráfica
    const chartOptions = {
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: labels, // Etiquetas basadas en los tipos de transacción
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };

    return {
      series,
      chartOptions,
    };
  },
};
</script>

<style scoped>
#chart {
  width: 100%;
  min-height: 300px; /* Asegúrate de que tenga una altura mínima */
}
</style>