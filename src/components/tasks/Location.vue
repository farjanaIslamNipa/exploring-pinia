<template>
  <div>
    <h3 class="text-lg font-medium text-[#0f2d59e7]">Tell us where</h3>
    <form  class="mt-6 space-y-4">
      <div>
        <label class="input-label">Is this a removals task?</label>
        <div class="flex gap-3">
          <div class="flex min-w-[120px] items-center justify-center text-center">
              <input v-model="isRemoval" type="radio" id="yes" class="peer hidden" name="removableTask" value="yes" />
              <label for="yes" class="checkbox-label">Yes</label>
          </div>
          <div class="flex min-w-[120px] items-center justify-center text-center">
              <input v-model="isRemoval" type="radio" id="no" class="peer hidden" name="removableTask" value="no"  />
              <label for="no" class="checkbox-label">No</label>
          </div>
        </div>
      </div>

      <!-- If yes -->
      <div v-if="isRemoval === 'yes'" class="space-y-4">
        <div>
            <label for="" class="input-label">Pickup Address</label>
            <input v-model="pickupAddress" type="text" class="app-input" placeholder="Enter pickup address">
        </div>
        <div>
            <label for="" class="input-label">Drop-off Address<span class="text-xs">(Optional)</span></label>
            <input v-model="dropOffAddress" type="text" class="app-input" placeholder="Enter drop-off address">
        </div>
      </div>

      <!-- If No -->
      <div v-if="isRemoval === 'no'" >
        <div class="flex gap-3">
          <div class="flex w-full items-center justify-center text-center">
              <input v-model="removalType" type="radio" id="in-person" class="peer hidden" name="removalType" value="In Person" />
              <label for="in-person" class="checkbox-label font-medium">
                <div class="py-4 px-5">
                  <p>In-Person</p>
                  <p class="font-light text-xs mt-1">Select this if you need the Tasker physically there</p>
                </div>
              </label>
          </div>
          <div class="flex w-full items-center justify-center text-center">
              <input v-model="removalType" type="radio" id="online" class="peer hidden" name="removalType" value="Online"  />
              <label for="online" class="checkbox-label font-medium">
                <div class="py-4 px-5">
                  <p>Online</p>
                  <p class="font-light text-xs mt-1">Select this if the Tasker can do it from home</p>
                </div>
              </label>
          </div>
        </div>
              <!-- If In-person -->
        <div v-if="removalType === 'In Person'" class="mt-4">
            <label for="" class="input-label">Where do you need this done?</label>
            <input v-model="removalAddress" type="text" class="app-input" placeholder="Enter address">
        </div>
      </div>



      <!-- <div class="flex items-center justify-between pt-5">
        <button class="border border-[#c4d6f2e7] py-[9px] text-sm px-3 min-w-[120px] rounded-md focus:outline-none bg-white text-[#0f2d59e7] font-medium">Prev</button>
        <button class="border border-[#c4d6f2e7] py-[9px] text-sm px-3 min-w-[120px] rounded-md focus:outline-none bg-[#cedcf4e7] text-[#0f2d59e7] font-medium">Next</button>
      </div> -->
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const isRemoval = ref('')
const removalType = ref('')
const pickupAddress = ref('')
const dropOffAddress = ref('')
const removalAddress = ref('')
const address = ref('')

watch(isRemoval, newVal => {
  if(newVal === 'no'){
    pickupAddress.value = ''
    dropOffAddress.value = ''
  }
  if(newVal === 'yes'){
    removalType.value = ''
    removalAddress.value = ''
  }
})

</script>

<style scoped>

</style>