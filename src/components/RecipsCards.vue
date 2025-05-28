<script setup>
import { defineProps } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps({
  meal: Object,
});

const truncateDesc = (description) => {
  return description ? description.substring(0, 50) + "..." : "";
};

const truncatetitle = (tit) => {
  return tit ? tit.substring(0, 22) + "..." : "";
};

const gettags = (tags) => {
  const ourtags = [];
  if (tags) {
    tags.split(",").forEach((item) => {
      ourtags.push(item);
    });
  }
  return ourtags;
};

</script>

<template>
  <div>
    <img
      :src="props.meal.strMealThumb"
      class="h-48 w-full object-cover"
      alt=""
    />
    <div class="p-6">
      <h3 class="text-xl font-semibold text-gray-900 mb-2">
        {{ truncatetitle(props.meal.strMeal) }}
      </h3>
      <p class="text-gray-600 mb-4">
        {{ truncateDesc(props.meal.strInstructions) }}
      </p>
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-1">
          <span
            v-if="gettags(props.meal.strTags).length > 0"
            v-for="tag in gettags(props.meal.strTags)"
            :key="tag"
            class="bg-gray-300 rounded-full px-2 mr-1 text-gray-600"
          >
            {{ tag }}
          </span>
          <span v-else class="text-gray-500 italic">
            there is no tags!
          </span>
        </div>
      </div>
    </div>
    <div class="mb-6 text-end mr-3">
      <RouterLink
        to="/"
        class="bg-orange-500 text-white mb-10 px-4 py-2 rounded-full font-semibold hover:bg-orange-600 transition-colors duration-200"
      >
        View Recipe</RouterLink
      >
    </div>
  </div>
</template>
