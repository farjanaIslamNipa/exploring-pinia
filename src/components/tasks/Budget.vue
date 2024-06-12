<template>
  <div>
    <label for="" class="input-label">What is your budget?</label>
    <input v-model="tasks.suggestedBudget" type="text" class="app-input" placeholder="Enter your budget">
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useTaskStore } from '@/stores/tasks';

const taskStore = useTaskStore();
const { tasks } = storeToRefs(taskStore)
</script>
