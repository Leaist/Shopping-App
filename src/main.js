import Vue from 'vue';
import Vant from 'vant';
import 'vant/lib/index.css'; //引入css
import App from './App.vue';
import router from './router';
import { serverUrl } from './utils/tools';
import 'nprogress/nprogress.css';

Vue.filter('dalImg', (val) => {
  if (val) {
    if (val.startsWith('http')) {
      return val;
    } else {
      return serverUrl + val;
    }
  } else {
    // return "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2388634225,2417364686&fm=26&gp=0.jpg";
    return 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604324871518&di=cece8411484733b269c66511a98d5265&imgtype=0&src=http%3A%2F%2Fpic.baiqi008.com%2Fuploads%2Fcushrhrqx.jpeg';
  }
});

Vue.use(Vant);
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
