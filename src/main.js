import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import goods from 'components/goods/goods';
import ratings from 'components/ratings/ratings';
import seller from 'components/seller/seller';

import 'common/stylus/index.styl';

Vue.use(VueRouter);
Vue.use(VueResource);

/* eslint-disable no-new */
// new Vue({
//   el: 'body',
//   components: { App }
// });

let app = Vue.extend(App);

// vue-router1.0 参考https://github.com/vuejs/vue-router/blob/1.0/docs/zh-cn/options.md
let router = new VueRouter({
    linkActiveClass: 'active'
});

// 定义路由规则
// 每条路由规则应该映射到一个组件。这里的“组件”可以是一个使用 Vue.extend
// 创建的组件构造函数，也可以是一个组件选项对象
router.map({
    '/goods': {
        component: goods
    },
    '/ratings': {
        component: ratings
    },
    '/seller': {
        component: seller
    }
});

// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
router.start(app, '#app');

router.go('/goods');
