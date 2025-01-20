<template>
  <div class="max-w-[1400px] mx-auto bg-gray-50 py-10 px-10">
    <form @submit.prevent="handleForm">
    <div class="max-w-[300px] mx-auto space-y-5">
      <div>
        <AppInput
          v-model="departure"
          attr="departure"
          label="Departure"
          @click="toggleDeparture"
          @keydown.arrow-down.prevent="onArrowDown"
          @keydown.arrow-up.prevent="onArrowUp"
          @keydown.enter.prevent="onEnterKey"
        />
        <ul v-if="dropdownToggler" class="border rounded-md p-4 divide-y max-h-[250px] overflow-y-auto">
          <li
            v-for="(airport, index) in departureAirportList"
            :key="airport.id"
            @click="selectAirport(airport.city)"
            class="cursor-pointer py-2"
            :class="{ 'bg-blue-200': activeIndex === index }"
            ref="dropdownItems"
          >
            {{ airport.city }}
          </li>
        </ul>
      </div>
      <div class="text-end">
        <button
          class="border border-blue-900 text-blue-900 font-semibold rounded-md px-6 py-2"
          type="submit"
        >
          Submit
        </button>
      </div>
    </div>
  </form>
    <!-- <form @submit.prevent="onSubmit">
      <div class="max-w-[300px] mx-auto space-y-5">
        <div v-for="(item, index) in dynamicArray" :key="index">
          <AppInput
            v-model="formValues[item.key]"
            :error="errors[item.key]"
            :attr="item.key"
            :label="item.label"
            @input="validateField(item.key)"
          />
        </div>
        <div class="text-end">
          <button class="border border-blue-900 text-blue-900 font-semibold rounded-md px-6 py-2" type="submit">
            Submit
          </button>
        </div>
      </div>
    </form> -->
  </div>
</template>

<script setup>
import AppInput from '@/components/tasks/AppInput.vue';
import { nextTick, ref } from 'vue';


const departure = ref('')

const dropdownToggler = ref(false)
const dropdownItems = ref([]);

const departureAirportList = [
      { id: 1, city: 'Rome' },
      { id: 2, city: 'Milan' },
      { id: 3, city: 'Venice' },
      { id: 4, city: 'Bologna' },
      { id: 5, city: 'Catania' },
      { id: 6, city: 'Naples' },
      { id: 7, city: 'Palermo' },
      { id: 8, city: 'Florence' }
    ];

const activeIndex = ref(-1); // Tracks the current index

const toggleDeparture = () => {
  dropdownToggler.value = !dropdownToggler.value;
  if (dropdownToggler.value) activeIndex.value = 0; // Default to first option when opening
};

const selectAirport = (airport) => {
  departure.value = airport;
  dropdownToggler.value = false;
  activeIndex.value = -1; // Reset index
};

const handleForm = () => {
  console.log('Submitted:', departure.value);
};

const onArrowDown = async () => {
  if (activeIndex.value < departureAirportList.length - 1) {
    activeIndex.value++;
    await nextTick(); // Ensure DOM is updated before scrolling
    scrollToActiveItem();
  }
};

const onArrowUp = async () => {
  if (activeIndex.value > 0) {
    activeIndex.value--;
    await nextTick(); // Ensure DOM is updated before scrolling
    scrollToActiveItem();
  }
};

const onEnterKey = () => {
  if (activeIndex.value !== -1) {
    selectAirport(departureAirportList[activeIndex.value].city);
  }
};
const scrollToActiveItem = () => {
      const items = dropdownItems.value;
      if (items && items[activeIndex.value]) {
        items[activeIndex.value].scrollIntoView({
          block: 'nearest', // Ensures minimal scrolling
          behavior: 'smooth' // Optional: Makes scrolling smooth
        });
      }
    };
// // Dynamic array defining the fields
// const dynamicArray = [
//   { key: 'username1', label: 'Username 1' },
//   { key: 'username2', label: 'Username 2' },
//   { key: 'username3', label: 'Username 3' },
//   // Add more fields dynamically
// ];

// // Initialize reactive form state and errors dynamically
// const formValues = reactive({});
// const errors = reactive({});

// // Populate the initial structure of formValues and errors
// dynamicArray.forEach((item) => {
//   formValues[item.key] = '';
//   errors[item.key] = '';
// });

// // Custom validation function
// const validateField = (field) => {
//   if (!formValues[field]) {
//     errors[field] = `${field} is required.`;
//   } else if (formValues[field].length < 3) {
//     errors[field] = `${field} must be at least 3 characters.`;
//   } else {
//     errors[field] = ''; // Clear error if valid
//   }
// };

// // Validate all fields on form submission
// const onSubmit = () => {
//   let hasError = false;

//   dynamicArray.forEach((item) => {
//     validateField(item.key); // Validate each field
//     if (errors[item.key]) {
//       hasError = true;
//     }
//   });

//   if (!hasError) {
//     console.log('Form submitted successfully!', formValues);
//   } else {
//     console.error('Form contains errors.', errors);
//   }
// };
</script>
