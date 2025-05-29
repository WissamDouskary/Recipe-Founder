<script setup>
import { RouterLink, useRoute } from 'vue-router';

const isActiveLink = (routePath) => {
    const route = useRoute();
    return route.path == routePath;
}

</script>

<template>
  <nav class="w-full bg-white border-b border-gray-200 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        
        <RouterLink to="/" class="flex items-center space-x-2">
          <svg class="h-8 w-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
        </RouterLink>

        <div class="hidden md:flex items-center space-x-6">
          <RouterLink
            to="/"
            :class="`text-gray-700 hover:text-orange-500 px-3 py-2 text-sm font-medium transition-colors duration-200 ${isActiveLink('/') ? 'text-orange-500 border-b-2 border-orange-500' : ''}`"
          >
            Home
          </RouterLink>

          <RouterLink
            to="/recips"
            :class="`text-gray-700 hover:text-orange-500 px-3 py-2 text-sm font-medium transition-colors duration-200 ${isActiveLink('/recips') ? 'text-orange-500 border-b-2 border-orange-500' : ''}`"
          >
            Recips
          </RouterLink>

          <RouterLink
            to="/favori"
            :class="`text-gray-700 hover:text-orange-500 px-3 py-2 text-sm font-medium transition-colors duration-200 ${isActiveLink('/favori') ? 'text-orange-500 border-b-2 border-orange-500' : ''}`"
          >
            Favorites
          </RouterLink>
        </div>

        <div class="md:hidden">
          <button class="text-gray-700 hover:text-orange-500 p-2 transition-colors duration-200">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
nav {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

a, button {
  transition: color 0.2s ease-in-out;
}

</style>