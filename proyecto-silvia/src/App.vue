<template>
  <div id="app" class="min-h-screen flex flex-col">
    <!-- HEADER -->
    <header class="bg-blue-600 text-white py-4 px-6 shadow-lg">
      <h1 class="text-2xl font-bold">Proyecto de Silvia</h1>
    </header>

    <!-- MAIN CONTENT -->
    <main class="flex-1 p-6 bg-gray-100">
      <!-- Aquí irá el router -->
      <router-view />
    </main>

    <!-- FOOTER -->
    <footer class="bg-gray-800 text-white py-4 text-center">
      <p>&copy; {{ new Date().getFullYear() }} Proyecto de Silvia</p>
    </footer>
  </div>
</template>

<script setup>
// nada por ahora, luego podemos agregar lógica global
</script>

<style>
/* Estilos base, si no usas Tailwind puedes personalizar aquí */
body {
  margin: 0;
  font-family: Arial, sans-serif;
}
</style>
