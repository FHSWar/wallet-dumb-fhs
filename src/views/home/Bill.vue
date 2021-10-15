<script setup>
import capsulatedStore from '../../components/storeUtil.vue'
import BillUpper from '../../components/home/BillUpper.vue'
import BillMain from '../../components/home/BillMain.vue'
import { onMounted, ref, watch } from 'vue'

const { entities, recordedDays } = capsulatedStore.setup()

const active = ref(0);
const data = ref({})
onMounted(() => { getLocalData() })

// 删除条目 entities 会变化，这里监听 entities 的变化，给子组件重新赋值 （recordedDays 可不一定会变化嗷，但真的可以监听到，vue3 牛逼）
watch(entities, () => { getLocalData() })

function getLocalData() { data.value = { entities: entities.value, recordedDays: recordedDays.value } }
</script>

<template>
	<div class="bill-wrapper flex flex-col relative">
		<van-tabs v-model:active="active">
			<van-tab title="月">
				<BillUpper />
				<BillMain :data="data" />
			</van-tab>
			<van-tab title="季">季季</van-tab>
			<van-tab title="年">年年</van-tab>
		</van-tabs>
	</div>
</template>

<style>
/* 改 UI 框架的样式就不能用 scoped 了 */
.bill-wrapper .van-tabs__line {
	background-color: #FBBF24;
}
.bill-wrapper .van-tab {
	background-color: #FEF3C7;
}
</style>