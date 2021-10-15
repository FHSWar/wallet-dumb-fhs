<script setup>
import capsulatedStore from '../utils/store.vue'
import formatDay from '../utils/formatDay.vue'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Toast } from 'vant'
import dayjs from 'dayjs'

const {
	entities,
	recordedDays,
	totalCostMonth,
	setEntities,
	setTotalCostMonth,
	setRecordedDays
} = capsulatedStore.setup()
const { formattedMonth } = formatDay.setup()


// 非响应式数据
const types = ['衣', '食', '住', '行']
const inputs = [
	{ title: '详情：', placeholder: '购买的物件' },
	{ title: '支出：', placeholder: '花费的金额' }
]
const formattedDate = dayjs(new Date()).format('YYYY年MM月DD日')

// 响应式数据
// entity 用于收集一个条目的金额和详情，amount 是金额，detail 是详情
const entity = reactive([])

// Bill
const router = useRouter()
const bill = () => { router.push({ name: 'Bill' }) }

// 单比开销（），月开销，维护总开销（totalCost）
function saveToLocal(type) {
	/* 维护要存入 localStorage 中的 entity */
	const [detail, rawAmount] = entity
	// 如果没有传 detail 进来或者 detail 不是数字要提示
	if (rawAmount === undefined) { Toast({ message: '请输入金额', position: 'bottom' }); return }
	// 这里用双等确实合适
	else if (rawAmount != Number(rawAmount)) { Toast({ message: '请输入数字', position: 'bottom' }); return }
	// 处理一下 rawAmount，处理为两位小数的形式
	const amount = Number(rawAmount).toFixed(2)

	// const recordedDays = JSON.parse(localStorage.recordedDays)
	// 每天一个对象，这样比较快, 当天第一个条目得初始化，然后维护个
	if (entities.value[`${formattedDate}Arr`] === undefined) {
		entities.value[`${formattedDate}Arr`] = []
		entities.value[`${formattedDate}Total`] = 0
	}
	// 每天花销明细和每天花销的和维护个，然后改 vuex 对应 state
	entities.value[`${formattedDate}Arr`].push({ amount: amount, detail, type })
	entities.value[`${formattedDate}Total`] = Number(entities.value[`${formattedDate}Total`]) + Number(amount)
	setEntities(entities.value)
	// 哪些天有数据维护个
	recordedDays.value.includes(formattedDate) ? null : recordedDays.value.push(formattedDate)
	setRecordedDays(recordedDays.value)
	// localStorage.entities.value = JSON.stringify(entities.value)
	// localStorage.recordedDays = JSON.stringify(recordedDays)

	// 当月总额算一下
	if(totalCostMonth.value[formattedMonth] === undefined) totalCostMonth.value[formattedMonth] = 0
	totalCostMonth.value[formattedMonth] = Number(totalCostMonth.value[formattedMonth]) + Number(amount)
	setTotalCostMonth(totalCostMonth.value, formattedMonth)

	// entity 存到 local 后要清空，防止数据污染
	entity.length = 0
	bill()
}
</script>

<template>
	<div class="h-screen flex flex-wrap items-end">
		<!-- 四个按钮 -->
		<div
			class="relative flex justify-center items-center w-1/2 h-2/5 border-2 border-yellow-200 text-5xl text-yellow-500 bg-yellow-100"
			v-for="type in types"
			:key="type"
			@click="saveToLocal(type)"
		>{{ type }}</div>

		<!-- 两个输入 -->
		<div class="w-full h-1/5">
			<div
				class="inline-block w-1/2 h-full px-1.5"
				v-for="(input, index) in inputs"
				:key="input.title"
			>
				<span class="inline-block h-1/5 my-1.5">{{ input.title }}</span>
				<textarea
					class="resize-none rounded-sm h-2/3 py-2 bg-gray-100"
					rows="3"
					style="text-indent: 1rem;"
					type="text"
					:placeholder="input.placeholder"
					v-model="entity[index]"
				/>
			</div>
		</div>
	</div>
</template>