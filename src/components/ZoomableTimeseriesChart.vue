<template>
    <div id="chart">
      <ApexChart
        type="area"
        height="350"
        :options="chartOptions"
        :series="series"
      ></ApexChart>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ZoomableTimeseriesChart',
    props: {
      data: {
        type: Array,
        required: true,
      },
    },
    setup(props) {
      // Procesar los datos para la gráfica
      const dates = props.data.map((item) => {
        // Convertir la fecha de registro a un formato válido para ApexCharts
        return new Date(item.fechaRegistro).getTime();
      });
  
      const amounts = props.data.map((item) => {
        // Convertir el monto a un número (eliminar el símbolo de dólar)
        return parseFloat(item.monto.replace('$', ''));
      });
  
      // Configurar las series para ApexCharts
      const series = [
        {
          name: 'Monto de Transacciones',
          data: dates.map((date, index) => [date, amounts[index]]),
        },
      ];
  
      // Configurar las opciones de la gráfica
      const chartOptions = {
        chart: {
          type: 'area',
          stacked: false,
          height: 350,
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true,
          },
          toolbar: {
            autoSelected: 'zoom',
          },
        },
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 0,
        },
        title: {
          text: 'Movimiento de Transacciones',
          align: 'left',
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 90, 100],
          },
        },
        yaxis: {
          labels: {
            formatter: function (val) {
              return `$${val.toFixed(2)}`; // Formatear el monto como moneda
            },
          },
          title: {
            text: 'Monto',
          },
        },
        xaxis: {
          type: 'datetime',
        },
        tooltip: {
          shared: false,
          y: {
            formatter: function (val) {
              return `$${val.toFixed(2)}`; // Formatear el monto como moneda en el tooltip
            },
          },
        },
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
  }
  </style>