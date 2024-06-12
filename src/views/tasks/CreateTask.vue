<template>
    <h2 class="text-center text-xl mt-14 mb-4">Create new task</h2>
    <div class="max-w-[700px] mx-auto border rounded-2xl shadow-lg p-10">
        <h3 class="text-lg">Let's start with the basics</h3>
        <form class="mt-6 space-y-4">
            <div>
                <label for="" class="block text-sm font-light text-gray-500 mb-1">In a few words, what do you need done?</label>
                <input type="text" class="border py-2 px-3 rounded-lg w-full placeholder:text-xs" placeholder="e.g Help washing my car">
            </div>
            <div>
                <label for="" class="block text-sm font-light text-gray-500 mb-1">When do you need this done?</label>
                
            </div>
        </form>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const originalInput = ref('')
const destinationInput = ref('')
const dateInput = ref('')
const flights = ref([])
const bearerToken = ref('166|9SjXxIPbGXlSSDZ5DtZqSt9jL8hqTGUhLQDUULqw')
const loading = ref(false)

const getFlightData = async()=>{
    loading.value = true;
    try {
        const departureDate = formatDate(dateInput.value);
        const searchInput = `${this.originInput}-${this.destinationInput}-${departureDate}-DPM0-DT00:00:00`
    } catch (error) {
        console.log(error);
    }
}
const formatDate = (date) => {
    console.log(date)
    // const dateParts = date.split("-");
    // return ${Dateparts[0]}-${Dateparts[1]}
}
onMounted(async() => {
    await getFlightData()
})

</script>

<style scoped>

</style>