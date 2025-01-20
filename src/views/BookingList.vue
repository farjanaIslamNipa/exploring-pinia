<template>
	<div v-if="permission.pnr_report && permission.office_status === 'active' && permission.user_status === 'active'"
		class="bg-[#F5F5F5]">
		<Navbar :origin="'booking'"></Navbar>

		<main class="container">
			<Breadcrumb 
			:items="[{ name: 'Booking List', url: '/booking/list', active: true }, { name: 'Retrieve', active: false }]" 
			class="py-[14px]" />

		<!-- Filtering bar -->
		<section class="grid grid-cols-12 gap-3 p-2.5 bg-white rounded shadow">
			<div :class="!(permission.officeType == 'agency') ? 'col-span-12 md:col-span-6' : 'col-span-8'">
				<div class="base-filter-input pl-2">
					<input v-model="searchValue" type="text" class="text-sm md:text-base focus:outline-none border-r border-default-border w-full text-default-black placeholder:text-sm placeholder:font-medium px-4"
						:placeholder="`Type your ${searchValueType}`" />

					<!-- PNR dropdown -->
					<div class="relative flex items-center justify-center pl-0.5 md:pl-0 min-w-[110px] md:min-w-[136px] h-full">
						<div @click.stop="searchValueTypeChangeToggler = !searchValueTypeChangeToggler" class="flex gap-x-1.5 justify-center items-center w-full h-full cursor-pointer text-sm px-1 md:px-4 font-medium" :class="searchValueType === 'pnr' ? 'uppercase' : 'capitalize'">
							<span>{{ searchValueType }}</span>
							<ArrowFillIcon />
						</div>
						<ul v-if="searchValueTypeChangeToggler" class="absolute top-[60px] bg-white rounded-lg border-b-4 border-default-red z-10 w-full shadow-md">
							<li @click="searchValueTypeChange('Office')" class="base-dropdown-item">Office</li>
							<li @click="searchValueTypeChange('PNR')" class="base-dropdown-item">PNR</li>
							<li @click="searchValueTypeChange('Ticket')" class="base-dropdown-item">Ticket</li>
							<li @click="searchValueTypeChange('Username')" class="base-dropdown-item">Username</li>
						</ul>
					</div>
				</div>
			</div>

			<!-- Booking status dropdown -->
			<div class="col-span-6 md:col-span-2" @click.stop="bookingStatusChangeToggler = !bookingStatusChangeToggler">
				<BaseDropdown :itemType="bookingStatusType" :itemToggler="bookingStatusChangeToggler" class="booking-status-dropdown">
					<template #list>
						<li @click="bookingStatusTypeChange('Status(Any)')" class="base-dropdown-item">Status(Any)</li>
						<li @click="bookingStatusTypeChange('Created')" class="base-dropdown-item">Created</li>
						<li @click="bookingStatusTypeChange('Ticketed')" class="base-dropdown-item">Ticketed</li>
						<li @click="bookingStatusTypeChange('Cancelled')" class="base-dropdown-item">Cancelled</li>
					</template>
				</BaseDropdown>
			</div>

			<!-- User type dropdown -->
			<div v-if="!(permission.officeType == 'agency')" @click.stop="userTypeChangeToggler = !userTypeChangeToggler" class="col-span-6 md:col-span-2">
				<BaseDropdown :itemType="userType" :itemToggler="userTypeChangeToggler">
					<template #list>
						<li @click="userTypeChange('Type(Any)')" class="base-dropdown-item">Type(Any)</li>
						<li @click="userTypeChange('User')" class="base-dropdown-item">User</li>
						<li v-if="permission.officeType == 'system'" @click="userTypeChange('Company')" class="base-dropdown-item">Company</li>
						<li @click="userTypeChange('Agent')" class="base-dropdown-item">Agent</li>
					</template>
				</BaseDropdown>
			</div>

			<!-- Search Button -->
			<div :class="!(permission.officeType == 'agency') ? 'col-span-12 md:col-span-2' : 'col-span-6 md:col-span-2'">
				<BaseButton v-if="permission.booking_search" @click="searchPNR()" class="w-[174px] text-base">
						<div v-if="loaderPnr" class="flex justify-center items-center gap-x-2">
							<LoaderIcon />
							<span	class="text-white-50 text-xs md:text-base font-medium font-Inter">Loading...</span>
						</div>
					<span v-else>Search</span>
				</BaseButton>
			</div>
		</section>
		<hr class="my-4">

		<section class="min-h-[30vh]">
			<!-- exception -->
			<ExceptionError v-if="exception" :exception="exception" />

			<div class="bg-white">
				<MiniPagination :pagination="form.pagination" @currentPage="updateCurrentPageValue" ></MiniPagination>
			</div>

			
			<!-- Information table web view -->
			<div class="hidden lg:grid bg-[#EDEDED] mt-10 overflow-hidden" :class="!(user?.userDetail?.office?.officeType == 'Agency') ? 'lg:grid-cols-[repeat(10,minmax(max-content,100%))]' : 'grid-cols-[repeat(9,minmax(max-content,1fr))]'">
				<div class="base-table-header">Date</div>
				<div class="base-table-header" v-if="!(user?.userDetail?.office?.officeType == 'Agency')">Agency</div>
				<div class="base-table-header">PNR</div>
				<div class="base-table-header">Passenger Name</div>
				<div class="base-table-header">Route</div>
				<div class="base-table-header">Time Limit</div>
				<div class="base-table-header">Departure</div>
				<div class="base-table-header">Ticket No</div>
				<div class="base-table-header">Total</div>
				<div class="base-table-header">Status</div>
				<template
				v-for="(booking, index) in form.bookingList"
				:key="index">

				<!-- Date -->
					<div class="base-table-column small-device-base-table-column" :class="[index % 2 === 0 ? '!bg-[#EDEDED] ' : '!bg-white']">
							<div class="w-full">
								{{
									new Date(booking?.createdAt?.split("T")[0]).toLocaleDateString(
											"en-GB",
										{
												day: "2-digit",
												month: "short",
												year: "2-digit",
										}
									)
								}}
						</div>
					</div>

					<!-- Agency -->
					<div v-if="!(user?.userDetail?.office?.officeType == 'Agency')" class="base-table-column group relative small-device-base-table-column" :class="[index % 2 === 0 ? '!bg-[#EDEDED] ' : '!bg-white']">
						<div class="flex items-center">
							<span class="w-full lg:w-4/5 truncate">{{ booking?.office }}</span>
							<span	class="pointer-events-none absolute bottom-5 left-4 w-max z-10 opacity-0 group-hover:opacity-100 px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm tooltip-arrow">
									{{ booking?.user }}
							</span>
						</div>
					</div>

					<!-- PNR -->
					<div class="base-table-column" :class="[index % 2 === 0 ? '!bg-[#EDEDED] ' : '!bg-white']">{{ (booking?.gds ?? '') + '-' + (booking?.pnr ?? '') }}</div>	

					<!-- Passenger Name -->
					<div v-for="(passenger, passengerIndex) in booking.passengers" :key="passengerIndex" class="base-table-column gap-x-1 small-device-base-table-column" :class="[index % 2 === 0 ? '!bg-[#EDEDED] ' : '!bg-white']">
							<div class="truncate-text">
									{{ `${passenger?.firstName} ${passenger?.lastName}` }}
							</div>
							<div class="pr-3.5" v-if="booking.passengerCount > 1">
								<span class=" relative">
										<PersonIcon />
										<span class="text-black absolute bottom-1 -right-3 font-normal">+{{
												booking?.passengerCount - 1
										}} </span>
								</span>
							</div>
					</div>

					<!-- Route -->
					<div class="base-table-column" :class="[index % 2 === 0 ? '!bg-[#EDEDED] ' : '!bg-white']">{{ booking?.route }}</div>

					<!-- Time Limit -->
					<div class="base-table-column small-device-base-table-column" :class="[index % 2 === 0 ? '!bg-[#EDEDED] ' : '!bg-white']">
							<div>
								{{
									booking?.bookingTimeLimit == '' ? '' :
										new Date(booking?.bookingTimeLimit?.split("T")[0]).toLocaleDateString(
											"en-GB",
											{
												day: "2-digit",
												month: "short",
												year: "2-digit",
											}
										).toUpperCase()
								}}
							</div>
					</div>

					<!-- Departure -->
					<div class="base-table-column small-device-base-table-column" :class="[index % 2 === 0 ? '!bg-[#EDEDED] ' : '!bg-white']">
							<div>
								{{
									new Date(
										Date.parse(
											booking?.departureDate.replace(
												/(\d{2})-(\d{2})-(\d{4})/,
												"$2/$1/$3"
											)
										)
									).toLocaleDateString(
										"en-GB",
										{
											day: "2-digit",
											month: "short",
											year: "2-digit",
										}
									).toUpperCase()
								}}
							</div>
					</div>

					<!-- Ticket No -->
					<div class="base-table-column small-device-base-table-column" :class="[index % 2 === 0 ? '!bg-[#EDEDED] ' : '!bg-white']">
						<p v-if="booking.ticketNumber"> {{ booking?.ticketNumber }}</p>
					</div>

					<!-- Total -->
					<div class="base-table-column" :class="[index % 2 === 0 ? '!bg-[#EDEDED] ' : '!bg-white']">
						<span :class="booking.status == 'pnr' ? 'text-red-650 animate-pulse' : ''"
							v-if="booking.total == 0">N/A</span>
						<span v-else>€ {{ booking?.total?.toFixed(2) }}</span>
						<span v-if="booking.total == 0 && booking.status == 'pnr'"
							class="pointer-events-none absolute -top-14 -left-24 w-max z-10 opacity-0 group-hover:opacity-100 px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm tooltip-arrow">
							Please requote this pnr or contact the support team
						</span>
					</div>

					<!-- Status -->
					<div class="base-table-column flex items-center justify-between" :class="[index % 2 === 0 ? '!bg-[#EDEDED] ' : '!bg-white']">
						<div class="w-full">
							<div v-if="((permission.booking_retrive && booking.gds == '1A') || (permission.booking_retrive_flx && booking.gds == '1F')) && permission.user_status == 'active' && permission.office_status == 'active'"
								@click="searchPNRfromtable(booking.pnr, booking.gds, booking.bookingId, index)"
								:disabled="booking.status == 'N\/A'">
								<div v-if="pnrStore.loaderPnr && tableRow == index" class="flex justify-center items-center min-w-[50px]">
										<div class="flex justify-center items-center w-full">
												<svg aria-hidden="true"
														class="inline w-4 h-4 text-blue-650 animate-spin dark:text-gray-600 fill-indigo-650 "
														viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path
																d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
																fill="currentColor" />
														<path
																d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
																fill="currentFill" />
												</svg>
										</div>
								</div>
								<div v-else
									class="flex justify-center items-center  text-white text-[11px] font-semibold font-Inter rounded-lg cursor-pointer max-w-[40px]"
									:class="booking.status == 'pnr' ? 'bg-green-600' : booking.status == 'ticketed' ? 'bg-green-700' : 'bg-red-650'">
									<span v-if="booking.status == 'pnr' || booking.status == 'cancelled'">PNR</span>
									<span v-else-if="booking.status == 'ticketed'">TKT</span>
									<span v-else-if="booking.status == 'voided'">VOID</span>
									<span v-else>N/A</span>
								</div>
								</div>
								<div v-else @click="notPermitted()" class="flex justify-center items-center text-white text-[11px] font-semibold font-Inter w-1/12 py-2">
									<div class="flex justify-center items-center text-white text-[11px] font-semibold font-Inter rounded-lg w-1/2"
										:class="booking.status == 'pnr' ? 'bg-green-600' : booking.status == 'ticketed' ? 'bg-green-700' : 'bg-red-650'">
										<span v-if="booking.status == 'pnr' || booking.status == 'cancelled'">PNR</span>
										<span v-else-if="booking.status == 'ticketed'">TKT</span>
										<span v-else-if="booking.status == 'voided'">VOID</span>
										<span v-else>N/A</span>
									</div>
								</div>
						</div>
						<button @click="toggleDetails(index)" class="px-2 block lg:hidden">
							<ArrowIcon class="transition-all delay-75 ease-in-out dura" :class="activeIndex === index ? '-rotate-90' : 'rotate-90'" />
						</button>
					</div>
				</template>
			</div>

			<!-- Information table mobile view -->
			<div class="grid lg:hidden grid-cols-[repeat(4,minmax(max-content,100%))]">
				<div class="base-table-header !pl-2">PNR</div>
				<div class="base-table-header">Route</div>
				<div class="base-table-header">Total</div>
				<div class="base-table-header">Status</div>
				<template	v-for="(booking, index) in form.bookingList"
				:key="index">
				<div class="base-table-column !pl-2" :class="[index % 2 === 0 ? '!bg-[#EDEDED] ' : '!bg-white']">{{ booking?.pnr || '' }}</div>	
				<div class="base-table-column" :class="[index % 2 === 0 ? '!bg-[#EDEDED] ' : '!bg-white']">{{ booking?.route }}</div>

				<!-- Total -->
				<div class="base-table-column" :class="[index % 2 === 0 ? '!bg-[#EDEDED] ' : '!bg-white']">
						<span :class="booking.status == 'pnr' ? 'text-red-650 animate-pulse' : ''"
							v-if="booking.total == 0">N/A</span>
						<span v-else>€ {{ booking?.total?.toFixed(2) }}</span>
						<span v-if="booking.total == 0 && booking.status == 'pnr'"
							class="pointer-events-none absolute -top-14 -left-24 w-max z-10 opacity-0 group-hover:opacity-100 px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm tooltip-arrow">
							Please requote this pnr or contact the support team
						</span>
					</div>

					<!-- Status -->
					<div class="base-table-column flex items-center justify-between" :class="[index % 2 === 0 ? '!bg-[#EDEDED] ' : '!bg-white']">
						<div class="w-full">
							<div v-if="((permission.booking_retrive && booking.gds == '1A') || (permission.booking_retrive_flx && booking.gds == '1F')) && permission.user_status == 'active' && permission.office_status == 'active'"
								@click="searchPNRfromtable(booking.pnr, booking.gds, booking.bookingId, index)"
								:disabled="booking.status == 'N\/A'">
								<div v-if="pnrStore.loaderPnr && tableRow == index" class="flex justify-center items-center min-w-[50px]">
										<div class="flex justify-center items-center w-full">
												<svg aria-hidden="true"
														class="inline w-4 h-4 text-blue-650 animate-spin dark:text-gray-600 fill-indigo-650 "
														viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path
																d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
																fill="currentColor" />
														<path
																d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
																fill="currentFill" />
												</svg>
										</div>
								</div>
								<div v-else
									class="flex justify-center items-center  text-white text-[11px] font-semibold font-Inter rounded-lg cursor-pointer max-w-[40px]"
									:class="booking.status == 'pnr' ? 'bg-green-600' : booking.status == 'ticketed' ? 'bg-green-700' : 'bg-red-650'">
									<span v-if="booking.status == 'pnr' || booking.status == 'cancelled'">PNR</span>
									<span v-else-if="booking.status == 'ticketed'">TKT</span>
									<span v-else-if="booking.status == 'voided'">VOID</span>
									<span v-else>N/A</span>
								</div>
								</div>
								<div v-else @click="notPermitted()" class="flex justify-center items-center text-white text-[11px] font-semibold font-Inter w-1/12 py-2">
									<div class="flex justify-center items-center text-white text-[11px] font-semibold font-Inter rounded-lg w-1/2"
										:class="booking.status == 'pnr' ? 'bg-green-600' : booking.status == 'ticketed' ? 'bg-green-700' : 'bg-red-650'">
										<span v-if="booking.status == 'pnr' || booking.status == 'cancelled'">PNR</span>
										<span v-else-if="booking.status == 'ticketed'">TKT</span>
										<span v-else-if="booking.status == 'voided'">VOID</span>
										<span v-else>N/A</span>
									</div>
								</div>
						</div>
						<button @click="toggleDetails(index)" class="px-2 block lg:hidden">
							<ArrowIcon class="transition-all delay-75 ease-in-out dura" :class="activeIndex === index ? '-rotate-90' : 'rotate-90'" />
						</button>
					</div>
					<div class="col-span-full base-table-column " v-if="activeIndex === index">
						<div class="bg-[#f9f4f4] rounded-lg p-2 w-full space-y-2">
							<div class="flex items-center">
								<div class="w-[110px]">Date</div>
								<div class="uppercase">:&nbsp;
									{{
									new Date(booking?.createdAt?.split("T")[0]).toLocaleDateString(
											"en-GB",
										{
												day: "2-digit",
												month: "short",
												year: "2-digit",
										}
									)
								}}
								</div>
							</div>
							<div class="flex items-center">
								<div class="w-[110px]">GDS</div>
								<div>:&nbsp;{{  booking?.gds || '' }}</div>
							</div>
							<div class="flex items-center" v-if="!(user?.userDetail?.office?.officeType == 'Agency')">
								<div class="w-[110px]">Agency</div>
								<div>:&nbsp;{{  booking?.office || '' }}</div>
							</div>
							<div v-for="(passenger, passengerIndex) in booking.passengers" :key="passengerIndex" class="flex items-center flex-wrap">
								<div class="w-[110px]">Passenger Name</div>
								<div class="">
										:&nbsp;{{ `${passenger?.firstName} ${passenger?.lastName}` }}
								</div>
								<div v-if="booking.passengerCount > 1" class="relative pl-3">
									<PersonIcon />
									<span class="text-black absolute bottom-1 -right-3 font-normal">+{{
											booking?.passengerCount - 1
									}} </span>
								</div>
							</div>
							<div class="flex items-center">
								<div class="w-[110px]">Time Limit</div>
								<div>:&nbsp;
									{{
									booking?.bookingTimeLimit == '' ? '' :
										new Date(booking?.bookingTimeLimit?.split("T")[0]).toLocaleDateString(
											"en-GB",
											{
												day: "2-digit",
												month: "short",
												year: "2-digit",
											}
										).toUpperCase()
								}}
								</div>
							</div>
							<div class="flex items-center">
								<div class="w-[110px]">Departure</div>
								<div>:&nbsp;
									{{
									new Date(
										Date.parse(
											booking?.departureDate.replace(
												/(\d{2})-(\d{2})-(\d{4})/,
												"$2/$1/$3"
											)
										)
									).toLocaleDateString(
										"en-GB",
										{
											day: "2-digit",
											month: "short",
											year: "2-digit",
										}
									).toUpperCase()
									}}
								</div>
							</div>
							<div class="flex items-center" v-if="booking.ticketNumber">
								<div class="w-[110px]">Ticket No</div>
								<div>:&nbsp; {{ booking?.ticketNumber }}</div>
							</div>
						</div>
					</div>
				</template>
			</div>
		</section>

		<Pagination :pagination="form.pagination" @currentPage="updateCurrentPageValue"></Pagination>
		<!-- <DataNotFound v-if="form.bookingList.length === 0" text="Relevant data not found" class="mb-8" /> -->
		</main>


		<!-- footer section -->
		<Footer></Footer>
	</div>
	<div v-else-if="permission.user_status === 'inactive' || permission.office_status === 'inactive'">
		<Error></Error>
	</div>
	<div v-else-if="permission.user_status === 'pending' || permission.office_status === 'pending'">
		<Pending></Pending>
	</div>
	<div v-else>
		<Unauthorized></Unauthorized>
	</div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount, reactive, computed } from "vue";
