<script setup>
import Bill from './home/Bill.vue'
import Chart from './home/Chart.vue'
import Mine from './home/Mine.vue'
import Scroll from './home/Scroll.vue'
import Tab from '../components/home/HomeFooterTab.vue'
import {computed, ref} from 'vue'

const activeTab = ref('Bill')
const tabClick = (componentName) => activeTab.value = componentName
const component = computed(() => {
	let component
	switch (activeTab.value){
		case 'Bill': component = Bill
			break
		case 'Chart': component = Chart
			break
		case 'Mine': component = Mine
			break
		case 'Scroll': component = Scroll
			break
	}
	return component
})
</script>

<template>
	<div class="flex flex-col bg-gray-50 h-screen overflow-hidden">
		<keep-alive>
			<component
				class="flex-1 overflow-hidden"
				:is="component"
			/>
		</keep-alive>
		<Tab @click="tabClick"/>
	</div>
</template>

<style scoped>
</style>
