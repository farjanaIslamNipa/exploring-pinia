<template>
  <div>
    <label class="input-label">What are you moving?</label>
    <div class="flex gap-3">
      <div class="flex min-w-[140px] items-center justify-center text-center">
          <input v-model="tasks.movingItem" type="radio" id="a-few-items" class="peer hidden" name="movingItem" value="A few items" />
          <label for="a-few-items" class="checkbox-label">A few items</label>
      </div>
      <div class="flex min-w-[140px] items-center justify-center text-center">
          <input v-model="tasks.movingItem" type="radio" id="Apartment" class="peer hidden" name="movingItem" value="Apartment" />
          <label for="Apartment" class="checkbox-label">Apartment</label>
      </div>
      <div class="flex min-w-[140px] items-center justify-center text-center">
          <input v-model="tasks.movingItem" type="radio" id="House" class="peer hidden" name="movingItem" value="House"  />
          <label for="House" class="checkbox-label">House</label>
      </div>
    </div>
  </div>

  <div>
    <label class="input-label">Are there stairs?</label>
    <div class="flex gap-3">
      <div class="flex min-w-[140px] items-center justify-center text-center">
          <input v-model="tasks.isStairs" type="radio" id="no-stairs" class="peer hidden" name="stairs" value="no" />
          <label for="no-stairs" class="checkbox-label">No</label>
      </div>
      <div class="flex min-w-[140px] items-center justify-center text-center">
          <input v-model="tasks.isStairs" type="radio" id="at-pickup" class="peer hidden" name="stairs" value="At Pickup"  />
          <label for="at-pickup" class="checkbox-label">At Pickup</label>
      </div>
      <div class="flex min-w-[140px] items-center justify-center text-center">
          <input v-model="tasks.isStairs" type="radio" id="at-delivery" class="peer hidden" name="stairs" value="At Delivery"  />
          <label for="at-delivery" class="checkbox-label">At Delivery</label>
      </div>
      <div class="flex min-w-[140px] items-center justify-center text-center">
          <input v-model="tasks.isStairs" type="radio" id="both-places" class="peer hidden" name="stairs" value="Both Places" />
          <label for="both-places" class="checkbox-label">Both Places</label>
      </div>
    </div>
  </div>

  <div>
      <label for="" class="input-label">What key items are you moving?</label>
      <textarea v-model="tasks.taskDetails" rows="4" type="text" class="app-input" placeholder="Enter as much details as possible"></textarea>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useTaskStore } from '@/stores/tasks';

const taskStore = useTaskStore();
const { tasks } = storeToRefs(taskStore)

</script>
