<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <!-- Página centrada a pantalla completa -->
      <q-page class="flex flex-center bg-gradient-blue">
        <q-card class="form-card card-glass q-pa-xl shadow-12">
          <!-- Encabezado -->
          <q-card-section class="text-center q-pb-sm">
           
            <div class="text-h5 text-weight-bold text-primary q-mb-xs">
              Registro de Usuario
            </div>
            <div class="text-subtitle2 text-grey-7">
              Crea tu cuenta para comenzar
            </div>
          </q-card-section>

          <q-separator spaced />

          <q-card-section class="q-pt-none">
            <!-- Mensajes globales -->
            <q-banner v-if="successMessage" class="bg-green-2 text-green-10 q-mb-md" rounded>
              {{ successMessage }}
            </q-banner>
            <q-banner v-if="errorMessage" class="bg-red-2 text-red-10 q-mb-md" rounded>
              {{ errorMessage }}
            </q-banner>

            <q-form @submit.prevent="register" class="column q-gutter-md">
              <!-- Nombre completo -->
              <q-input
                filled dense rounded class="field-tight"
                v-model.trim="fullName"
                label="Nombre completo"
                placeholder="Ej: Ana López"
                :rules="[ v => !!v || 'El nombre es requerido' ]"
                clearable
                prefix="👤"
              />

              <!-- Correo -->
              <q-input
                filled dense rounded class="field-tight"
                v-model.trim="email"
                type="email"
                label="Correo"
                placeholder="ejemplo@correo.com"
                :rules="[ v => !!v || 'El correo es requerido' ]"
                clearable
                prefix="📧"
              />
              <q-slide-transition>
                <div v-if="emailError" class="text-negative text-caption q-mt-xs">{{ emailError }}</div>
              </q-slide-transition>

              <!-- Contraseña -->
              <q-input
                filled dense rounded class="field-tight"
                v-model="password"
                :type="showPass ? 'text' : 'password'"
                label="Contraseña"
                placeholder="Mínimo 8 caracteres, mayúscula, minúscula, número y símbolo"
                :rules="[ v => !!v || 'La contraseña es requerida' ]"
                prefix="🔒"
              > 
              
              </q-input>
              <q-slide-transition>
                <div v-if="passwordError" class="text-negative text-caption q-mt-xs">{{ passwordError }}</div>
              </q-slide-transition>

              <!-- Confirmar contraseña -->
              <q-input
                filled dense rounded class="field-tight"
                v-model="confirmPassword"
                :type="showConfirm ? 'text' : 'password'"
                label="Confirmar contraseña"
                placeholder="Repite tu contraseña"
                :rules="[ v => !!v || 'Debe confirmar la contraseña' ]"
                prefix="🔒"
              >
                
              </q-input>
              <q-slide-transition>
                <div v-if="confirmPasswordError" class="text-negative text-caption q-mt-xs">{{ confirmPasswordError }}</div>
              </q-slide-transition>

              <!-- Selección de rol (simple, sin chips) -->
              <q-select
                filled dense rounded class="field-tight"
                v-model="role"
                :options="roles"
                label="Selecciona tu rol"
                :rules="[ v => !!v || 'Debes seleccionar un rol' ]"
                option-value="value"
                option-label="label"
                emit-value
                map-options
                behavior="menu"
                hide-dropdown-icon
              />

              <!-- Términos -->
              <div class="row items-center q-gutter-sm">
                <q-checkbox v-model="termsAccepted" color="primary" />
                <div class="text-body2">Acepto los términos y condiciones</div>
              </div>
              <q-slide-transition>
                <div v-if="!termsAccepted && triedSubmit" class="text-negative text-caption">
                  Debes aceptar los términos para continuar.
                </div>
              </q-slide-transition>

              <!-- reCAPTCHA -->
              <div id="recaptcha" class="q-my-xs"></div>
              <q-slide-transition>
                <div v-if="captchaError" class="text-negative text-caption">{{ captchaError }}</div>
              </q-slide-transition>

              <!-- Botón -->
              <q-btn
                type="submit"
                label="Registrarme"
                color="primary"
                unelevated
                rounded
                class="full-width q-mt-sm"
                no-caps
              />
            </q-form>
          </q-card-section>

          <q-separator spaced />

          <q-card-actions align="center">
            <div class="text-caption text-grey-7">
              ¿Ya tienes cuenta?
              <router-link to="/login" class="text-primary text-weight-medium">
                Inicia sesión aquí
              </router-link>
            </div>
          </q-card-actions>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const fullName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const role = ref('')
