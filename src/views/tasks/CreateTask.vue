<template>
    <h2 class="text-center text-xl mt-14 mb-4">Create new task</h2>
    <div class="max-w-[700px] mr-auto border rounded-2xl shadow-lg p-10">
        <keep-alive>
            <component :is="currentComponent" />
        </keep-alive>

        <div class="flex items-center pt-2 border-t border-[#7da1d6e7]  mt-8" :class="step > 1 ? 'justify-between' : 'justify-end'">
            <button @click="goPrev" :class="step > 1 ? 'visible' : 'hidden'" class="border border-[#c4d6f2e7] py-[9px] text-sm px-3 min-w-[120px] rounded-md focus:outline-none bg-white text-[#0f2d59e7] font-medium">Prev</button>
            <button @click="goNext" class="border border-[#c4d6f2e7] py-[9px] text-sm px-3 min-w-[120px] rounded-md focus:outline-none bg-[#cedcf4e7] text-[#0f2d59e7] font-medium">Next</button>
        </div>
    </div>
</template>

<script setup>
import TitleAndDate from '@/components/tasks/TitleAndDate.vue'
import Location from '@/components/tasks/Location.vue'
import Details from '@/components/tasks/Details.vue'
import Budget from '@/components/tasks/Budget.vue'
import { ref, shallowRef, watch } from 'vue';

const currentComponent = shallowRef(TitleAndDate)

const step = ref(1)

const goNext = () => {
    step.value++
}

const goPrev = () => {
    step.value--
}

watch(step, (newVal) => {
    if(newVal === 1){
        currentComponent.value = TitleAndDate
    }else if(newVal === 2){
        currentComponent.value = Location
    }else if(newVal === 3){
        currentComponent.value = Details
    }else if(newVal === 4){
        currentComponent.value = Budget
    }
})
</script>

<style>

</style>