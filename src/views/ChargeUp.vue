<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'
import { Toast } from 'vant'

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
function saveToLocal(type) {
	const [detail, amount] = entity

	// 如果没有 entities 数组就初始化个，按道理一个用户只应该初始化一次
	if (localStorage.entities === undefined) localStorage.entities = JSON.stringify({})

	/* 维护要存入 localStorage 中的 entity */
	// 如果没有传 detail 进来或者 detail 不是数字要提示
	if (amount === undefined) { Toast({ message: '请输入金额', position: 'bottom' }); return }
	// 这里用双等确实合适
	else if (amount != Number(amount)) { Toast({ message: '请输入数字', position: 'bottom' }); return }

	// localStorage 只能存字符串，这里从字符串里取出来开始操作，搞完再序列化存回 localStorage
	const entities = JSON.parse(localStorage.entities)
	// 每天一个对象，这样比较快, 当天第一个条目得初始化
	if (entities[formattedDate] === undefined) entities[formattedDate] = []
	entities[formattedDate].push({ amount, detail, type })
	localStorage.entities = JSON.stringify(entities)

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