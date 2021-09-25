<script setup>
import {computed, reactive, ref} from "vue";
import {useRouter} from 'vue-router'
import dayjs from 'dayjs'

const currentDate = ref(new Date())
const minDate = new Date(2020, 0, 1)
const maxDate = new Date(2025, 10, 1)

const datePickerShow = ref(false)
const formattedDate = computed(()=> dayjs(currentDate.value).format().slice(0, 10))
const pickDate = () => {
	console.log('拿到了', formattedDate)
}
const cancelPickDate = () => {
	datePickerShow.value = false
	console.log('可以啊小伙子')
}
const portions = reactive([
	{type: '衣', percentage: '15%'},
	{type: '食', percentage: '30%'},
	{type: '住', percentage: '50%'},
	{type: '行', percentage: '5%'},
])

const router = useRouter()
const chargeUp = () => {
	router.push('ChargeUp')
}

</script>

<template>
	<div id="bill-upper" class="flex flex-col h-48 bg-yellow-100 overflow-hidden">
		<header class="flex-1 flex justify-center items-center  px-10">
			<div @click="datePickerShow = !datePickerShow">
				{{formattedDate}}
				<span
					class="inline-block w-4 h-4 border-8 border-transparent relative"
					:class="[datePickerShow ? 'bottom-0.5' : 'top-1.5']"
					:style="datePickerShow
						? {borderBottomColor: 'rgb(252, 211, 77)'}
						: {borderTopColor: 'rgb(252, 211, 77)'}"
				></span>
			</div>
			<div class="flex-1 text-right">花销总额：￥8888</div>
		</header>
		<footer class="flex-1 flex">
			<div class="flex-1 text-center self-center" v-for="portion in portions" :key="portion.type">
				{{portion.type}}-{{portion.percentage}}
			</div>
		</footer>
	</div>
	<button
		class="absolute bottom-7 right-5 flex items-center justify-center
			outline-none select-none w-10 h-10 rounded-full bg-yellow-400 text-white"
		@click="chargeUp"
	>记</button>
	<div class="fixed bottom-0 w-screen" v-show="datePickerShow">
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
