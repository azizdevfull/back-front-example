<!-- src/App.vue -->
<template>
  <div id="app" class="min-h-screen bg-gray-100">

    <main class="container mx-auto px-4 py-8">
      <router-view @logout="logout"></router-view>
    </main>
  </div>
</template>

<script>
</script>