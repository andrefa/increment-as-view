const counter = Vue.component('Counter', {
  template: `
    <div class="column col-6 col-lg-8 col-md-12 col-sm-12 col-mx-auto">
      <div class="empty">
        <div class="empty-icon"><i class="icon icon-3x icon-emoji"></i></div>
        <p class="empty-title h5">Counters!</p>

        <p class="empty-title h3">{{ result }}</p>

        <div class="form-group">
          <button class="btn btn-primary input-group-btn" v-on:click="current" :disabled="loading">
            Current <i class="icon icon-refresh"></i>
          </button>
          <button class="btn btn-primary input-group-btn" v-on:click="next" :disabled="loading">
            Next <i class="icon icon-plus"></i>
          </button>

        </div>
        <div class="form-group">
          <input class="form-input col-3" type="number" id="reset-to"
            v-model="resetTo" placeholder="Reset to" style="display: inline;"
            min="0" max="2147483647">
        </div>
        <div class="form-group">
          <button class="btn btn-primary input-group-btn" v-on:click="reset" :disabled="loading">
            Reset <i class="icon icon-edit"></i>
          </button>
        </div>
        <div class="form-group">
          <a v-on:click="logout">Logout</a>
        </div>
        <p class="empty-title text-error">{{ error }}</p>
      </div>
    </div>
`,
  data: () => ({
    result: '',
    resetTo: '',
    error: '',
    loading: false
  }),
  methods: {
    async current() {
      this.execute('counter/current', 'GET')
    },
    async next() {
      this.execute('counter/next', 'GET')
    },
    async reset() {
      this.execute('counter/current', 'PUT', { current: this.resetTo })
      this.resetTo = ''
    },
    async logout() {
      localStorage.removeItem('token')
      router.push('/')
    },
    async execute(url, method, payload) {
      this.result = ''
      this.error = ''
      this.loading = true

      try {
        const content = await request(url, method, payload)
        this.result = content.counter
      } catch (error) {
        this.error = error.message
      }

      this.loading = false
    }
  }
})
