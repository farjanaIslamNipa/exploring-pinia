<template>
    <div>
        <h3 class="text-lg font-medium text-[#0f2d59e7]">Let's start with the basics</h3>
        
        <form class="mt-6 space-y-4">
            <div>
                <label for="" class="input-label first-letter:capitalize">In a few words, what do you need done?</label>
                <input v-model="taskTitle" type="text" class="app-input" placeholder="e.g Help washing my car">
            </div>
            <div>
                <label for="" class="input-label">When do you need this done?</label>
                <div class="flex gap-4">
                    <div class="w-full" :class="flexible === true ? 'opacity-35' : 'opacity-100'">
                        <VueDatePicker v-model="completionDate" auto-apply partial-flow :flow="['calendar']" hide-input-icon  placeholder="Select Date" input-class-name="date-picker-style" :disabled="flexible === true"  />
                    </div>
                    <div class="flex w-full items-center justify-center text-center" :class="completionDate ? 'opacity-35' : 'opacity-100'">
                        <input v-model="flexible" type="checkbox" id="flexible" class="peer hidden" name="flexibleCheckbox" value="I am flexible" unchecked-value="" :disabled="completionDate" />
                        <label for="flexible" class="checkbox-label">I am flexible</label>
                    </div>
                </div>
            </div>
            <div>
                <div class="flex items-center">
                    <div class="inline-flex items-center -ml-3">
                        <label
                        class="relative flex cursor-pointer items-center rounded-full p-3"
                        for="checkbox-5"
                        data-ripple-dark="true"
                        >
                        <input
                            v-model="needCertainTime"
                            value="certain time"
                            type="checkbox"
                            class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[#0f2d59e7] checked:bg-[#0f2d59e7] checked:before:bg-[#0f2d59e7] hover:before:opacity-10"
                            id="checkbox-5"
                        />
                        <div class="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-[#fad6ac] opacity-0 transition-opacity peer-checked:opacity-100">
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-3.5 w-3.5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            stroke="currentColor"
                            stroke-width="1"
                            >
                            <path
                                fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"
                            ></path>
                            </svg>
                        </div>
                        </label>
                    </div>
                    <p class="input-label">I need a certain time of day</p>
                </div>
                <div class="flex gap-3" :class="!needCertainTime ? 'pointer-events-none opacity-35' : 'pointer-events-auto opacity-100'">
                    <div class="flex w-full items-center justify-center text-center">
                        <input v-model="certainTime" type="radio" id="morning" class="peer hidden" name="certainTime" value="morning" />
                        <label for="morning" class="checkbox-label">Morning</label>
                    </div>
                    <div class="flex w-full items-center justify-center text-center">
                        <input v-model="certainTime" type="radio" id="midday" class="peer hidden" name="certainTime" value="midday" />
                        <label for="midday" class="checkbox-label">Midday</label>
                    </div>
                    <div class="flex w-full items-center justify-center text-center">
                        <input v-model="certainTime" type="radio" id="afternoon" class="peer hidden" name="certainTime" value="afternoon" />
                        <label for="afternoon" class="checkbox-label">Afternoon</label>
                    </div>
                    <div class="flex w-full items-center justify-center text-center">
                        <input v-model="certainTime" type="radio" id="evening" class="peer hidden" name="certainTime" value="evening" />
                        <label for="evening" class="checkbox-label">Evening</label>
                    </div>
                </div>
            </div>
            <!-- <div class="pt-5">
                <button @click="goNext" class="border border-[#c4d6f2e7] py-[9px] text-sm px-3 w-full rounded-md focus:outline-none bg-[#cedcf4e7] text-[#0f2d59e7] font-medium">Next</button>
            </div> -->
        </form>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
    const taskTitle = ref('')
    const completionDate = ref(null)
    const flexible = ref('')
    const needCertainTime = ref(false)
    const certainTime = ref('')

    watch(needCertainTime, newVal => {
        if(newVal === false){

        }
    })

</script>

<style>
.date-picker-style{
  font-size: 12px;
  padding-top: 7px;
  padding-bottom: 7px;
  border-radius: 8px;
}
</style>