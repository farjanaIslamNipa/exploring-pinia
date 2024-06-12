// // https://health-aid-hub-backend.vercel.app/api/v1/

// import { defineStore } from "pinia";

// export const useSupplyStore = defineStore('supplies', {
//     state: () => ({
//         supplies: [],
//         loading: false,
//         error: null,
//         title: "",
//         category: "",
//         quantity: ""
//     }),

//     actions: {
//         async fetchSupplies(){
//             this.loading = true;
//             this.error = null;
//             try {
//                 const res = await fetch('https://health-aid-hub-backend.vercel.app/api/v1/supplies')
//                 const supplyData = await res.json()
//                 this.supplies = supplyData.data
//             } catch (error) {
//                 this.error = error.message
//             }finally{
//                 this.loading = false;
//             }
//         },
//         handleFilter(categoryValue, quantityValue){
//             this.category = categoryValue.toLowerCase();
//             this.quantity = quantityValue
//         },
//         clearFilter() {
//             this.category = ""
//             this.quantity = ""
//           }
//     },
//     getters: {
//         filterSupplies(){
//             if(this.category && this.quantity){
//                 console.log('both');
//                 return (this.supplies.filter((supply) => ((supply?.category.toLowerCase()) == this.category) && (supply?.quantity.toString() == this.quantity)))
//             }else if(this.category){
//                 console.log('category');
//                 return this.supplies.filter((supply) => (supply?.category.toLowerCase()) === this.category)
//             }else if(this.quantity){
//                 console.log('quantity');
//                 return this.supplies.filter((supply) => supply?.quantity.toString() === this.quantity)
//             }else if(this.title){
//                 return this.supplies.filter((supply) => (((supply?.title).toLowerCase()).includes(this.title.toLowerCase())))
//             }else return this.supplies;
//         }
//     },
// })

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
    category.value = categoryValue
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

