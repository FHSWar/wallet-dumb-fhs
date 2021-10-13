<script setup>
import BillUpper from '../../components/home/BillUpper.vue'
import BillMain from '../../components/home/BillMain.vue'
import { computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'

const data = ref({})
onMounted(() => { getLocalData() })

const store = useStore()

const entities = computed(() => store.getters.getEntities)
const recordedDays = computed(() => store.getters.getRecordedDays)
// 删除条目 entities 会变化，这里监听 entities 的变化，给子组件重新赋值 （recordedDays 可不一定会变化嗷，但真的可以监听到，vue3 牛逼）
watch(entities, () => { getLocalData() })

function getLocalData() { data.value = { entities: entities.value, recordedDays: recordedDays.value } }
</script>

<template>
	<div class="flex flex-col relative">
		<BillUpper />
		<BillMain :data="data" />
	</div>
</template>