import { fetchBookingUrl, findPNRUrl } from "../../assets/urls.js";
import Footer from "../../components/layout/Footer.vue";
import Navbar from "../../components/layout/HeaderNav/Navbar.vue";
import Error from "../../components/layout/HeaderNav/Error.vue";
import Pending from "../../components/layout/HeaderNav/Pending.vue";
import Unauthorized from "../../components/layout/HeaderNav/Unauthorized.vue";
import { router } from "../../router/index.js";
import { usePnrStore } from "../../stores/pnr.store.js";
import { useRouter, useRoute } from "vue-router";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import ArrowIcon from "../../components/icons/ArrowIcon.vue";
import Breadcrumb from "../../components/ui/Breadcrumb.vue";
import BaseButton from "../../components/ui/BaseButton.vue";
import ArrowFillIcon from "../../components/icons/ArrowFillIcon.vue";
import BaseDropdown from "../../components/ui/BaseDropdown.vue";
import LoaderIcon from "../../components/icons/LoaderIcon.vue";
import DataNotFound from "../../components/shared/DataNotFound.vue";
import ExceptionError from "../../components/shared/ExceptionError.vue";
import MiniPagination from '../../components/shared/MiniPagination.vue'
import PersonIcon from "../../components/icons/PersonIcon.vue";
import Pagination from '../../components/shared/Pagination.vue'


