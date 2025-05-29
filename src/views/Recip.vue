<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import axios from "axios";

const route = useRoute();
const recipeId = route.params.id;
const showmore = ref(true);

const state = reactive({
  meal: [{}],
  isLoading: true,
  error: "",
});

onMounted(async () => {
  try {
    const res = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
    );
    state.meal = res.data.meals;
    console.log(res.data.meals);
    state.error = "";
  } catch (error) {
    console.log("error while fetching recipe", error);
    state.error = error.message;
  } finally {
    state.isLoading = false;
  }
});

const sliceDescription = (description) => {
  const lessDesc = description.split(".");
  return lessDesc.slice(0, lessDesc.length - 1);
};

const getVisibleDescriptions = (instructions) => {
  const sliced = sliceDescription(instructions);
  return showmore.value ? sliced.slice(0, 3) : sliced;
};

const changeVisibiltyOfDescriptions = () => {
  showmore.value = !showmore.value;
};

function ingredientsList(item) {
  const ingArr = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = item[`strIngredient${i}`];
    const measure = item[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== "") {
      ingArr.push(`${measure ? measure.trim() : ''} ${ingredient.trim()}`);
    }
  }
  return ingArr;
}

</script>

<template>
  <div v-if="state.isLoading" class="mt-44">
    <PulseLoader class="text-center" />
  </div>
  <div
    v-else-if="state.error !== ''"
    class="text-red-600 font-bold border border-red-600 bg-red-100 rounded px-4 py-2"
  >
    {{ state.error }}
  </div>
  <div v-else v-for="item in state.meal" class="min-h-screen bg-gray-50">
    <!-- Recipe Header Section -->
    <div class="relative">
      <!-- Hero Image -->
      <div class="h-72 md:h-96 w-full overflow-hidden">
        <img
          :src="item.strMealThumb"
          alt="Apam balik"
          class="w-full h-full object-cover"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
        ></div>
      </div>

      <!-- Back Button -->
      <button
        class="absolute top-4 left-4 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all duration-200"
      >
        <svg
          class="h-6 w-6 text-gray-800"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          ></path>
        </svg>
      </button>

      <!-- Action Buttons -->
      <div class="absolute top-4 right-4 flex space-x-2">
        <button
          class="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all duration-200"
        >
          <svg
            class="h-6 w-6 text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            ></path>
          </svg>
        </button>
        <button
          class="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all duration-200"
        >
          <svg
            class="h-6 w-6 text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            ></path>
          </svg>
        </button>
      </div>
      <!-- Recipe Title Container -->
      <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
        <div class="flex flex-wrap gap-2 mb-3">
          <span
            class="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium"
          >
            {{ item.strCategory }}
          </span>
          <span
            class="bg-gray-700 text-white px-3 py-1 rounded-full text-xs font-medium"
          >
            {{ item.strArea }}
          </span>
        </div>
        <h1 class="text-3xl md:text-4xl font-bold mb-2">{{ item.strMeal }}</h1>
        <div class="flex items-center space-x-4">
          <div class="flex items-center">
            <div class="flex text-yellow-400">
              <svg class="h-4 w-4 fill-current" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              <svg class="h-4 w-4 fill-current" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              <svg class="h-4 w-4 fill-current" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              <svg class="h-4 w-4 fill-current" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              <svg class="h-4 w-4 fill-current" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
            </div>
            <span class="ml-1 text-sm">4.8 (124 reviews)</span>
          </div>
          <div class="flex items-center space-x-1">
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span class="text-sm">30 min</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-4xl mx-auto px-4 py-8">
      <!-- Quick Info -->
      <div class="flex flex-wrap gap-4 mb-8 bg-white p-4 rounded-xl shadow-md">
        <div class="flex items-center space-x-2">
          <div
            class="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center"
          >
            <svg
              class="h-5 w-5 text-orange-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <div>
            <p class="text-xs text-gray-500">Prep Time</p>
            <p class="font-medium">{{ "15" }} min</p>
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <div
            class="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center"
          >
            <svg
              class="h-5 w-5 text-orange-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <div
            class="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center"
          >
            <svg
              class="h-5 w-5 text-orange-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              ></path>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
          </div>
          <div>
            <p class="text-xs text-gray-500">Source</p>
            <a
              :href="item.strSource"
              class="font-medium text-orange-500 hover:underline"
              >{{
                item.strSource.substring(0, item.strSource.indexOf(".com") + 4)
              }}</a
            >
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <div
            class="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center"
          >
            <svg
              class="h-5 w-5 text-orange-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
              ></path>
            </svg>
          </div>
          <div>
            <p class="text-xs text-gray-500">Watch</p>
            <a
              :href="item.strYoutube"
              class="font-medium text-red-500 hover:underline"
              >YouTube</a
            >
          </div>
        </div>
      </div>

      <!-- Two Column Layout -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Ingredients Column -->
        <div class="md:col-span-1">
          <div class="bg-white p-6 rounded-xl shadow-md mb-6">
            <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <svg
                class="h-5 w-5 mr-2 text-orange-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                ></path>
              </svg>
              Ingredients
            </h2>
            <ul class="space-y-3">
              <li class="flex items-center" v-for="(ingredient, index) in ingredientsList(item)" :key="index">
                <input
                  type="checkbox"
                  class="h-5 w-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                />
                <span class="ml-3 text-gray-700">{{ ingredient }}</span>
              </li>
            </ul>
          </div>

          <!-- Nutrition Facts -->
          <div class="bg-white p-6 rounded-xl shadow-md">
            <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <svg
                class="h-5 w-5 mr-2 text-orange-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                ></path>
              </svg>
              Nutrition Facts
            </h2>
            <div class="space-y-2">
              <div class="flex justify-between py-1 border-b border-gray-100">
                <span class="text-gray-600">Calories</span>
                <span class="font-medium">320 kcal</span>
              </div>
              <div class="flex justify-between py-1 border-b border-gray-100">
                <span class="text-gray-600">Carbs</span>
                <span class="font-medium">42g</span>
              </div>
              <div class="flex justify-between py-1 border-b border-gray-100">
                <span class="text-gray-600">Protein</span>
                <span class="font-medium">8g</span>
              </div>
              <div class="flex justify-between py-1 border-b border-gray-100">
                <span class="text-gray-600">Fat</span>
                <span class="font-medium">14g</span>
              </div>
              <div class="flex justify-between py-1">
                <span class="text-gray-600">Sugar</span>
                <span class="font-medium">12g</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Instructions Column -->
        <div class="md:col-span-2">
          <div class="bg-white p-6 rounded-xl shadow-md">
            <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <svg
                class="h-5 w-5 mr-2 text-orange-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                ></path>
              </svg>
              Instructions
            </h2>
            <div class="space-y-6">
              <div
                class="flex"
                v-for="(desc, index) in getVisibleDescriptions(item.strInstructions)"
                :key="index"
              >
                <div class="flex-shrink-0 mr-4">
                  <div
                    class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold"
                  >{{ index+1 }}
                </div>
                </div>
                <div>
                  <p class="text-gray-700">
                    {{ desc }}
                  </p>
                </div>
              </div>
            </div>
            <button
              @click="changeVisibiltyOfDescriptions"
              class="text-orange-600 hover:underline font-medium mt-2"
            >
              Show {{ showmore ? "More" : "Less" }}
            </button>
            <!-- Video Section -->
            <div class="mt-8 border-t border-gray-100 pt-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">
                Watch Video Tutorial
              </h3>
              <div
                class="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden"
              >
                <div class="flex items-center justify-center h-full">
                  <a
                    href="https://www.youtube.com/watch?v=6R8ffRRJcrg"
                    target="_blank"
                    class="flex flex-col items-center text-gray-500 hover:text-red-500 transition-colors duration-200"
                  >
                    <svg
                      class="h-16 w-16"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                      />
                    </svg>
                    <span class="mt-2">Watch on YouTube</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Similar Recipes -->
    <div class="bg-gray-100 py-12">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-2xl font-bold text-gray-900 mb-8 text-center">
          You Might Also Like
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Similar Recipe 1 -->
          <div
            class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div
              class="h-40 bg-gradient-to-br from-yellow-200 to-yellow-300 flex items-center justify-center"
            >
              <svg
                class="h-12 w-12 text-yellow-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253"
                ></path>
              </svg>
            </div>
            <div class="p-4">
              <h3 class="text-lg font-semibold text-gray-900 mb-1">
                Banana Pancakes
              </h3>
              <p class="text-gray-600 text-sm mb-3">
                Fluffy pancakes with fresh bananas
              </p>
              <div class="flex items-center justify-between text-sm">
                <div class="flex items-center space-x-1">
                  <span class="text-yellow-400">★★★★☆</span>
                  <span class="text-gray-500">(4.2)</span>
                </div>
                <span class="text-gray-500">20 min</span>
              </div>
            </div>
          </div>

          <!-- Similar Recipe 2 -->
          <div
            class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div
              class="h-40 bg-gradient-to-br from-red-200 to-red-300 flex items-center justify-center"
            >
              <svg
                class="h-12 w-12 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253"
                ></path>
              </svg>
            </div>
            <div class="p-4">
              <h3 class="text-lg font-semibold text-gray-900 mb-1">
                Strawberry Crepes
              </h3>
              <p class="text-gray-600 text-sm mb-3">
                Thin crepes with strawberry filling
              </p>
              <div class="flex items-center justify-between text-sm">
                <div class="flex items-center space-x-1">
                  <span class="text-yellow-400">★★★★★</span>
                  <span class="text-gray-500">(4.8)</span>
                </div>
                <span class="text-gray-500">25 min</span>
              </div>
            </div>
          </div>

          <!-- Similar Recipe 3 -->
          <div
            class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div
              class="h-40 bg-gradient-to-br from-green-200 to-green-300 flex items-center justify-center"
            >
              <svg
                class="h-12 w-12 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253"
                ></path>
              </svg>
            </div>
            <div class="p-4">
              <h3 class="text-lg font-semibold text-gray-900 mb-1">
                Coconut Waffles
              </h3>
              <p class="text-gray-600 text-sm mb-3">
                Crispy waffles with coconut flavor
              </p>
              <div class="flex items-center justify-between text-sm">
                <div class="flex items-center space-x-1">
                  <span class="text-yellow-400">★★★★☆</span>
                  <span class="text-gray-500">(4.5)</span>
                </div>
                <span class="text-gray-500">30 min</span>
              </div>
            </div>
          </div>

          <!-- Similar Recipe 4 -->
          <div
            class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div
              class="h-40 bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center"
            >
              <svg
                class="h-12 w-12 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253"
                ></path>
              </svg>
            </div>
            <div class="p-4">
              <h3 class="text-lg font-semibold text-gray-900 mb-1">
                Blueberry Muffins
              </h3>
              <p class="text-gray-600 text-sm mb-3">
                Sweet muffins with fresh blueberries
              </p>
              <div class="flex items-center justify-between text-sm">
                <div class="flex items-center space-x-1">
                  <span class="text-yellow-400">★★★★☆</span>
                  <span class="text-gray-500">(4.3)</span>
                </div>
                <span class="text-gray-500">40 min</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
