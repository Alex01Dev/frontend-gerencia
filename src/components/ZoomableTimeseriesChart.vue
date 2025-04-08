<template>
  <div id="chart">
    <ApexChart
      v-if="series.length > 0"
      :key="chartKey"
      type="pie"
      :options="chartOptions"
      :series="series"
    ></ApexChart>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue';

export default {
  name: 'SimplePieChart',
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const chartKey = ref(0);
    
    const groupedData = computed(() => {
      return props.data.reduce((acc, item) => {
        const tipo = item.tipoTransaccion || 'Sin tipo';
        if (!acc[tipo]) {
          acc[tipo] = 0;
        }
        acc[tipo] += item.monto || 0;
        return acc;
      }, {});
    });

    const series = computed(() => Object.values(groupedData.value));
    const labels = computed(() => Object.keys(groupedData.value));

    const chartOptions = computed(() => ({
      chart: {
        width: '100%',
        type: 'pie',
        animations: {
          enabled: true,
        },
      },
      labels: labels.value,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: '100%',
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    }));

    watch(() => props.data, () => {
      chartKey.value += 1;
    }, { deep: true });

    return {
      series,
      chartOptions,
      chartKey,
    };
  },
};
</script>

<style scoped>
#chart {
  width: 90%;
  min-height: 400px;
  position: relative;
}
</style>