// To view all table data in mobile device
const activeIndex = ref(null);
const toggleDetails = (index) => {
  if (activeIndex.value === index) {
    activeIndex.value = null;
  } else {
    activeIndex.value = index;
  }
};

// ---------------------------------------------------------------
const currentPage = ref(1);
const $toast = useToast();

const user = ref({});
const searchValueTypeChangeToggler = ref(false);
const bookingStatusChangeToggler = ref(false);
const userTypeChangeToggler = ref(false);
const gdsTypeChangeToggler = ref(false);
const exception = ref('');
const filter = reactive({
	status: 'any',
	field: 'pnr',
	value: '',
	gds: '',
	userType: '',
	page: 1
});
const form = reactive({
	bookingList: [],
	pagination: {},
});

const pnrStore = usePnrStore();
const searchValue = ref("");
const tableRow = ref(0);
const loaderPnr = ref(false);
const searchValueType = ref("PNR");
const bookingStatusType = ref("Status(Any)");
const userType = ref("Status(Any)");
const route = useRoute();
const param = ref(route.query.parameter);

const searchPNR = () => {
	loaderPnr.value = true;
	tableRow.value = -1;
	pnrStore.pnrCode = searchValue.value;
	filter.status = bookingStatusType.value === 'Status(Any)' ? 'any' : bookingStatusType.value.toLowerCase();
	filter.userType = userType.value === 'Type(Any)' ? 'any' : userType.value.toLowerCase();
	filter.field = searchValueType.value.toLowerCase();
	filter.value = encodeURIComponent(searchValue.value);
	filter.gds = gdsAccessType.value;
	currentPage.value = 1;

	var parameter = "page=" + currentPage.value + "&status=" + filter.status + "&field=" + filter.field + "&value=" + filter.value + "&userType=" + filter.userType;
	router.replace({ query: { parameter } });
	fetchBooking(parameter);
};
const searchPNRfromtable = (pnrCode, gds, bookingId, index) => {
	tableRow.value = index;
	if (pnrCode.length == 6) {
		pnrStore.setPnrCode(pnrCode);
		pnrStore.setbookingId(bookingId);
		router.push("/booking/retrieve/" + gds + "/" + pnrCode);
		// }, 2000);
	} else if (pnrCode == 'N/A') {
		pnrStore.setbookingId(bookingId);
		pnrStore.retrivePnrForTable("NA");
	}

};

