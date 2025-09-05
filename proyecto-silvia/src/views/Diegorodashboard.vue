<template>
  <q-layout view="lHh Lpr lFf" class="bg-app">
    <!-- Sidebar -->
    <q-drawer v-model="drawer" show-if-above :width="260" bordered class="drawer-dark">
      <div class="q-pa-md row items-center">
        <q-avatar size="36px" class="q-mr-sm">
          <img src="https://i.pravatar.cc/72" alt="user" />
        </q-avatar>
        <div>
          <div class="text-subtitle2 text-weight-medium">Louis Carter</div>
          <q-btn flat dense no-caps label="Edit" color="yellow-7" class="q-pa-none text-caption" />
        </div>
      </div>

      <q-list padding class="text-grey-4">
        <q-item clickable v-ripple active-class="nav-active" :active="nav==='dashboard'" @click="nav='dashboard'">
          <q-item-section avatar>📊</q-item-section>
          <q-item-section>Dashboard</q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar>⚡</q-item-section>
          <q-item-section>Activity</q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar>📅</q-item-section>
          <q-item-section>Schedule</q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar>⚙️</q-item-section>
          <q-item-section>Settings</q-item-section>
        </q-item>
      </q-list>

      <div class="q-pa-md">
        <div class="row items-center justify-between text-grey-5 q-mb-xs">
          <span class="text-caption">Light</span>
          <span class="text-caption">Dark</span>
        </div>
        <q-toggle v-model="darkOn" color="yellow-6" checked-icon="check" />
      </div>
    </q-drawer>

    <!-- Header -->
    <q-header elevated class="header-dark">
      <q-toolbar class="q-px-lg header-bar">
        <q-btn flat round dense class="text-grey-4" @click="drawer=!drawer">
          <span aria-hidden="true">☰</span>
        </q-btn>

        <div class="row items-center no-wrap q-ml-sm">
          <div class="text-h6 text-grey-2">Estadística</div>
          <div class="text-subtitle1 text-yellow-6 text-weight-bold q-ml-md">Administrador</div>
        </div>

        <q-space />

        <q-input
          dense
          rounded
          standout="bg-grey-9 text-grey-3"
          v-model="search"
          placeholder="Buscar algo..."
          class="search-input"
        >
          <template #prepend>
            <span class="text-grey-5" aria-hidden="true">🔎</span>
          </template>
        </q-input>

        <q-btn color="yellow-6" text-color="black" class="q-ml-md" no-caps label="Mejora" />

        <q-btn flat dense class="q-ml-sm text-grey-4" no-caps @click="logout">
          <span class="q-mr-xs" aria-hidden="true">🚪</span> Cerrar sesión
        </q-btn>
      </q-toolbar>
    </q-header>

    <!-- Contenido -->
    <q-page-container>
      <!-- Importante: q-pt-none para quitar padding superior (elimina el “espacio en blanco”) -->
      <q-page class="page-dark q-pr-xl q-pl-xl q-pb-xl q-pt-none">
        <div class="dashboard-grid">
          <!-- Website traffic -->
          <q-card class="card-dark highlight">
            <q-card-section>
              <div class="text-caption text-grey-5 q-mb-xs">Tráfico del sitio web</div>
              <div class="traffic-ring q-mb-sm">
                <div class="ring">
                  <div class="ring-inner">
                    <div class="ring-value">12k</div>
                  </div>
                </div>
              </div>
              <div class="row items-center q-mb-xs text-caption">
                <div class="col">Social Media</div>
                <div class="col-auto text-grey-4">78%</div>
              </div>
              <q-linear-progress color="yellow-6" track-color="grey-8" :value="0.78" class="rounded-bars q-mb-sm" />
              <div class="row items-center text-caption">
                <div class="col">Organic Search</div>
                <div class="col-auto text-grey-4">22%</div>
              </div>
              <q-linear-progress color="yellow-6" track-color="grey-8" :value="0.22" class="rounded-bars" />
            </q-card-section>
          </q-card>

          <!-- Full report -->
          <q-card class="card-dark">
            <q-card-section class="q-pb-none">
              <div class="row items-center justify-between">
                <div class="text-caption text-grey-5">Informe completo</div>
                <div class="text-caption text-grey-5">/ 2023</div>
              </div>
            </q-card-section>
            <q-card-section class="q-pt-lg q-pb-lg bg-tile"></q-card-section>
            <q-card-actions align="between" class="q-pa-md">
              <q-btn outline color="grey-5" no-caps label="Descargar informe" />
              <q-btn flat round dense class="text-grey-4">☁️⬇️</q-btn>
            </q-card-actions>
          </q-card>

          <!-- Bounce rate -->
          <q-card class="card-dark">
            <q-card-section>
              <div class="row items-center justify-between q-mb-sm">
                <div class="text-subtitle2 text-grey-4">Tasa de rebote</div>
                <q-btn dense flat round class="text-grey-5">⋯</q-btn>
              </div>
              <div class="calendar-row q-mb-md">
                <div class="day">Lun<br><span>2</span></div>
                <div class="day active">Mar<br><span>3</span></div>
                <div class="day">Mié<br><span>4</span></div>
              </div>
              <div class="text-h5 text-grey-2 q-mb-xs">23%</div>
              <div class="text-caption text-grey-5">+10% desde ayer</div>
            </q-card-section>
          </q-card>

          <!-- ROI -->
          <q-card class="card-dark">
            <q-card-section>
              <div class="row items-center justify-between">
                <div class="text-caption text-grey-5">ROI</div>
                <q-btn flat dense no-caps class="text-grey-5">Detalles</q-btn>
              </div>
              <div class="text-h5 text-yellow-6 q-mt-sm">283%</div>
              <div class="sparkline q-mt-md"></div>
              <div class="text-caption text-grey-5 q-mt-xs">Retorno de inversión</div>
            </q-card-section>
          </q-card>

          <!-- Image card -->
          <q-card class="card-dark flex flex-center">
            <div class="text-center">
              <q-img
                src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&q=80&auto=format"
                style="width: 220px; height: 220px; border-radius: 16px"
                spinner-color="yellow-6"
              />
              <div class="q-mt-sm">
                <q-badge color="yellow-6" text-color="black" class="badge-pill">Puntaje web con IA</q-badge>
              </div>
            </div>
          </q-card>

          <!-- Churn -->
          <q-card class="card-dark">
            <q-card-section>
              <div class="text-subtitle2 text-grey-4 q-mb-sm">Customer Churn Rate</div>
              <div class="bar-chart">
                <div class="bar"><div class="fill" style="height: 30%"></div></div>
                <div class="bar"><div class="fill" style="height: 55%"></div></div>
                <div class="bar">
                  <div class="fill active" style="height: 75%">
                    <span class="bubble">12.8%</span>
                  </div>
                </div>
                <div class="bar"><div class="fill" style="height: 45%"></div></div>
                <div class="bar"><div class="fill" style="height: 35%"></div></div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const drawer = ref(true)
