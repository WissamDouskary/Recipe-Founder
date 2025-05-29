<script setup>
import { RouterLink } from "vue-router";
import RecipsCards from "@/components/RecipsCards.vue";
import axios from "axios";
import { reactive, onMounted, ref } from "vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

const state = reactive({
  meals: [],
  isLoading: true,
  error: "",
});

const alfa = "abc".split("");
const searchInput = ref("");

onMounted(async () => {
  try {
    for (let i = 0; i < alfa.length; i++) {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?f=${alfa[i]}`
      );
      state.meals.push(...res.data.meals);
    }
    state.error = "";
  } catch (error) {
    state.error = error.message;
    console.error("error while fetching data", error);
  } finally {
    state.isLoading = false;
  }
});

const searchMeal = async () => {
  state.isLoading = true;
  try {
    if (searchInput.value !== "") {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput.value}`
      );
      state.meals = res.data.meals || [];
    } else {
      state.meals = [];
      for (let i = 0; i < alfa.length; i++) {
        const res = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?f=${alfa[i]}`
        );
        state.meals.push(...res.data.meals);
      }
    }
  } catch (error) {
    console.error("there is an error while searching for meals ", error);
  } finally {
    state.isLoading = false;
  }
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header Section -->
    <section class="py-8 bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-8 text-center">
          <h1 class="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
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
              v-model="searchInput"
              @input="searchMeal"
              type="text"
              placeholder="Search for recipes..."
              class="w-full px-4 py-3 pl-12 pr-4 text-gray-700 bg-white border border-gray-300 rounded-full transition-all focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 duration-200"
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
            class="px-6 py-2 text-white text-sm font-medium bg-orange-500 rounded-full transition-colors hover:bg-orange-600 duration-200"
          >
            All Recipes
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
            Vegetarian
          </button>
          <button
            class="px-6 py-2 text-gray-700 text-sm font-medium bg-white border border-gray-300 rounded-full transition-colors hover:bg-gray-50 duration-200"
          >
            Quick & Easy
          </button>
          <button
            class="px-6 py-2 text-gray-700 text-sm font-medium bg-white border border-gray-300 rounded-full transition-colors hover:bg-gray-50 duration-200"
          >
            Healthy
          </button>
        </div>
      </div>
    </section>

    <!-- Recipes Grid -->
    <section class="py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Results Header -->
        <div class="flex mb-8 justify-between items-center">
          <h2 class="text-2xl font-semibold text-gray-900">
            All Recipes
            <span class="text-gray-500 font-normal"
              >({{ state.meals ? state.meals.length : "No " }} recipes
              found)</span
            >
          </h2>
          <div class="flex space-x-4 items-center">
            <span class="text-sm text-gray-600">Sort by:</span>
            <select
              class="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
            >
              <option>Most Popular</option>
              <option>Newest</option>
              <option>Cooking Time</option>
              <option>Rating</option>
            </select>
          </div>
        </div>
        <PulseLoader v-if="state.isLoading" class="text-center" />
        <div
          v-else-if="state.error !== ''"
          class="text-red font-bold text-red-600 font"
        >
          {{ state.error }}
        </div>
        <div
          v-else
          class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <RecipsCards
            v-for="meal in state.meals"
            :key="meal.idMeal"
            :meal="meal"
            class="overflow-hidden flex flex-col bg-white rounded-xl shadow-lg transition-shadow hover:shadow-xl duration-300"
          >
          </RecipsCards>
        </div>

        <!-- Pagination -->
        <div class="flex mt-12 justify-center">
          <div class="flex space-x-2 items-center">
            <button
              class="px-3 py-2 text-gray-500 transition-colors hover:text-gray-700 duration-200"
            >
              Previous
            </button>
            <button class="px-3 py-2 text-white bg-orange-500 rounded-lg">
              1
            </button>
            <button
              class="px-3 py-2 text-gray-700 rounded-lg transition-colors hover:bg-gray-100 duration-200"
            >
              2
            </button>
            <button
              class="px-3 py-2 text-gray-700 rounded-lg transition-colors hover:bg-gray-100 duration-200"
            >
              3
            </button>
            <span class="px-3 py-2 text-gray-500">...</span>
            <button
              class="px-3 py-2 text-gray-700 rounded-lg transition-colors hover:bg-gray-100 duration-200"
            >
              8
            </button>
            <button
              class="px-3 py-2 text-gray-500 transition-colors hover:text-gray-700 duration-200"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
