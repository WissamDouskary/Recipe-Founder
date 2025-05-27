<script setup>
import { RouterLink } from 'vue-router'
import RecipsCards from '@/components/RecipsCards.vue';
import axios from 'axios';
import { reactive, onMounted } from 'vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

const state = reactive({
  meals: [],
  isLoading: true,
})

const alfa = 'abc'.split('');

onMounted(async () => {
  try {
    for(let i = 0; i < alfa.length; i++){
      const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?f=${alfa[i]}`);
      state.meals.push(...res.data.meals);
    }
  } catch (error) {
    console.error('error while fetching data', error);
  } finally {
    state.isLoading = false;
  }
})

</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header Section -->
    <section class="bg-white border-b border-gray-200 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-8">
          <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Discover Amazing Recipes
          </h1>
          <p class="text-lg text-gray-600">
            Find the perfect recipe for any occasion
          </p>
        </div>

        <!-- Search Bar -->
        <div class="max-w-2xl mx-auto mb-8">
          <div class="relative">
            <input
              type="text"
              placeholder="Search for recipes, ingredients, or cuisines..."
              class="w-full px-4 py-3 pl-12 pr-4 text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200"
            />
            <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>

        <!-- Filter Categories -->
        <div class="flex flex-wrap justify-center gap-3">
          <button class="bg-orange-500 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-orange-600 transition-colors duration-200">
            All Recipes
          </button>
          <button class="bg-white text-gray-700 border border-gray-300 px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors duration-200">
            Breakfast
          </button>
          <button class="bg-white text-gray-700 border border-gray-300 px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors duration-200">
            Lunch
          </button>
          <button class="bg-white text-gray-700 border border-gray-300 px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors duration-200">
            Dinner
          </button>
          <button class="bg-white text-gray-700 border border-gray-300 px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors duration-200">
            Desserts
          </button>
          <button class="bg-white text-gray-700 border border-gray-300 px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors duration-200">
            Vegetarian
          </button>
          <button class="bg-white text-gray-700 border border-gray-300 px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors duration-200">
            Quick & Easy
          </button>
          <button class="bg-white text-gray-700 border border-gray-300 px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors duration-200">
            Healthy
          </button>
        </div>
      </div>
    </section>

    <!-- Recipes Grid -->
    <section class="py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Results Header -->
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-2xl font-semibold text-gray-900">
            All Recipes <span class="text-gray-500 font-normal">({{state.meals.length}} recipes found)</span>
          </h2>
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-600">Sort by:</span>
            <select class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500">
              <option>Most Popular</option>
              <option>Newest</option>
              <option>Cooking Time</option>
              <option>Rating</option>
            </select>
          </div>
        </div>
        <PulseLoader v-if="state.isLoading" class="text-center"/>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <RecipsCards v-for="meal in state.meals" :meal="meal" class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl flex flex-col transition-shadow duration-300">
          </RecipsCards>
        </div>

        <!-- Pagination -->
        <div class="flex justify-center mt-12">
          <div class="flex items-center space-x-2">
            <button class="px-3 py-2 text-gray-500 hover:text-gray-700 transition-colors duration-200">
              Previous
            </button>
            <button class="px-3 py-2 bg-orange-500 text-white rounded-lg">1</button>
            <button class="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">2</button>
            <button class="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">3</button>
            <span class="px-3 py-2 text-gray-500">...</span>
            <button class="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">8</button>
            <button class="px-3 py-2 text-gray-500 hover:text-gray-700 transition-colors duration-200">
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Additional custom styles if needed */
</style>