const fetchBooking = (parameter) => {
	exception.value = '';
	user.value = JSON.parse(localStorage.getItem("user") ? localStorage.getItem("user") : "{}");

	if (localStorage.getItem("user")) {
		var token = JSON.parse(localStorage.getItem("user")).token;

		if (token) {

			fetch(fetchBookingUrl + "?" + parameter, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
				.then((response) => response.json())
				.then((response) => {
					if (response.data) {
						if (response.data.status == false) {
							exception.value = response.data.message;
						}
						else {
							form.bookingList = response.data.bookingList;
							form.pagination = response.data.paginate;
						}
						loaderPnr.value = false;
					} else {
						let key = Object.keys(response);
						exception.value = response[key];
						loaderPnr.value = false;
					}

				})
				.catch(error => {
					exception.value = error;
					loaderPnr.value = false;
				});
		}
	}
};

const fetchBookingSearch = async () => {
	loaderPnr.value = true;
	var token = JSON.parse(localStorage.getItem("user")).token;
	await fetch(findPNRUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({
			filter: filter
		}),
	})
		.then((response) => response.json())
		.then((json) => {
			if (json.data) {
				if (json.data.status == true) {
					form.bookingList = json.data.bookingDetail;
				}
				else {
					$toast.open({
						message: json.data.message,
						type: "warning",
						duration: 1000 * 5,
						position: "bottom-left",
					});
				}

				loaderPnr.value = false;
			} else {
				let key = Object.keys(json);
				$toast.open({
					message: json[key],
					type: "warning",
					duration: 1000 * 5,
					position: "bottom-left",
				});
				loaderPnr.value = false;
			}

		})
		.catch(error => {
			$toast.open({
				message: error,
				type: "warning",
				duration: 1000 * 5,
				position: "bottom-left",
			});
			loaderPnr.value = false;
		});
}


