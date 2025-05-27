<script setup>
import { defineProps } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps({
  meal: Object,
});

const truncateDesc = (description) => {
  return description ? description.substring(0, 50) + '...' : '';
}

const truncatetitle = (tit) => {
  return tit ? tit.substring(0, 22) + '...' : '';
}

console.log(props.meal);
</script>

<template>
  <div>
      <img :src="props.meal.strMealThumb" class="h-48 w-full object-cover" alt="">
    <div class="p-6">
      <h3 class="text-xl font-semibold text-gray-900 mb-2">{{truncatetitle(props.meal.strMeal)}}</h3>
      <p class="text-gray-600 mb-4">{{ truncateDesc(props.meal.strInstructions) }}</p>
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-1">
          <span class="text-yellow-400">★★★★☆</span>
          <span class="text-sm text-gray-500">(4.7)</span>
        </div>
        <span class="text-sm text-gray-500">10 min</span>
      </div>
    </div>
    <div class="mb-6 text-end mr-3">
      <RouterLink to="/recipe/id" class="bg-orange-500 text-white mb-10 px-4 py-2 rounded-full font-semibold hover:bg-orange-600 transition-colors duration-200">View Details</RouterLink>
    </div>
  </div>
</template>