import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
// import html2canvas from 'https://cdn.bootcss.com/html2canvas/0.5.0-beta4/html2canvas.js'
// import jspdf from 'https://cdn.bootcss.com/jspdf/1.3.4/jspdf.debug.js'
// console.log(html2canvas);
Vue.use(ElementUI)

new Vue({
  el: '#app',
  render: h => h(App)
})

Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})