const searchValueTypeChange = (newType) => {
	searchValueType.value = newType;
};

const bookingStatusTypeChange = (newType) => {
	bookingStatusType.value = newType;
	filter.status = newType;
};


const userTypeChange = (newType) => {
	userType.value = newType;
	filter.userType = newType;
};

const gdsAccessType = ref("VCEIG213P");
const gdsAccessTypeChange = (newType) => {
	gdsAccessType.value = newType;
	filter.gds = newType;
};
watch(searchValueTypeChangeToggler, (newValue) => {
	if (newValue) {
		bookingStatusChangeToggler.value = false;
		gdsTypeChangeToggler.value = false;
		userTypeChangeToggler.value = false;
	}
});

watch(bookingStatusChangeToggler, (newValue) => {
	if (newValue) {
		searchValueTypeChangeToggler.value = false;
		gdsTypeChangeToggler.value = false;
		userTypeChangeToggler.value = false;
	}
});
watch(userTypeChangeToggler, (newValue) => {
	if (newValue) {
		searchValueTypeChangeToggler.value = false;
		gdsTypeChangeToggler.value = false;
		bookingStatusChangeToggler.value = false;
	}
});

watch(gdsTypeChangeToggler, (newValue) => {
	if (newValue) {
		searchValueTypeChangeToggler.value = false;
		bookingStatusChangeToggler.value = false;
	}
});
const onClicksearchValueTypeChangeToggler = () => {
	if (searchValueTypeChangeToggler.value) {
		searchValueTypeChangeToggler.value = !searchValueTypeChangeToggler.value;
	}
};
const onClickbookingStatusChangeToggler = () => {
	if (bookingStatusChangeToggler.value) {
		bookingStatusChangeToggler.value = !bookingStatusChangeToggler.value;
	}
};
const onClickUserTypeChangeToggler = () => {
	if (userTypeChangeToggler.value) {
		userTypeChangeToggler.value = !userTypeChangeToggler.value;
	}
};
const onClickGdsChangeToggler = () => {
	if (gdsTypeChangeToggler.value) {
		gdsTypeChangeToggler.value = !gdsTypeChangeToggler.value;
	}
};
const visiblePages = computed(() => {
	const currentPageValue = currentPage.value;
	const lastPage = form.pagination.lastPage;
	const windowSize = 1; // Number of pages to show before and after the current page
	const ellipsisThreshold = windowSize; // Minimum number of pages required to show ellipsis

	if (lastPage <= ellipsisThreshold) {
		return Array.from({ length: lastPage }, (_, i) => i + 1);
	}

	const pages = [];

	// Add first page
	if (currentPageValue >= 4)
		pages.push(1);

	// Add pages before current page
	for (let i = Math.max(1, currentPageValue - windowSize - 1); i < currentPageValue; i++) {
		pages.push(i);
	}

	// Add current page
	pages.push(currentPageValue);

	// Add pages after current page
	for (let i = currentPageValue + 1; i <= Math.min(lastPage, currentPageValue + windowSize + 1); i++) {
		pages.push(i);
	}

	// Add last page
	if (currentPageValue <= lastPage - 3)
		pages.push(lastPage);

	if (pages[1] > 2) {
		pages.splice(1, 0, '...');
	}
	if (pages[pages.length - 2] < lastPage - 1) {
		pages.splice(pages.length - 1, 0, '...');
	}
	// console.log('last page:', lastPage)
	// console.log('pages:', pages)
	// console.log('current pages:', currentPageValue)

	return pages;
});

