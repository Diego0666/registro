import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    users: [],       // registros
    token: null,     // sesión activa
    currentUser: null
  }),
  actions: {
    register(user) {
      this.users.push(user)
    },
    login(email, password) {
      const user = this.users.find(u => u.email === email && u.password === password)
      if (user) {
        this.token = Date.now().toString() // simulamos token
        this.currentUser = user
        return true
      }
      return false
    },
    logout() {
      this.token = null
      this.currentUser = null
    }
  }
})
