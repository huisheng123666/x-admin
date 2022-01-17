import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'normalize.css';
import ElementPlus from 'element-plus';
import zhCh from 'element-plus/es/locale/lang/zh-cn';
import '@/assets/style/reset.css';
import 'element-plus/dist/index.css';
import '@/assets/style/index.scss';
import '@/assets/style/icon.css'
import instruction from '@/instruction/instruction';
import 'nprogress/nprogress.css'

const app = createApp(App);

Object.keys(instruction).forEach(key => {
  app.directive(key, instruction[key])
})

app.use(router);
app.use(store);

// app.config.warnHandler = () => {}

app.use(ElementPlus, { size: 'small', locale: zhCh });

app.mount('#app');
