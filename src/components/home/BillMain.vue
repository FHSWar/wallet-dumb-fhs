<script setup>
import capsulatedStore from '../../utils/store.vue'
import formatDay from '../../utils/formatDay.vue'

const {
	entities,
	recordedDays,
	totalCostMonth,
	setEntities,
	setTotalCostMonth,
	setRecordedDays
} = capsulatedStore.setup()
const { formattedMonth } = formatDay.setup()


// `defineProps` is a compiler macro and no longer needs to be imported.
defineProps({ data: { type: Object, default: () => { } } })

// dayIndex 是日期，entityIndex 被选中日被选中条目的下标
function delItem(dayIndex, entityIndex) {
	/**
	 * 1. 找到对应日期
	 * 2. 根据对应日期找到 日期Arr 对应 entity，splice 掉，如果长度为零则对应 recordedDays 也 splice 掉
	 * 3. 维护当月的 total 值，再维护当年的 total 值，重新遍历加总太夸张了，在原有值上减个就好了
	 */
	const day = recordedDays.value[dayIndex]
	const deletedEntity = entities.value[`${day}Arr`].splice(entityIndex, 1)[0]
	// 如果该日条目空了，标题删掉，当日的总花销也删掉
	if (entities.value[`${day}Arr`].length === 0) {
		recordedDays.value.splice(dayIndex, 1)
		setRecordedDays(recordedDays.value)
		delete entities.value[`${day}Total`]
		// 还有就剩维护下当天总额
	} else {
		entities.value[`${day}Total`] -= Number(deletedEntity.amount)
	}
	// 删除必然是要维护总额的
	totalCostMonth.value[formattedMonth] =
		Number(totalCostMonth.value[formattedMonth]) - Number(deletedEntity.amount)
	setTotalCostMonth(totalCostMonth.value)
	setEntities(entities.value)
}
function editItem() { console.log('editItem') }

</script>

<template>
	<!--	对应 Bill 组件根元素的 flex	-->
	<div class="flex-1 overflow-scroll bg-gray-100">
		<!--	这个一整个去迭代，一天一大块	-->
		<div v-for="(day, dayIndex) in data.recordedDays" :key="dayIndex">
			<header class="flex justify-between px-2 bg-yellow-50 text-gray-400">
				<div>{{ day }}</div>
				<!-- 别处计算用的多， 于是把调用 .toFixed(2) 放到这里 -->
				<div class="text-gray-600">单日支出：¥ {{ data.entities[`${day}Total`].toFixed(2) }}</div>
			</header>
			<div>
				<div
					class="h-8 border-l-4 pl-2 text-sm text-gray-500 leading-8 bg-gray-50"
					v-for="(entity, entityIndex) in data.entities[`${day}Arr`]"
					:key="entityIndex"
					:class="{
						[entity.type === '衣'
							? 'border-red-500'
							: entity.type === '食'
								? 'border-yellow-500'
								: entity.type === '住'
									? 'border-blue-500'
									: entity.type === '行'
										? 'border-green-500'
										: null
						]: true
					}"
				>
					<van-swipe-cell class="h-8">
						<!-- <van-cell :border="false" title="Cell" value="Cell Content" /> -->
						<span>详情：{{ entity.detail }}</span>
						<span class="float-right">单笔支出：¥ {{ entity.amount }}&nbsp;&nbsp;</span>
						<template #right>
							<!-- 包一层确实方便，不抱按钮的文字调不到居中 -->
							<div class="flex items-center">
								<van-button
									square
									type="danger"
									text="Delete"
									size="small"
									@click="delItem(dayIndex, entityIndex)"
								/>
								<van-button square type="primary" text="Edit" size="small" @click="editItem" />
							</div>
						</template>
					</van-swipe-cell>
				</div>
			</div>
		</div>
	</div>
</template>
