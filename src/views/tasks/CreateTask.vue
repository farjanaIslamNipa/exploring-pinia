<template>
    <h2 class="text-center text-xl mt-14 mb-4">Create new task</h2>
    <div class="max-w-[700px] mr-auto border rounded-2xl shadow-lg p-10">
        <!-- Form Header -->
        <h3 class="text-lg font-medium text-[#0f2d59e7]">
            {{ 
                  step === 1 ? "Let's start with the basics" 
                : step === 2 ? "Tell us where" 
                : step === 3 ? "Provide more details" 
                : step === 4 ? "Suggest your budget" : ""
            }}
        </h3>

        <form @submit.prevent="createTask" class="mt-6 space-y-4">
            <keep-alive>
                <component :is="currentComponent" />
            </keep-alive>

            <div class="flex items-center pt-2 border-t border-[#7da1d6e7]  mt-8" :class="step > 1 ? 'justify-between' : 'justify-end'">
                <button @click="goPrev" :class="step > 1 ? 'visible' : 'hidden'" class="prev-btn">Prev</button>
                <button @click="goNext" class="next-btn" :type="step === 4 ? 'submit' : 'button'">Next</button>
                <button @click="recaptcha">Execute recaptcha</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import TitleAndDate from '@/components/tasks/TitleAndDate.vue'
import Location from '@/components/tasks/Location.vue'
import Details from '@/components/tasks/Details.vue'
import Budget from '@/components/tasks/Budget.vue'
import { ref, shallowRef, watch } from 'vue';
import { useTaskStore } from '@/stores/tasks';
import { storeToRefs } from 'pinia';
import {useReCaptcha} from 'vue-recaptcha-v3';

const { executeRecaptcha, recaptchaLoaded } = useReCaptcha()

const recaptcha = async () => {
      // (optional) Wait until recaptcha has been loaded.
      await recaptchaLoaded()

      // Execute reCAPTCHA with action "login".
      const token = await executeRecaptcha('login')

      // Do stuff with the received token.
    }

const currentComponent = shallowRef(TitleAndDate)
const taskStore = useTaskStore();
const { step } = storeToRefs(taskStore)

const goNext = () => {
    if(step.value < 4){
        step.value++
    }
}

const goPrev = () => {
    if(step.value > 1){
        step.value--
    }
}

const createTask = async() => {
    try {
        
    } catch (error) {
        console.log(error);
    }
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