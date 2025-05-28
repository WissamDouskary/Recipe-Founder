<script setup>
import { RouterLink } from 'vue-router'
import RecipsCards from '@/components/RecipsCards.vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import { reactive, onMounted } from 'vue';
import axios from 'axios';

const state = reactive({
  meals: [],
  isLoading: true,
})

onMounted(async () => {
  try {
      const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?f=a`);
      state.meals = res.data.meals;
  } catch (error) {
    console.error('error while fetching data', error);
  } finally {
    state.isLoading = false;
  }
})

</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-orange-50 to-amber-50 py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Discover Amazing
            <span class="text-orange-500">Recipes</span>
          </h1>
          <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            RecipeFounder is your ultimate destination for discovering, sharing, and mastering delicious recipes from
            around the world. Join thousands of food lovers in their culinary journey.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <RouterLink to="/recips"
              class="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors duration-200">
              Explore Recipes
            </RouterLink>
            <button
              class="border-2 border-orange-500 text-orange-500 px-8 py-3 rounded-full font-semibold hover:bg-orange-500 hover:text-white transition-colors duration-200">
              Share Your Recipe
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div class="text-3xl font-bold text-orange-500 mb-2">10K+</div>
            <div class="text-gray-600">Recipes</div>
          </div>
          <div>
            <div class="text-3xl font-bold text-orange-500 mb-2">50K+</div>
            <div class="text-gray-600">Food Lovers</div>
          </div>
          <div>
            <div class="text-3xl font-bold text-orange-500 mb-2">25+</div>
            <div class="text-gray-600">Countries</div>
          </div>
          <div>
            <div class="text-3xl font-bold text-orange-500 mb-2">4.8★</div>
            <div class="text-gray-600">User Rating</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Most Popular Recipes -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Most Popular Recipes
          </h2>
          <p class="text-lg text-gray-600">
            Discover what our community loves most
          </p>
        </div>
        <PulseLoader v-if="state.isLoading" class="text-center"/>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <RecipsCards v-for="meal in state.meals.slice(0, 3)" :meal="meal" :key="meal.id" class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl flex flex-col transition-shadow duration-300">
          </RecipsCards>

        </div>

        <div class="text-center mt-12">
          <RouterLink to="/recips"
            class="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors duration-200">
            View All Recipes
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose RecipeFounder?
          </h2>
          <p class="text-lg text-gray-600">
            Everything you need to become a better cook
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="h-8 w-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Tested Recipes</h3>
            <p class="text-gray-600">All recipes are tested by our community to ensure perfect results every time.</p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="h-8 w-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z">
                </path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Community Driven</h3>
            <p class="text-gray-600">Join a vibrant community of food lovers sharing tips and experiences.</p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="h-8 w-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z">
                </path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Quick & Easy</h3>
            <p class="text-gray-600">Find recipes that fit your schedule, from 5-minute snacks to elaborate dinners.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-20 bg-gradient-to-r from-orange-500 to-amber-500">
      <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Start Cooking?
        </h2>
        <p class="text-xl text-orange-100 mb-8">
          Join thousands of home cooks discovering amazing recipes every day
        </p>
        <button
          class="bg-white text-orange-500 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200">
          Get Started Today
        </button>
      </div>
    </section>
  </div>
</template>