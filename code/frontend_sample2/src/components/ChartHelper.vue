<script>
import { Line } from 'vue-chartjs';

export default {
  extends: Line,
  props: {
    chartData: Object,
  },
  // https://stackoverflow.com/questions/28031873/make-x-label-horizontal-in-chartjs
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            ticks: {
              autoSkip: true,
              maxTicksLimit: 10,
              maxRotation: 0,
              minRotation: 0,
            },
          }],
        },
      },
    };
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
};
</script>
