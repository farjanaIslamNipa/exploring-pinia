<template>
  <div class="max-w-[1164px] mx-auto min-h-[100vh] bg-gray-50">
    <h1>This is an about page</h1> 

    <!-- <div class="grid-wrapper bg-blue-300">
      <div class="grid-item-1 bg-red-50">Date</div>
      <div class="grid-item-2 bg-red-100">Agency</div>
      <div class="grid-item-3 bg-red-300">PNR</div>
      <div class="grid-item-4 bg-red-200">Passenger Name</div>
      <div class="grid-item-5 bg-red-400">Route</div>
      <div class="grid-item-6 bg-red-500">Time Limit</div>
      <div class="grid-item-7 bg-red-600">Departure</div>
      <div class="grid-item-8 bg-red-700">Ticket No</div>
      <div class="grid-item-9 bg-red-800">Total</div>
      <div class="grid-item-10 bg-red-900">Status</div>
    </div> -->
    <!-- <div class="grid auto-cols-max bg-blue-300">
      <div class="col-start-1 w-[7%] bg-red-50">Date</div>
      <div class="col-start-2 w-[12%] bg-red-100">Agency</div>
      <div class="col-start-3 w-[10%] bg-red-300">PNR</div>
      <div class="col-start-4 w-[15%] bg-red-200">Passenger Name</div>
      <div class="col-start-5 w-[15%] bg-red-400">Route</div>
      <div class="col-start-6 w-[7%] bg-red-500">Time Limit</div>
      <div class="col-start-7 w-[7%] bg-red-600">Departure</div>
      <div class="col-start-8 w-[12%] bg-red-700">Ticket No</div>
      <div class="col-start-9 w-[10%] bg-red-800">Total</div>
      <div class="col-start-10 w-[5%] bg-red-900">Status</div>
    </div> -->
    <div class="grid grid-cols-table-mobile lg:grid-cols-table-web  bg-blue-300">
      <div class="text-sm bg-blue-50">08 Jul 24</div>
      <div class="text-sm bg-blue-100">Popular Travels</div>
      <div class="text-sm bg-blue-300">1A-NZ83RT</div>
      <div class="col-span-full lg:col-auto text-sm bg-blue-200">ARIFA HASAN MRS CHO</div>
      <div class="col-span-full lg:col-auto text-sm bg-blue-400">DOH-DEL-DAC-DEL-DOH</div>
      <div class="col-span-full lg:col-auto text-sm bg-blue-500">11 JUL 24</div>
      <div class="col-span-full lg:col-auto text-sm bg-blue-600">Departure</div>
      <div class="col-span-full lg:col-auto text-sm bg-blue-700"></div>
      <div class="col-span-full lg:col-auto text-sm bg-blue-800">€ 561.00</div>
      <div class="col-span-full lg:col-auto text-sm bg-blue-900">pnr</div>
    </div>

<!-- <div class="grid auto-cols-min gap-2 bg-zinc-500 p-5">
  <div class="col-start-1 min-w-[10%] bg-zinc-100">col 1</div>
  <div class="col-start-2 w-[1%] bg-zinc-100">col 2</div>
  <div class="col-start-3 w-[10%] max-w-[15px] bg-zinc-100">col 3</div>
  <div class="col-start-4 w-48 bg-zinc-100">col 4</div>
</div> -->
  </div>
</template>
<style scoped>
.grid-wrapper{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(0.5fr, 1fr));
}

<<<<<<< HEAD
<style>
.grid-wrapper{
  display: grid;
  grid-template-columns: 100px auto 100px;
=======
.contain {
    display: grid;
    grid-gap: 5px;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-auto-rows: 75px;
    grid-auto-flow: dense;
}

.horizontal {
    grid-column: span 2;
}

.vertical {
    grid-row: span 2;
}

.big {
    grid-column: span 2;
    grid-row: span 2;
}
.grid-item-2{
  
}
.grid-item-4{
  grid-column: span 2;
}
.grid-item-5{
  grid-column: span 2;
>>>>>>> e555b887a21c14b291ab03e10581c8c28ff9acda
}
</style>
