import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useSupplyStore = defineStore('supplies', () => {
  const supplies = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const title = ref('');
  const category = ref('');
  const quantity = ref('');

  const fetchSupplies = async() => {
    loading.value = true;
    error.value = null;
    try {
      const res = await fetch('https://health-aid-hub-backend.vercel.app/api/v1/supplies');
      const supplyData = await res.json();
      supplies.value = supplyData.data
    } catch (err) {
      error.value = err.message 
    }finally{
      loading.value = false;
    }
  }
  const handleFilter = (categoryValue, quantityValue) => {
    quantity.value = quantityValue
  }
  const clearFilter = () => {
    category.value = ""
    quantity.value = ""
  }

  const filterSupplies = computed(() => {
    if(category.value && quantity.value){
      return (supplies.value.filter((supply) => ((supply?.category.toLowerCase()) == category.value) && (supply?.quantity.toString() == quantity.value)))
    }else if(category.value){
      return supplies.value.filter((supply) => (supply?.category.toLowerCase()) === category.value)
    }else if(quantity.value){
      return supplies.value.filter((supply) => supply?.quantity.toString() === quantity.value)
    }else if(title.value){
      return supplies.value.filter((supply) => (((supply?.title).toLowerCase()).includes(title.value.toLowerCase())))
    }else return supplies.value;
  })

  return {
    supplies,
    loading,
    error,
    title,
    category,
    quantity,
    fetchSupplies,
    handleFilter,
    clearFilter,
    filterSupplies
  }
})

