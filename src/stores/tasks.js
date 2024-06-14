import axios from "axios";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useTaskStore = defineStore('tasks', () => {
  const step = ref(1)
  const tasks = ref({
    title: '',
    completionDate: null,
    flexible: '',
    needCertainTime: false,
    specificTime: '',
    isRemoval: '',
    taskType: '',
    pickupPoint: '',
    dropOffPoint: '',
    address: '',
    movingItem: '',
    isStairs: '',
    taskDetails: '',
    suggestedBudget: null,
    recaptchaToken: ''
  })

  const createTask = async () => {
    let deadline = ''
    if(tasks.value.completionDate !== null){
      deadline = tasks.value.completionDate
    }
    if(tasks.value.flexible !== ''){
      deadline = tasks.value.flexible
    }
    const taskData = {deadline, ...tasks.value}

    try {
      const res = await axios.post('http://localhost:8000/api/v1/tasks/create-task', taskData)
      if (!res.ok) {
        throw new Error('Network response was not ok')
      }
  
      const data = await res.json()
      // response.value = `Success: ${JSON.stringify(data)}`
    } catch (error) {
      // response.value = `Error: ${error.message}`
      console.log(error, 'error')
    }
  }


  return {
    step, 
    tasks,
    createTask
  }
})