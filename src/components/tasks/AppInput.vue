<template>
  <div>
    <div class="relative">
      <input ref="baseAppInput" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :name="attr" :id="attr" :autocomplete="attr" :type="type ? type : 'text'" placeholder="" :disabled="disabled" :class="[ error ? 'border-red-500' : 'border-gray-400 focus:!border-blue-900', customClass]" class="peer border min-h-[56px] flex items-center rounded-[4px] focus:outline-none py-2 px-3 text-sm w-full focus:border-default-blue border-default-border" />
      <label :for="attr" :class="labelClass" class="absolute top-[19px] left-1 z-10 origin-[0] -translate-y-7 scale-90 transform text-sm text-gray-400 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-7 peer-focus:scale-90 peer-focus:text-default-blue bg-white pl-2 pr-1.5">{{ label }}</label>
      <slot></slot>
    </div>
    <div class="text-red-500 text-sm leading-4">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  modelValue: String,
  error: String,
  attr: String,
  label: String,
  customClass: String,
  labelClass: String | Array,
  disabled: Boolean,
  type: String
});

// Reference to the input element
const baseAppInput = ref(null);

defineExpose({
  baseAppInput,
});

const emit = defineEmits(['update:modelValue'])
</script>
