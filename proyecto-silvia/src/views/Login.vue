<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <!-- Centrado total: ocupa el alto de la ventana y centra con Flex -->
      <q-page class="column items-center justify-center window-height bg-grey-2">
        <q-card class="q-pa-lg auth-card">
          <q-card-section class="text-center">
            <div class="text-h5 q-mb-md">Iniciar Sesión</div>

            <!-- Mensaje de error -->
            <q-banner v-if="errorMessage" class="bg-red-2 text-red-10 q-mb-md">
              {{ errorMessage }}
            </q-banner>

            <!-- Formulario -->
            <q-form @submit.prevent="login" class="column q-gutter-md">
              <!-- Email -->
              <q-input
                filled
                v-model.trim="email"
                type="email"
                label="Correo"
                placeholder="ejemplo@correo.com"
                :rules="[
                  v => !!v || 'El correo es obligatorio',
                  v => emailRegex.test(v) || 'Formato de correo inválido'
                ]"
              />

              <!-- Contraseña -->
              <q-input
                filled
                v-model="password"
                type="password"
                label="Contraseña"
                placeholder="Mínimo 8 caracteres, mayúscula y número"
                :rules="[
                  v => !!v || 'La contraseña es obligatoria',
                  v => passwordRegex.test(v) || 'Contraseña insegura'
                ]"
              />

              <!-- Rol -->
              <q-select
                filled
                v-model="role"
                :options="roles"
                label="Rol"
                :rules="[v => !!v || 'El rol es obligatorio']"
                option-value="value"
                option-label="label"
                emit-value
                map-options
                behavior="menu"
                hide-dropdown-icon
              />

              <!-- Botón -->
              <q-btn
                type="submit"
                :label="isBlocked ? `Bloqueado (${remainingTime}s)` : 'Ingresar'"
                :disable="isBlocked"
                color="primary"
                unelevated
                class="full-width"
              />

              <!-- Mensaje de bloqueo -->
              <div v-if="isBlocked" class="text-negative text-caption q-mt-sm">
                Demasiados intentos fallidos. Intenta de nuevo en {{ remainingTime }}s.
              </div>
            </q-form>

            <!-- Link a registro -->
            <div class="q-mt-md text-caption">
              ¿No tienes cuenta?
              <router-link to="/register">Regístrate aquí</router-link>
            </div>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')
const role = ref('')
const roles = ref([
  { label: 'Usuario', value: 'user' },
  { label: 'Administrador', value: 'admin' }
])

const errorMessage = ref('')
const attempts = ref(0)
const isBlocked = ref(false)
const remainingTime = ref(0)
let blockTimer = null

// Regex de validaciones
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

// Función de login
const login = () => {
  errorMessage.value = ''

  // Validaciones mínimas
  if (!email.value || !password.value || !role.value) {
    errorMessage.value = 'Todos los campos son obligatorios (incluye el rol).'
    return
  }
  if (!emailRegex.test(email.value)) {
    errorMessage.value = 'Formato de correo inválido.'
    return
  }
  if (!passwordRegex.test(password.value)) {
    errorMessage.value = 'La contraseña debe tener mínimo 8 caracteres, incluir mayúscula, minúscula y número.'
    return
  }

  // Obtener usuarios desde localStorage
  const users = JSON.parse(localStorage.getItem('users')) || []
  const user = users.find(u => u.email === email.value.trim())

  if (!user) {
    handleError('El correo no está registrado.')
    return
  }
  if (user.password !== password.value) {
    handleError('Contraseña incorrecta.')
    return
  }
  // Validar que el rol elegido coincida con el rol del usuario
  if (user.role !== role.value) {
    handleError('El rol seleccionado no coincide con tu cuenta.')
    return
  }

  // Guardar token y usuario en localStorage
  const token = Math.random().toString(36).substring(2)
  localStorage.setItem('sessionToken', token)
  localStorage.setItem('loggedUser', JSON.stringify(user))

  // Redirigir según rol elegido
  if (role.value === 'admin') {
    router.push('/diegorodashboard')
  } else {
    router.push('/dashboard')
  }
}

// Manejo de errores con bloqueo
const handleError = (message) => {
  attempts.value++
  errorMessage.value = message

  if (attempts.value >= 3) {
    isBlocked.value = true
    remainingTime.value = 30

    if (blockTimer) clearInterval(blockTimer)
    blockTimer = setInterval(() => {
      remainingTime.value--
      if (remainingTime.value <= 0) {
        clearInterval(blockTimer)
        isBlocked.value = false
        attempts.value = 0
      }
    }, 1000)
  }
}
</script>

<style scoped>
/* Ancho del card y centrado limpio */
.auth-card {
  width: 100%;
  max-width: 400px;
}
</style>
