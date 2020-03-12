Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: login,
    beforeEnter(to, from, next) {
      if(localStorage.getItem('token') == null) {
        next();
      } else {
        next('/counter')
      }
    }
  }, {
    path: '/register',
    component: register,
    beforeEnter(to, from, next) {
      if(localStorage.getItem('token') == null) {
        next();
      } else {
        next('/counter')
      }
    }
  }, {
    path: '/counter',
    component: counter,
    beforeEnter(to, from, next) {
      if(localStorage.getItem('token') != null) {
        next();
      } else {
        next('/')
      }
    }
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({ routes })

const app = new Vue({
    el: '#app',
    router
})
