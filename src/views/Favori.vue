<script setup>
import { RouterLink } from "vue-router";
import RecipsCards from "@/components/RecipsCards.vue";
import axios from "axios";
import { reactive, onMounted, ref } from "vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

const state = reactive({
  meals: [{}],
  isLoading: true,
  error: "",
});

onMounted(async () => {
  const Favorites = localStorage.getItem("favorites");
  state.meals = JSON.parse(Favorites);
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header Section -->
    <section class="py-8 bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-8 text-center">
          <h1
            class="mb-4 text-3xl font-bold text-gray-900 md:text-4xl flex items-center justify-center"
          >
            <svg
              class="h-8 w-8 mr-3 text-red-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </svg>
            My Favorite Recipes
          </h1>
          <p class="text-lg text-gray-600">
            Your collection of saved recipes for easy access
          </p>
        </div>

        <!-- Search Bar -->
        <div class="max-w-2xl mx-auto mb-8">
          <div class="relative">
            <input
              type="text"
              placeholder="Search your favorites..."
              class="w-full px-4 py-3 pl-12 pr-4 text-gray-700 bg-white border border-gray-300 rounded-full transition-all focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 duration-200"
            />
            <svg
              class="h-5 w-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
        </div>

        <!-- Filter Categories -->
        <div class="flex flex-wrap justify-center gap-3">
          <button
            class="px-6 py-2 text-white text-sm font-medium bg-red-500 rounded-full transition-colors hover:bg-red-600 duration-200"
          >
            All Favorites
          </button>
          <button
            class="px-6 py-2 text-gray-700 text-sm font-medium bg-white border border-gray-300 rounded-full transition-colors hover:bg-gray-50 duration-200"
          >
            Breakfast
          </button>
          <button
            class="px-6 py-2 text-gray-700 text-sm font-medium bg-white border border-gray-300 rounded-full transition-colors hover:bg-gray-50 duration-200"
          >
            Lunch
          </button>
          <button
            class="px-6 py-2 text-gray-700 text-sm font-medium bg-white border border-gray-300 rounded-full transition-colors hover:bg-gray-50 duration-200"
          >
            Dinner
          </button>
          <button
            class="px-6 py-2 text-gray-700 text-sm font-medium bg-white border border-gray-300 rounded-full transition-colors hover:bg-gray-50 duration-200"
          >
            Desserts
          </button>
          <button
            class="px-6 py-2 text-gray-700 text-sm font-medium bg-white border border-gray-300 rounded-full transition-colors hover:bg-gray-50 duration-200"
          >
            Recently Added
          </button>
        </div>
      </div>
    </section>

    <!-- Favorites Content -->
    <section class="py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Results Header -->
        <div class="flex mb-8 justify-between items-center">
          <h2 class="text-2xl font-semibold text-gray-900">
            Your Favorites
            <span class="text-gray-500 font-normal">({{state.meals.length}} recipes saved)</span>
          </h2>
          <div class="flex space-x-4 items-center">
            <span class="text-sm text-gray-600">Sort by:</span>
            <select
              class="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
            >
              <option>Recently Added</option>
              <option>Alphabetical</option>
              <option>Category</option>
              <option>Rating</option>
            </select>
            <button
              class="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <svg
                class="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                ></path>
              </svg>
              <span>Export List</span>
            </button>
          </div>
        </div>

        <!-- Empty State (when no favorites) -->
        <div class="hidden text-center py-16">
          <div class="max-w-md mx-auto">
            <svg
              class="h-24 w-24 mx-auto text-gray-300 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">
              No favorites yet
            </h3>
            <p class="text-gray-600 mb-6">
              Start exploring recipes and save your favorites for easy access
              later!
            </p>
            <button
              class="bg-red-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-600 transition-colors duration-200"
            >
              Discover Recipes
            </button>
          </div>
        </div>

        <!-- Favorites Grid -->
        <div
          class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <RecipsCards
            v-for="meal in state.meals"
            :key="meal.idMeal"
            :meal="meal"
            class="overflow-hidden flex flex-col bg-white rounded-xl shadow-lg transition-shadow hover:shadow-xl duration-300"
          />
        </div>
      </div>
    </section>

    <div class="fixed bottom-6 right-6">
      <div class="relative group">
        <button
          class="bg-red-500 text-white p-4 rounded-full shadow-lg hover:bg-red-600 transition-all duration-200 hover:scale-110"
        >
          <svg
            class="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
        </button>
        <div
          class="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
        >
          <p class="text-sm text-gray-600">Add new favorite</p>
        </div>
      </div>
    </div>
  </div>
</template>