const search = ref('')
const darkOn = ref(true)
const nav = ref('dashboard')

const logout = () => {
  try {
    localStorage.removeItem('sessionToken')
    localStorage.removeItem('loggedUser')
  } catch (e) {}
  router.replace('/login')
}
</script>

<style scoped>
/* Fondo general y contenedores */
.bg-app { background: #2f3942; }
.page-dark { background: #1d2227; min-height: 100vh; }
.header-dark { background: #171b1f; }

/* Toolbar compacto y sin rellenos verticales extra */
.header-bar { min-height: 56px; padding-top: 0; padding-bottom: 0; }

/* Drawer */
.drawer-dark { background: #171b1f; color: #e0e0e0; }

/* Navegación activa */
.nav-active { background: rgba(255,255,255,0.06); border-radius: 10px; }

/* Buscador */
.search-input { width: 320px; max-width: 40vw; }

/* Grid principal (3x2) */
.dashboard-grid {
  display: grid;
  grid-template-columns: 320px 320px 320px;
  grid-auto-rows: 200px;
  gap: 16px;
}
@media (max-width: 1100px) {
  .dashboard-grid { grid-template-columns: 1fr; }
}

/* Cards oscuras */
.card-dark {
  background: #1f252b;
  border-radius: 14px;
  color: #e6e6e6;
  box-shadow: 0 10px 24px rgba(0,0,0,0.35);
}

/* Borde de realce */
.highlight { border: 2px solid rgba(255, 235, 59, 0.25); }

/* Ring de tráfico */
.traffic-ring .ring {
  width: 124px; height: 124px; border-radius: 50%;
  background: conic-gradient(#f2cf1d 0 280deg, #3a424a 0 360deg);
  display: grid; place-items: center;
}
.traffic-ring .ring-inner {
  width: 94px; height: 94px; border-radius: 50%;
  background: #1f252b; display: grid; place-items: center;
  box-shadow: inset 0 0 0 6px #2a3239;
}
.ring-value { font-size: 28px; font-weight: 700; color: #eaeaea; }

/* Progress bars redondeadas */
.rounded-bars { height: 8px; border-radius: 8px; overflow: hidden; }

/* Mosaico decorativo */
.bg-tile {
  height: 86px; border-radius: 12px;
  background-image:
    radial-gradient(#2a3137 1px, transparent 1px),
    radial-gradient(#2a3137 1px, transparent 1px);
  background-position: 0 0, 10px 10px;
  background-size: 20px 20px;
}

/* Calendario mini */
.calendar-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.calendar-row .day {
  background: #272d33; border-radius: 10px; text-align: center;
  color: #b9c0c7; padding: 10px 6px; line-height: 1.1; font-size: 12px;
}
.calendar-row .day span { display: block; font-weight: 700; color: #e0e3e7; margin-top: 2px; }
.calendar-row .day.active { background: #f2cf1d; color: #111; }
.calendar-row .day.active span { color: #111; }

/* Sparkline */
.sparkline {
  height: 48px; border-radius: 8px;
  background:
    linear-gradient(0deg, rgba(242,207,29,0.18), rgba(242,207,29,0.18)) 0 70% / 100% 2px no-repeat,
    radial-gradient(ellipse at 10% 70%, rgba(242,207,29,0.35), transparent 40%),
    radial-gradient(ellipse at 40% 50%, rgba(242,207,29,0.35), transparent 40%),
    radial-gradient(ellipse at 70% 60%, rgba(242,207,29,0.35), transparent 40%),
    radial-gradient(ellipse at 90% 40%, rgba(242,207,29,0.35), transparent 40%);
}

/* Imagen + badge */
.badge-pill { border-radius: 999px; padding: 4px 10px; font-weight: 600; }

/* Barras */
.bar-chart { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; height: 160px; align-items: end; }
.bar {
  background: #262c32; border-radius: 10px; height: 100%;
  display: flex; align-items: flex-end; justify-content: center; padding: 6px;
}
.fill {
  width: 70%; background: #f2cf1d; border-radius: 8px 8px 2px 2px; position: relative;
}
.bubble {
  position: absolute; top: -24px; left: 50%; transform: translateX(-50%);
  background: #2b3137; color: #eaeaea; font-size: 10px; padding: 2px 6px; border-radius: 6px;
  box-shadow: 0 3px 10px rgba(0,0,0,.35);
}
</style>
