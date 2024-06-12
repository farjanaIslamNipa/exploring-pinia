<template>
  <div class="mx-[7.25rem]">
   <div class="mx-auto max-w-lg p-6 bg-white shadow-md rounded-md">  <h2 class="text-2xl font-bold mb-4">Flight Search</h2>
     <form @submit.prevent="submitSearch" class="space-y-4">
       <div>
         <label for="originInput" class="block font-semibold text-gray-700">Origin Airport Code:</label>
         <input
           type="text"
           id="originInput"
           v-model="originInput"
           placeholder="e.g., FAC"
           class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
         />
       </div>
 
       <div>
         <label for="destinationInput" class="block font-semibold text-gray-700">Destination Airport Code:</label>
         <input
           type="text"
           id="destinationInput"
           v-model="destinationInput"
           placeholder="e.g., DAC"
           class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
         />
       </div>
 
       <div>
         <label for="dateInput" class="block font-semibold text-gray-700">Departure Date (DD-MM-YYYY):</label>
         <input
           type="text"
           id="dateInput"
           v-model="dateInput"
           placeholder="e.g., 08-06-2024"
           class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
         />
       </div>
 
       <button type="submit" class="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors">Search</button>
     </form></div>
     <div class="mx-auto flex justify-center items-center" v-if="loading">
      Loading.....
      </div>
     <h3 class="pt-[2rem]" v-if="flights.length > 0">Flight Search Results</h3>
     <ul v-if="flights.length > 0">
       <li
         v-for="flight in flights[0]"
         :key="flight.id"
         class="border border-gray-200 rounded-md p-4 mb-4"
       >
         <div class="flex justify-between items-center mb-2">
           <div>
             <h3 class="text-lg font-semibold">
               Total Flight Duration: {{ flight.totalFlightDuration }}
             </h3>
             <h3 class="text-lg font-semibold">
               Total Price: {{ flight.totalPrice }}
             </h3>
           </div>
           <button
             class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
           >
             Book Now
           </button>
         </div>
         <ul>
           <li
             v-for="itinerary in flight.itineraries"
             :key="itinerary.id"
             class="border-t border-gray-200 pt-4 mt-4"
           >
             <div class="flex justify-between items-center">
               <h4 class="text-lg font-semibold">
                 Baggage Free Allowance:
                 {{
                   itinerary.baggage ? itinerary.baggage.freeAllowance : "N/A"
                 }}
               </h4>
               <button
                 class="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
               >
                 Details
               </button>
             </div>
             <ul>
               <li
                 v-for="segment in itinerary.segments"
                 :key="segment.id"
                 class="mt-2"
               >
                 <div class="flex gap-4">
                   <div>
                     <h4>{{ segment.departure?.iataCode }}</h4>
 
                     <p>{{ segment.departure?.at }}</p>
                   </div>
                   <div>
                     - {{ segment?.arrival?.iataCode }}
 
                     <p>{{ segment.arrival?.at }}</p>
                   </div>
                 </div>
 
                 <h4 class="text-base font-medium">
                   Marketing Carrier Name: {{ segment.marketingCarrierName }}
                 </h4>
               </li>
             </ul>
           </li>
         </ul>
       </li>
     </ul>
 
     <p v-else-if="searched">No flights found.</p>
   </div>
 </template>
 
 <script>
 export default {
   data() {
     return {
     
       originInput: "",
       destinationInput: "",
       dateInput: "",
       flights: [],
       searched: false,
       bearerToken: "166|9SjXxIPbGXlSSDZ5DtZqSt9jL8hqTGUhLQDUULqw",
       loading:false
     };
   },
   methods: {
     async submitSearch() {
       this.loading = true; 
       try {
         const departureDate = this.formatDate(this.dateInput);
         const searchInput =`${this.originInput}-${this.destinationInput}-${departureDate}-DPM0-DT00:00:00`;
         const url = `http://dev.populartravels.it:8752/api/v1/b/flight/search?ST=1&IT=${searchInput}&PX=ADT-1&FT=ALL&EN=pdt&CL=Y&FLX=0`;
         const response = await fetch(url, {
           method: "GET",
           headers: {
             Authorization: `Bearer ${this.bearerToken}`,
           },
         });
         const responseData = await response.json();
         this.flights = responseData?.data?.flightOffer;
         this.searched = true;
         console.log(this.flights);
         console.log("loading");
       } catch (error) {
         console.error("Error fetching flight search results:", error);
       }
       finally{
         this.loading=false
       }
     },
     formatDate(date) {
       const Dateparts = date.split("-");
       return `${Dateparts[0]}-${Dateparts[1]}-${Dateparts[2]}`;
     },
   },
 }
 </script>
 
 <style scoped>
 /* Add your component-specific styles here */
 </style>