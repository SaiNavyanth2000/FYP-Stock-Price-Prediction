import Vue from 'vue';
import VueRouter from 'vue-router';
import Frontview from '../components/Frontview.vue';
import PredictPrice from '../components/PredictPrice.vue';
import Chart from '../components/Chart.vue';

Vue.use(VueRouter);
export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Frontview',
      component: Frontview,
    },
    {
      path: '/predict',
      name: 'PredictPrice',
      component: PredictPrice,
    },
    {
      name: 'Chart',
      component: Chart,
    },
  ],
});
