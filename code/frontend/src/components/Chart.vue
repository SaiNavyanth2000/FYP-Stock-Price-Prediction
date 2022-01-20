<script>
import { Line, mixins } from 'vue-chartjs';
import axios from 'axios';

const { reactiveProp } = mixins;

export default {
  extends: Line,
  mixins: [reactiveProp],
  data() {
    return {
      selected: this.$router.currentRoute.params.selected,
      stockPrice: null,
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  created() {
    this.getData();
  },
  methods: {
    back() {
      this.$router.push('/');
    },
    getData() {
      const path = 'http://127.0.0.1:5000/predict';
      console.log(path, this.selected);
      axios
        .get(path, {
          params: {
            ticker: this.selected,
          },
        })
        .then((response) => {
          this.stockPrice = response;
        })
        .catch((err) => {
          console.log(err);
        });
      // this.$router.push('/predict');
    },
  },
  computed: {
    chartdata() {
      return {

        // converted date string in the right format this way: https://www.codegrepper.com/code-examples/javascript/convert+timestamp+to+dd%2Fmm%2Fyyyy+in+javascript
        labels: Object.keys(JSON.parse(this.stockPrice.data.past_100_days))
          .map((a) => new Date(a / 1).toISOString().split('T')[0]),
        datasets: [{
          label: 'Stock Price',
          // backgroundColor: '#f87979',
          data: Object.values(JSON.parse(this.stockPrice.data.past_100_days)),
        }],
      };
    },
  },
  watch: {
    stockPrice() {
      // console.log('new',
      // JSON.parse(newValue.data.past_100_days),
      // this.chartdata, this.options, oldValue);
      this.renderChart(this.chartdata, this.options);
      // this.$data._chart.update();
    },
  },
};
</script>
