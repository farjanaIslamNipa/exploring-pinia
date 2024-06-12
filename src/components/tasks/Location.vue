<template>
    <div>
      <label class="input-label">Is this a removals task?</label>
      <div class="flex gap-3">
        <div class="flex min-w-[120px] items-center justify-center text-center">
            <input v-model="tasks.isRemoval" type="radio" id="yes" class="peer hidden" name="removableTask" value="yes" />
            <label for="yes" class="checkbox-label">Yes</label>
        </div>
        <div class="flex min-w-[120px] items-center justify-center text-center">
            <input v-model="tasks.isRemoval" type="radio" id="no" class="peer hidden" name="removableTask" value="no"  />
            <label for="no" class="checkbox-label">No</label>
        </div>
      </div>
    </div>

    <!-- If yes -->
    <div v-if="tasks.isRemoval === 'yes'" class="space-y-4">
      <div>
          <label for="" class="input-label">Pickup Address</label>
          <input v-model="tasks.pickupAddress" type="text" class="app-input" placeholder="Enter pickup address">
      </div>
      <div>
          <label for="" class="input-label">Drop-off Address<span class="text-xs">(Optional)</span></label>
          <input v-model="tasks.dropOffAddress" type="text" class="app-input" placeholder="Enter drop-off address">
      </div>
    </div>

    <!-- If No -->
    <div v-if="tasks.isRemoval === 'no'" >
      <div class="flex gap-3">
        <div class="flex w-full items-center justify-center text-center">
            <input v-model="tasks.removalType" type="radio" id="in-person" class="peer hidden" name="removalType" value="In Person" />
            <label for="in-person" class="checkbox-label font-medium">
              <div class="py-4 px-5">
                <p>In-Person</p>
                <p class="font-light text-xs mt-1">Select this if you need the Tasker physically there</p>
              </div>
            </label>
        </div>
        <div class="flex w-full items-center justify-center text-center">
            <input v-model="tasks.removalType" type="radio" id="online" class="peer hidden" name="removalType" value="Online"  />
            <label for="online" class="checkbox-label font-medium">
              <div class="py-4 px-5">
                <p>Online</p>
                <p class="font-light text-xs mt-1">Select this if the Tasker can do it from home</p>
              </div>
            </label>
        </div>
      </div>
      
      <!-- If In-person -->
      <div v-if="tasks.removalType === 'In Person'" class="mt-4">
          <label for="" class="input-label">Where do you need this done?</label>
          <input v-model="tasks.address" type="text" class="app-input" placeholder="Enter address">
      </div>
    </div>

</template>

<script setup>
import { watch } from 'vue';
import { useTaskStore } from '@/stores/tasks';
import { storeToRefs } from 'pinia';

const taskStore = useTaskStore();
const { tasks } = storeToRefs(taskStore)

watch(tasks.value, newVal => {
  if(newVal.isRemoval === 'no'){
    newVal.pickupAddress = ''
    newVal.dropOffAddress = ''
  }
  if(newVal.isRemoval === 'yes'){
    newVal.removalType = ''
    newVal.address = ''
  }
})


// import { onMounted } from 'vue';

// onMounted(() => {
//   const input = document.getElementById('address-input');
//   const autocomplete = places({
//     appId: import.meta.env.ALGOLIA_APP_ID,
//     apiKey: import.meta.env.ALGOLIA_API_KEY,
//     container: input
//   });

//   autocomplete.on('change', (e) => {
//     console.log('Selected address:', e.suggestion.value);
//     console.log('Latitude:', e.suggestion.latlng.lat);
//     console.log('Longitude:', e.suggestion.latlng.lng);
//   });
// });
</script>

<style scoped>

</style>