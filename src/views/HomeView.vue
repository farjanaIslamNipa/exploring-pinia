<template>
  <div class="w-full max-w-[1500px] mx-auto py-10 px-10">
    <div class="bg-red-50 rounded-lg px-4 mb-5">
      <div>
        <Transition name="tooltip">
          <div v-if="show" id="show" class="">
            Using visibility
          </div>
        </Transition>
        <button @click="show = !show">toggle message</button>
      </div>
      <div class="">

        <div class="flex gap-1 items-center w-full">
          <form @submit.prevent="handleFilter(category, quantity)" class="grid grid-cols-2 gap-3 items-center w-full">
            <div class="border-r pr-3">
          <div class="flex items-center gap-2">
            <input v-model="title" type="text" class="border py-[6px] rounded-md w-full px-2 placeholder:text-xs placeholder:font-light text-sm" placeholder="Search by title" />
            <button class="border border-red-500 rounded-md py-[6px] px-2 bg-red-500 text-white text-sm" type="submit">Search</button>
          </div>
        </div>
            <div class="my-8 flex gap-x-2 items-center">
              <input v-model="category" type="text" class="border py-[6px] rounded-md w-full px-2 placeholder:text-xs placeholder:font-light text-sm" placeholder="Category" />
              <input v-model="quantity" type="text" class="border py-[6px] rounded-md w-full px-2 placeholder:text-xs placeholder:font-light text-sm" placeholder="Quantity" />
              <button class="border border-red-500 rounded-md py-[6px] px-2 bg-red-500 text-white text-sm" type="submit">Search</button>
            </div>
          </form>
          <button @click="handleClearFilter" class="border rounded-md py-[6px] px-2 border-red-500 text-red-500 text-sm" type="submit">Clear</button>
        </div>
      </div>
    </div>
    <div v-if="supplyStore.loading">
      <p>Loading........</p>
    </div>
    <div class="grid grid-cols-4 gap-5">
      <div v-for="supply in filterSupplies" :key="supply.id" class="border p-5 rounded-lg">
        <div>
          <img :src="supply.img" alt="" class="h-[100px] mx-auto">
        </div>
        {{supply.title}}
        <p class="text-sm font-light">Category: <span class="text-red-500">{{supply?.category}}</span></p>
        <p class="text-sm"><span class="font-light">Quantity: </span>{{supply?.quantity}}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSupplyStore } from "@/stores/supply";
import { ref, computed, onMounted } from "vue";
import { storeToRefs } from 'pinia'


const supplyStore = useSupplyStore()
const { filterSupplies, title } = storeToRefs(supplyStore)
const {fetchSupplies, handleFilter, clearFilter} = supplyStore

onMounted(async() => {
  await fetchSupplies()
})
const category = ref('')
const quantity = ref('')

const handleClearFilter = () => {
  clearFilter()
  category.value = ""
  quantity.value = ""
}


const show = ref(true)

const getSize = () => {
  if(window.innerWidth < 1024){
    show.value = false
  }else{
    show.value = true
  }
}

onMounted(() => {
  window.addEventListener('resize', getSize)
  getSize()
  console.log(show.value, 'moun')
})

// const show = () => {
//   const section = document.getElementById('show')
//   section.classList.toggle('show-div')
// }


</script>

<style>

.show-div{
  display: block !important;
}

.tooltip-enter-active {
  transition: transform 0.4s ease-out, opacity 0.3s ease-out;
}

.tooltip-leave-active {
  transition: transform 0.35s ease-in, opacity 0.28s ease-out;
}

.tooltip-enter-from {
  transition: none;
}

.tooltip-enter-from,
.tooltip-leave-to {
  transform: translateY(-30px) scale(0.96);
  opacity: 0;
}
</style>