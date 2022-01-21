<script>
import { Line } from 'vue-chartjs';

export default {
  extends: Line,
  props: {
    chartData: Object,
  },
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
};
</script>
