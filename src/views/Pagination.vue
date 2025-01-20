<template>
  <div class="max-w-[1400px] mx-auto bg-gray-50 py-10 px-10 space-y-2">
    <div v-for="(comment, index) in pagination?.comments" :key="index" class="p-3 bg-white rounded-md shadow text-sm">
      <p>{{ comment.email }}</p>
      <p>{{ comment.name }}</p>
      <p>{{ comment.body }}</p>
    </div>

    <!-- pagination -->
    <div
  class="relative mx-auto mb-20 mt-10 flex w-full justify-center border-b-[1px] border-t-[1px] border-[#C8C8C8] bg-transparent">
  <div class="flex w-full justify-center gap-x-4 py-2 text-xl text-white md:justify-between md:py-0">
    <div class="flex items-center justify-start">
      <button @click="goToPreviousPage"
        class="relative flex items-center justify-start gap-x-2 bg-transparent text-xs font-medium leading-5 disabled:opacity-50"
        :disabled="pagination.currentPage == 1" :class="pagination.currentPage == 1
          ? 'text-[#858585]'
          : 'text-[#383838]'
          " @mouseover="pagination.prevHovering = true" @mouseleave="pagination.prevHovering = false">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-6 h-6 rotate-180 text-dark-blue hover:text-dark-blue"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"></path></svg>
        <div class="hidden md:block">Previous</div>
      </button>
    </div>
    <div class="flex justify-center font-medium">
      <div v-for="page in visiblePages" :key="page" class="hidden md:block">
        <button v-if="page == '...'"
          class="flex items-center justify-center bg-transparent px-4 pb-3 pt-4 text-xs text-gray-500"
          disabled>
          ...
        </button>
        <button v-else @click="onPageChange(page)"
          class="flex items-center justify-center bg-transparent px-4 pb-3 pt-4 text-xs" :class="page == pagination.currentPage
            ? 'border-b-[3px] border-b-default-blue font-bold text-default-blue'
            : 'text-gray-500'
            ">
          {{ page }}
        </button>
      </div>
      <div class="text flex w-full items-center text-xs text-gray-500">
        <div class="mx-2 hidden justify-center md:flex">/</div>
        <div class="mx-2 flex justify-center">Go to</div>
        <div class="flex justify-center">
          <input type="text" placeholder="Page" v-model="pagination.inputPage"
            @keyup.enter.stop="searchPage(pagination.inputPage)"
            class="flex max-w-[100px] justify-center rounded-full border border-gray-500 bg-transparent px-2 py-1 text-center focus:outline-none" />
        </div>
        <div class="ml-2 block md:hidden">
          of {{ pagination.totalPage }}
        </div>
      </div>
    </div>
    <div class="flex items-center justify-end">
      <button @click="goToNextPage"
        class="relative flex items-center justify-end gap-x-2 bg-transparent text-xs font-medium leading-5 disabled:opacity-50"
        :class="pagination.currentPage == pagination.totalPage
          ? 'text-[#858585]'
          : 'text-[#383838]'
          " @mouseover="pagination.nextHovering = true" @mouseleave="pagination.nextHovering = false"
        :disabled="pagination.currentPage == pagination.totalPage">
        <div class="hidden md:block">Next</div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-6 h-6 rotate-180 text-dark-blue hover:text-dark-blue"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"></path></svg>
      </button>
    </div>
  </div>
</div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { computed, onMounted, ref, watch } from 'vue';

const comments = ref(null)

const url = 'https://jsonplaceholder.typicode.com/comments'

const fetchComments = async () => {
  const result = await axios.get(url)
  comments.value = await result?.data || []
}

const pagination = ref({
  chunkedComments: [],
  comments: [],
  chunkSize: 10,
  currentPage: 1,
  totalPage: 0,
  inputPage: null,
  filterInputPage: null,
  prevHovering: false,
  nextHovering: false,
  prevArrowHovering: false,
  nextArrowHovering: false,
});

const chunkArray = (arr, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    chunks.push(arr.slice(i, i + chunkSize));
  }
  return chunks;
};

const commentsData = ref(null);
watch(
  comments,
  (newVal) => {
    if (newVal) {
      console.log(newVal, 'cd');
      commentsData.value = newVal;
      pagination.value.chunkedComments = chunkArray(
        commentsData.value,
        pagination.value.chunkSize,
      );
      pagination.value.comments = pagination.value.chunkedComments[pagination.value.currentPage - 1]
      console.log(pagination.value.comments, 'cc');
    }
  },
  { deep: true, immediate: true },
);

const visiblePages = computed(() => {
  pagination.value.totalPage = pagination.value?.chunkedFlights?.length;
  const currentPageValue = pagination.value.currentPage;
  const lastPage = pagination.value?.chunkedComments?.length;
  const windowSize = 1; // Number of pages to show before and after the current page
  const ellipsisThreshold = windowSize; // Minimum number of pages required to show ellipsis

  if (lastPage <= ellipsisThreshold) {
    return Array.from({ length: lastPage }, (_, i) => i + 1);
  }
  const pages = [];
  // Add first page
  if (pagination.value.currentPage >= 4) pages.push(1);
  // Add pages before current page
  for (
    let i = Math.max(1, pagination.value.currentPage - windowSize - 1);
    i < pagination.value.currentPage;
    i++
  ) {
    pages.push(i);
  }
  // Add current page
  pages.push(pagination.value.currentPage);
  // Add pages after current page
  for (
    let i = pagination.currentPage + 1;
    i <= Math.min(lastPage, pagination.value.currentPage + windowSize + 1);
    i++
  ) {
    pages.push(i);
  }
  // Add last page
  if (pagination.value.currentPage <= lastPage - 3) pages.push(lastPage);
  if (pages[1] > 2) {
    pages.splice(1, 0, "...");
  }

  if (pages[pages.length - 2] < lastPage - 1) {
    pages.splice(pages.length - 1, 0, "...");
  }
  return pages;
});

const goToPreviousPage = () => {
  if (pagination.value.currentPage > 1) {
    pagination.value.currentPage--;
    let x = pagination.value.chunkedComments[pagination.value.currentPage - 1];
    pagination.value.comments = x;
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
const onPageChange = (page) => {
  if (page === "...") return; // Ignore ellipsis click
  pagination.value.currentPage = page;
  let x = pagination.value.chunkedComments[pagination.value.currentPage - 1];

  pagination.value.comments = x;

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
const goToNextPage = () => {
  if (pagination.value.currentPage < pagination.value.totalPage) {
    pagination.value.currentPage++;
    let x = pagination.value.chunkedFlights[pagination.value.currentPage - 1];
    pagination.value.comments = x;
  }
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const searchPage = (page) => {
  if (page != null && page <= pagination.value.totalPage) onPageChange(page);
};

onMounted(() => {
  fetchComments()
})
</script>