import axios from "axios";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useTaskStore = defineStore('tasks', () => {
  const step = ref(1)
  const tasks = ref({
    title: '',
    completionDate: null,
    flexible: false,
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
    if(tasks.value.flexible === true){
      deadline = 'I am flexible'
    }
    const taskData = {deadline, ...tasks.value}

    try {
      const res = await axios.post('http://localhost:8000/api/v1/tasks/create-task', taskData)
      console.log(res, 'response')
      if (res.status !== 200) {
        throw new Error('Network response was not ok')
      }
    } catch (error) {
      console.log(error, 'error')
    }
  }


  return {
    step, 
    tasks,
    createTask
  }
})