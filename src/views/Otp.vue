<script setup>
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { ref } from 'vue';

// Creates a submission handler
// It validate all fields and doesn't call your function unless all fields are valid
const onSubmit = () => {
  const otpValue = otp.value.join('')
  console.log(otpValue, 'value');
};

const otp = ref(new Array(6).fill('')); // Array of 6 inputs

// References to each input field
const otpInputRefs = ref([]);

// Handle individual input
const handleInput = (event, index) => {
  const value = event.target.value;

  // Allow only numeric values
  if (/^\d$/.test(value)) {
    otp.value[index] = value;

    // Automatically move to the next input field
    if (index < otp.value.length - 1) {
      focusNextInput(index + 1);
    }
  } else {
    otp.value[index] = ''; // Clear invalid input
  }
};

// Focus on the next input field
const focusNextInput = (index) => {
  const nextInput = otpInputRefs.value[index];
  if (nextInput) nextInput.focus();
};

// Handle OTP paste event
const handlePaste = (event) => {
  const pastedData = event.clipboardData.getData('text');

  // Ensure pasted content is exactly 6 digits
  if (/^\d{6}$/.test(pastedData)) {
    otp.value = pastedData.split(''); // Spread the pasted digits across inputs

    // After pasting, auto-focus the last input
    focusNextInput(otp.value.length - 1);
  }
};

</script>

<template>
  <div class="max-w-[1400px] mx-auto bg-gray-50 py-10 px-10">
    <form @submit.prevent="onSubmit">
    <div>
      <div class=""></div>
    </div>
      <div class="otp-container">
      <input
        v-for="(digit, index) in otp"
        :key="index"
        v-model="otp[index]"
        @input="handleInput($event, index)"
        @paste="handlePaste($event)"
        maxlength="1"
        class="w-10 h-10 text-center text-lg border border-default-border rounded"
        :ref="el => otpInputRefs[index] = el" 
      />
      <div class="">
        <div class="">

        </div>
      </div>
    </div>

      <button>Submit</button>
    </form>
  </div>

</template>

<style>
.otp-container {
  display: flex;
  gap: 8px;
}

.otp-input {
  width: 40px;
  height: 40px;
  text-align: center;
  font-size: 18px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>