<template>
    <h2 class="text-center text-xl mt-14 mb-4">Create new task</h2>
    <div class="max-w-[700px] mr-auto border rounded-2xl shadow-lg p-10">
        <TitleAndDate />
        <!-- <Location /> -->
        <!-- <Details /> -->
        <!-- <Budget /> -->
    </div>
</template>

<script setup>
import { ref } from 'vue';
import TitleAndDate from '@/components/tasks/TitleAndDate.vue'
import Location from '@/components/tasks/Location.vue'
import Details from '@/components/tasks/Details.vue'
import Budget from '@/components/tasks/Budget.vue'

const completionDate = ref(null)

</script>

<style>

</style>