const permission = reactive({
	booking_search: false,
	office_status: "inactive",
	user_status: "inactive",
	pnr_report: false,
	booking_retrive: false,
	booking_retrive_flx: false,
	officeType: ""
});



const goToPreviousPage = () => {
	if (currentPage.value > 1) {
		currentPage.value--;

		// Added by Md. Zahidul Islam on 28 SEP 2023 as pagination broked. 
		var parameter = "page=" + currentPage.value + "&status=" + filter.status + "&field=" + filter.field + "&value=" + filter.value + "&userType=" + filter.userType;
		router.replace({ query: { parameter } });

		// Call booking with updated parameter and filter 
		fetchBooking(parameter);
	}
};
const onPageChange = (page) => {

	// Ignore ellipsis click
	if (page === "...") return;
	currentPage.value = page;

	// Added by Md. Zahidul Islam on 28 SEP 2023 as pagination broked. 
	var parameter = "page=" + currentPage.value + "&status=" + filter.status + "&field=" + filter.field + "&value=" + filter.value + "&userType=" + filter.userType;
	router.replace({ query: { parameter } });

	// Call booking with updated parameter and filter 
	fetchBooking(parameter);

}
const goToNextPage = () => {
	if (currentPage.value < form.pagination.lastPage) {
		currentPage.value++;

		// Added by Md. Zahidul Islam on 28 SEP 2023 as pagination broked. 
		var parameter = "page=" + currentPage.value + "&status=" + filter.status + "&field=" + filter.field + "&value=" + filter.value + "&userType=" + filter.userType;
		router.replace({ query: { parameter } });

		// Call booking with updated parameter and filter 
		fetchBooking(parameter);
	}
};