const roles = ref([
  { label: 'Usuario', value: 'user' },
  { label: 'Administrador', value: 'admin' }
])
const termsAccepted = ref(false)
const triedSubmit = ref(false)

const emailError = ref('')
const passwordError = ref('')
const confirmPasswordError = ref('')
const errorMessage = ref('')
const successMessage = ref('')
const captchaError = ref('')

let captchaToken = ref('')
const siteKey = '6Lc3H70rAAAAAH9QrJbrFS_1Up1VpkUcq9uqdQWl'

const showPass = ref(false)
const showConfirm = ref(false)

// Inicializa reCAPTCHA
onMounted(() => {
  if (window.grecaptcha) {
    window.grecaptcha.render('recaptcha', {
      sitekey: siteKey,
      callback: (token) => {
        captchaToken.value = token
        captchaError.value = ''
      },
      'error-callback': () => {
        captchaError.value = 'Error cargando reCAPTCHA. Intenta de nuevo.'
      },
      'expired-callback': () => {
        captchaError.value = 'El reCAPTCHA expiró. Valídalo otra vez.'
        captchaToken.value = ''
      }
    })
  }
})

// Registro (misma lógica)
const register = () => {
  triedSubmit.value = true
  emailError.value = ''
  passwordError.value = ''
  confirmPasswordError.value = ''
  errorMessage.value = ''
  successMessage.value = ''
  captchaError.value = ''

  const cleanEmail = email.value.trim()
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(cleanEmail)) {
    emailError.value = 'Formato de correo inválido.'
    return
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
  if (!passwordRegex.test(password.value)) {
    passwordError.value = 'La contraseña debe tener mínimo 8 caracteres e incluir mayúscula, minúscula, número y símbolo.'
    return
  }

  if (password.value !== confirmPassword.value) {
    confirmPasswordError.value = 'Las contraseñas no coinciden.'
    return
  }

  if (!role.value) {
    errorMessage.value = 'Debes seleccionar un rol.'
    return
  }

  if (!termsAccepted.value) {
    errorMessage.value = 'Debes aceptar los términos y condiciones.'
    return
  }

  if (!captchaToken.value) {
    captchaError.value = 'Debes validar el reCAPTCHA.'
    return
  }

  const users = JSON.parse(localStorage.getItem('users')) || []
  const exists = users.find(u => u.email === cleanEmail)
  if (exists) {
    errorMessage.value = 'El correo ya está registrado.'
    return
  }

  const newUser = {
    fullName: fullName.value.trim(),
    email: cleanEmail,
    password: password.value,
    role: role.value,
    createdAt: new Date().toISOString()
  }

  users.push(newUser)
  localStorage.setItem('users', JSON.stringify(users))

  successMessage.value = '✅ Registro exitoso. Redirigiendo...'
  setTimeout(() => router.push('/login'), 2000)
}
</script>

<style scoped>
/* Fondo y card */
.bg-gradient-blue{
  min-height:100vh;
  background: radial-gradient(900px 420px at 85% 10%, #e3f2fd 0%, transparent 55%),
              linear-gradient(135deg,#e3f2fd 0%,#ffffff 50%,#e3f2fd 100%);
}
.form-card{ width:100%; max-width:440px; border-radius:20px; }
.card-glass{ background:#fff; backdrop-filter:saturate(140%) blur(6px); }

/* Ajustes para evitar solapes con íconos */
:deep(.field-tight .q-field__control){
  min-height:44px;
  padding:0 10px;
}

/* Suavizado visual */
:deep(.q-banner){ border-radius:10px; }
</style>
