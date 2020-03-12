const login = Vue.component('Login', {
  template: `
    <div class="column col-6 col-lg-8 col-md-12 col-sm-12 col-mx-auto">
      <div class="empty">
        <div class="empty-icon"><i class="icon icon-3x icon-people"></i></div>
        <p class="empty-title h5">Login</p>
        <div class="form-group">
          <label class="form-label" for="login-email">Email</label>
          <input class="form-input" type="text" id="login-email"
            v-model="email" placeholder="Email">
        </div>
        <div class="form-group">
          <label class="form-label" for="login-pwd">Password</label>
          <input class="form-input" type="password" id="login-pwd"
            v-model="password" placeholder="Password">
        </div>
        <div class="form-group">
          <button class="btn btn-primary input-group-btn" v-on:click="login" :disabled="loading">
            Login
          </button>
          <router-link to="/register">Register</router-link>
        </div>
        <p class="empty-title text-error">{{ error }}</p>
      </div>
    </div>
`,
  data: () => ({
    email: '',
    password: '',
    error: '',
    loading: false
  }),
  methods: {
    async login() {
      this.error = ''
      this.loading = true

      const payload = {
        email: this.email,
        password: this.password
      }

      try {
        const content = await request('auth/login', 'POST', payload)
        localStorage.setItem('token', content.token)
        router.push('/counter')
      } catch (error) {
        this.error = error.message
      }

      this.loading = false
    }
  }
})
