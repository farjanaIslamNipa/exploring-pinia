<template>
  <div>
    <h3 class="text-lg font-medium text-[#0f2d59e7]">Provide more details</h3>
    <form  class="mt-6 space-y-4">
      <div>
        <label class="input-label">What are you moving?</label>
        <div class="flex gap-3">
          <div class="flex min-w-[140px] items-center justify-center text-center">
              <input type="radio" id="a-few-items" class="peer hidden" name="movingItem" />
              <label for="a-few-items" class="checkbox-label">A few items</label>
          </div>
          <div class="flex min-w-[140px] items-center justify-center text-center">
              <input type="radio" id="no" class="peer hidden" name="removableTask"  />
              <label for="no" class="checkbox-label">Apartment</label>
          </div>
          <div class="flex min-w-[140px] items-center justify-center text-center">
              <input type="radio" id="no" class="peer hidden" name="removableTask"  />
              <label for="no" class="checkbox-label">House</label>
          </div>
        </div>
      </div>

      <div>
        <label class="input-label">Are there stairs?</label>
        <div class="flex gap-3">
          <div class="flex min-w-[140px] items-center justify-center text-center">
              <input type="radio" id="a-few-items" class="peer hidden" name="movingItem" />
              <label for="a-few-items" class="checkbox-label">No</label>
          </div>
          <div class="flex min-w-[140px] items-center justify-center text-center">
              <input type="radio" id="no" class="peer hidden" name="removableTask"  />
              <label for="no" class="checkbox-label">At Pickup</label>
          </div>
          <div class="flex min-w-[140px] items-center justify-center text-center">
              <input type="radio" id="no" class="peer hidden" name="removableTask"  />
              <label for="no" class="checkbox-label">At Delivery</label>
          </div>
          <div class="flex min-w-[140px] items-center justify-center text-center">
              <input type="radio" id="no" class="peer hidden" name="removableTask"  />
              <label for="no" class="checkbox-label">Both Places</label>
          </div>
        </div>
      </div>

      <div>
          <label for="" class="input-label">What key items are you moving?</label>
          <textarea rows="4" type="text" class="app-input" placeholder="Enter as much details as possible"></textarea>
      </div>
    
      <div class="flex items-center justify-between pt-5">
        <button class="border border-[#c4d6f2e7] py-[9px] text-sm px-3 min-w-[120px] rounded-md focus:outline-none bg-white text-[#0f2d59e7] font-medium">Prev</button>
        <button class="border border-[#c4d6f2e7] py-[9px] text-sm px-3 min-w-[120px] rounded-md focus:outline-none bg-[#cedcf4e7] text-[#0f2d59e7] font-medium">Next</button>
      </div>
    </form>
  </div>
</template>

<script setup>

</script>

<style scoped>

</style>