const permissionCheck = () => {
	var user = localStorage.getItem("user") ? localStorage.getItem("user") : "{}";
	user = JSON.parse(user);
	var userDetails = user?.userDetail?.permissions;
	permission.office_status = user?.userDetail?.officeStatus;
	permission.user_status = user?.userDetail?.userStatus;
	permission.officeType = user?.userDetail?.officeType.toLowerCase();
	permission.booking_search = userDetails?.book?.some(
		(item) => item.name === "BOOKING_SEARCH" && item.value === true
	);
	permission.booking_retrive = userDetails?.book?.some(
		(item) => item.name === "BOOKING_RETRIVE" && item.value === true
	);
	permission.booking_retrive_flx = userDetails?.book?.some(
		(item) => item.name === "BOOKING_RETRIVE_FLX" && item.value === true
	);
	permission.pnr_report = userDetails?.report?.some(
		(item) => item.name === "PNR_REPORT" && item.value === true
	);

};
const notPermitted = () => {
	$toast.open({
		message: "You are not permitted to view this",
		type: "warning",
		duration: 1000 * 5,
		position: "bottom-left",
	});
};
const checkOfficeType = () => {
	var user = localStorage.getItem("user") ? localStorage.getItem("user") : "{}";
	user = JSON.parse(user);
	var officeType = user?.userDetail?.officeType;
	if (officeType == 'Company' || officeType == 'System') {
		filter.userType = 'agent';
		userType.value = 'Agent';
	}

	else {
		filter.userType = 'user';
		userType.value = 'User';
	}
}
const assignFilterValue = (params) => {
	// Split the value into an array of query parameters
	const queryParams = params.split('&');
	// console.log(queryParams)
	for (var i = 0; i < queryParams.length; i++) {
		var param = queryParams[i].split('=');
		var key = param[0];
		var value = param[1];

		// Update the corresponding property in the filter object
		if (filter.hasOwnProperty(key)) {
			filter[key] = value;
		}
	}
	bookingStatusType.value = filter.status === 'any' ? 'Status(Any)' : filter.status;
	userType.value = filter.userType === 'any' ? 'Type(Any)' : filter.userType;
	searchValueType.value = filter.field;
	searchValue.value = decodeURIComponent(filter.value);
	gdsAccessType.value = filter.gds;
	currentPage.value = parseInt(filter.page);

	// console.log(currentPage.value);
}
onMounted(() => {
	window.addEventListener("click", () => {
		onClicksearchValueTypeChangeToggler();
		onClickbookingStatusChangeToggler();
		onClickGdsChangeToggler();
		onClickUserTypeChangeToggler();
	});
	checkOfficeType();
	permissionCheck();

	if (param.value) {
		fetchBooking(param.value);
		assignFilterValue(param.value);
	}
	else {
		var parameter = "page=" + currentPage.value + "&status=" + filter.status + "&field=" + filter.field + "&value=" + filter.value + "&userType=" + filter.userType;
		router.replace({ query: { parameter } });
		fetchBooking(parameter);
	}
});
onBeforeUnmount(() => {
	window.removeEventListener("click", () => {
		onClicksearchValueTypeChangeToggler();
		onClickbookingStatusChangeToggler();
		onClickGdsChangeToggler();
	});
});



