<script setup>
import capsulatedStore from '../../utils/store.vue'
import formatDay from '../../utils/formatDay.vue'
import { computed, reactive, ref } from "vue";
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'

const { totalCostMonth } = capsulatedStore.setup()
const { formattedMonth } = formatDay.setup()

const currentDate = ref(new Date())
const minDate = new Date(2020, 0, 1)
const maxDate = new Date(2025, 10, 1)

const datePickerShow = ref(false)

const formattedDate = computed(() => dayjs(currentDate.value).format().slice(0, 10))
const pickDate = () => { console.log('拿到了', formattedDate) }
const cancelPickDate = () => { datePickerShow.value = false }
const portions = reactive([
	{ type: '衣', percentage: '15%', color: 'border-red-500' },
	{ type: '食', percentage: '30%', color: 'border-yellow-500' },
	{ type: '住', percentage: '50%', color: 'border-blue-500' },
	{ type: '行', percentage: '5%', color: 'border-green-500' },
])

const router = useRouter()
const chargeUp = () => { router.push('ChargeUp') }
</script>

<template>
	<div id="bill-upper" class="flex flex-col h-28 bg-yellow-100 overflow-hidden">
		<main class="flex-1 flex justify-center mt-2 px-4">
			<div @click="datePickerShow = !datePickerShow">
				{{ formattedDate }}
				<span
					class="inline-block w-4 h-4 border-8 border-transparent relative"
					:class="[datePickerShow ? 'bottom-0.5' : 'top-1.5']"
					:style="datePickerShow
					? { borderBottomColor: 'rgb(252, 211, 77)' }
					: { borderTopColor: 'rgb(252, 211, 77)' }"
				></span>
			</div>
			<!-- 别处计算用的多， 于是把调用 .toFixed(2) 放到这里 -->
			<div class="flex-1 text-right">月度总额：￥{{ 
					totalCostMonth[formattedMonth] === undefined
						? '0.00'
						: totalCostMonth[formattedMonth].toFixed(2)
				}}
			</div><!--.toFixed(2)-->
		</main>
		<footer class="flex-1 flex mb-4">
			<div
				class="flex-1 self-center mx-2 border-b-8 py-2 text-center"
				v-for="portion in portions"
				:class="{ [portion.color]: true }"
				:key="portion.type"
			>{{ portion.type }}：{{ portion.percentage }}</div>
		</footer>
	</div>
	<button
		class="fixed bottom-20 right-5 flex items-center justify-center outline-none select-none w-10 h-10 rounded-full bg-yellow-400 text-white"
		@click="chargeUp"
	>记</button>
	<div class="fixed bottom-12 w-screen" v-show="datePickerShow">
		<van-datetime-picker
			v-model="currentDate"
			type="date"
			title="Choose Date"
			:min-date="minDate"
			:max-date="maxDate"
			@confirm="pickDate"
			@cancel="cancelPickDate"
		/>
	</div>
</template>
