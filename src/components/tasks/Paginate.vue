<template>
  <div class="grid grid-cols-12 items-center mt-10 mb-10 mx-auto bg-transparent border-t-[1px] border-[#C8C8C8] border-b-[1px] py-2 md:py-0">
    <div class="col-span-1">
      <button @click="goToPreviousPage"
        class="flex items-center gap-x-2 text-xs font-medium leading-5 bg-transparent disabled:opacity-50" :class="pagination.currentPage == 1
          ? 'text-gray-400'
          : 'text-dark-blue hover:text-blue-650'
          " @mouseover="pagination.prevHovering = true" @mouseleave="pagination.prevHovering = false"
        :disabled="pagination.currentPage == 1">
        <LongArrow :class="pagination.prevHovering && pagination.currentPage != 1
          ? 'rgb(34 95 246)'
          : pagination.currentPage == 1
            ? 'text-gray-400'
            : 'text-dark-blue'" />
        <div class="hidden md:block">Previous</div>
      </button>
    </div>
    <div class="col-span-10 flex justify-center font-medium w-full">
      <div v-for="page in visiblePages" :key="page" class="hidden md:block">
        <button v-if="page == '...'"
          class="flex justify-center items-center px-4 pt-4 pb-3 text-xs text-gray-500 bg-transparent" disabled>
          ...
        </button>
        <button v-else @click="onPageChange(page)"
          class="flex justify-center items-center px-4 pt-4 pb-3 text-xs bg-transparent" :class="page == pagination.currentPage
            ? 'text-default-blue border-b-[3px] border-dark-blue'
            : 'text-gray-500'
            ">
          {{ page }}
        </button>
      </div>
      <div class="flex text text-gray-500 text-xs items-center">
        <div class="mx-2 hidden md:flex justify-center">/</div>
        <div class="mx-2 flex justify-center">Go to</div>
        <div class="flex justify-center">
          <input type="text" placeholder="Number" v-model="pagination.inputPage"
            @keyup.enter="searchPage(pagination.inputPage)"
            class="border bg-transparent rounded-full flex justify-center w-full focus:outline-none text-center py-1 max-w-[70px] md:max-w-[90px]"
            :class="pagination.currentPage == pagination.lastPage ? 'border-gray-300 text-gray-100' : 'border-gray-500 text-gray-500'"
            :disabled="pagination.currentPage == pagination.lastPage" />
        </div>
        <div class="block md:hidden ml-2">of {{ totalPage }}</div>
      </div>
    </div>
    <div class="col-span-1 justify-self-end">
      <button @click="goToNextPage"
        class="flex items-center gap-x-2 text-xs font-medium leading-5 bg-transparent disabled:opacity-50" :class="pagination.currentPage === pagination.lastPage
          ? 'text-gray-400'
          : 'text-dark-blue hover:text-default-blue'
          " @mouseover="pagination.nextHovering = true" @mouseleave="pagination.nextHovering = false"
        :disabled="pagination.currentPage === pagination.lastPage">
        <div class="hidden md:block">Next</div>
        <LongArrow class="rotate-180" :class="pagination.currentPage === pagination.lastPage
          ? 'text-gray-400'
          : 'text-dark-blue hover:text-dark-blue'" />
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, watchEffect } from "vue";
import { scrollToTop } from "../../utils/scrollToTop";
import LongArrow from "../icons/LongArrow.vue";

const props = defineProps({
  pagination: Object,
});

const emits = defineEmits(["currentPage"]);

const currentPage = ref(1);
watchEffect(() => (currentPage.value = props.pagination.currentPage));

const totalPage = computed(() => {
  return Math.ceil(props.pagination.total / props.pagination.perPage)
})

const visiblePages = computed(() => {
  const lastPage = props.pagination.lastPage;
  const windowSize = 1; // Number of pages to show before and after the current page
  const ellipsisThreshold = windowSize; // Minimum number of pages required to show ellipsis

  if (lastPage <= ellipsisThreshold) {
    return Array.from({ length: lastPage }, (_, i) => i + 1);
  }

  const pages = [];

  // Add first page
  if (currentPage.value >= 4) pages.push(1);

  // Add pages before current page
  for (
    let i = Math.max(1, currentPage.value - windowSize - 1);
    i < currentPage.value;
    i++
  ) {
    pages.push(i);
  }

  // Add current page
  pages.push(currentPage.value);

  // Add pages after current page
  for (
    let i = currentPage.value + 1;
    i <= Math.min(lastPage, currentPage.value + windowSize + 1);
    i++
  ) {
    pages.push(i);
  }

  // Add last page
  if (currentPage.value <= lastPage - 3) pages.push(lastPage);

  if (pages[1] > 2) {
    pages.splice(1, 0, "...");
  }
  if (pages[pages.length - 2] < lastPage - 1) {
    pages.splice(pages.length - 1, 0, "...");
  }

  return pages;
});
const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    emits("currentPage", currentPage.value);
  }
  scrollToTop()
};
const onPageChange = (page) => {
  if (page === "...") return; // Ignore ellipsis click
  currentPage.value = page;
  emits("currentPage", currentPage.value);
  scrollToTop()
};
const goToNextPage = () => {
  if (currentPage.value < props.pagination.lastPage) {
    currentPage.value++;
    emits("currentPage", currentPage.value);
  }
  scrollToTop()
};
const searchPage = (page) => {
  const totalPage = props.pagination.total;
  if (page != null && page <= totalPage) onPageChange(page);
};
</script>