import { defineStore } from "pinia";
import { ref } from "vue";

export const useTaskStore = defineStore('tasks', () => {
  const step = ref(1)
  const tasks = ref({
    title: '',
    date: '',
    completionDate: null,
    flexible: '',
    needCertainTime: false,
    certainTime: '',
    isRemoval: '',
    removalType: '',
    pickupAddress: '',
    dropOffAddress: '',
    address: '',
    movingItem: '',
    isStairs: '',
    taskDetails: '',
    suggestedBudget: null
  })

  const createTask = async() => {
    try {
      const taskData = await fetch('http://localhost:8000/api/v1/tasks/create-task', tasks.value)
    } catch (error) {
      console.log(error);
    }
  }

  return {
    step, 
    tasks,
  }
})