// ================================
const currentPage = ref(1);
const $toast = useToast();

const user = ref({});
const searchValueTypeChangeToggler = ref(false);
const bookingStatusChangeToggler = ref(false);
const userTypeChangeToggler = ref(false);
const gdsTypeChangeToggler = ref(false);
const exception = ref('');
const filter = reactive({
	status: 'any',
	field: 'pnr',
	value: '',
	gds: '',
	userType: '',
	page: 1
});
const form = reactive({
	bookingList: [],
	pagination: {},
});

const pnrStore = usePnrStore();
const searchValue = ref("");
const tableRow = ref(0);
const loaderPnr = ref(false);
const searchValueType = ref("PNR");
const bookingStatusType = ref("Status(Any)");
const userType = ref("Status(Any)");
const route = useRoute();
const param = ref(route.query.parameter);
const loadSkeleton = ref(false)

// To view all table data in mobile device
const activeIndex = ref(null);
const toggleDetails = (index) => {
  if (activeIndex.value === index) {
    activeIndex.value = null;
  } else {
    activeIndex.value = index;
  }
};

const bookingService = useBooking();


const searchPNR = () => {
	loaderPnr.value = true;
	tableRow.value = -1;
	pnrStore.pnrCode = searchValue.value;
	filter.status = bookingStatusType.value === 'Status(Any)' ? 'any' : bookingStatusType.value.toLowerCase();
	filter.userType = userType.value === 'Type(Any)' ? 'any' : userType.value.toLowerCase();
	filter.field = searchValueType.value.toLowerCase();
	filter.value = encodeURIComponent(searchValue.value);
	filter.gds = gdsAccessType.value;
	currentPage.value = 1;

	// router.replace({ query: { parameter } });
	fetchBooking();
};


const fetchBooking = async () => {
	loadSkeleton.value = true;
	exception.value = '';
		const parameter = "page=" + currentPage.value + "&status=" + filter.status + "&field=" + filter.field + "&value=" + filter.value + "&userType=" + filter.userType;
    loaderPnr.value = true;
    await bookingService.fetchBookingList(parameter);
    const { loading, result, data, error } = bookingService;
    loaderPnr.value = loading.value;
		loadSkeleton.value = false;
    if (data) {
        form.bookingList = data.value.bookingList;
        form.pagination = data.value.paginate;
    }
};

function updateCurrentPageValue(currentPageValue) {
    currentPage.value = currentPageValue;
    fetchBooking();
}

onMounted(() => {
	window.addEventListener("click", () => {
		onClicksearchValueTypeChangeToggler();
		onClickbookingStatusChangeToggler();
		onClickGdsChangeToggler();
		onClickUserTypeChangeToggler();
	});
	checkOfficeType();
	permissionCheck();

	fetchBooking()

	// if (param.value) {
	// 	fetchBooking(param.value);
	// 	assignFilterValue(param.value);
	// }
	// else {
	// 	var parameter = "page=" + currentPage.value + "&status=" + filter.status + "&field=" + filter.field + "&value=" + filter.value + "&userType=" + filter.userType;
	// 	router.replace({ query: { parameter } });
	// 	fetchBooking(parameter);
	// }
});
onBeforeUnmount(() => {
	window.removeEventListener("click", () => {
		onClicksearchValueTypeChangeToggler();
		onClickbookingStatusChangeToggler();
		onClickGdsChangeToggler();
	});
});



// ================================
</script>

<style>
.truncate-text {
    width: 150px;
    /* Set a fixed width */
    white-space: nowrap;
    /* Prevent line breaks */
    overflow: hidden;
    /* Hide the overflow */
    text-overflow: ellipsis;
}
</style>