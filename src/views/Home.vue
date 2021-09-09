<script setup>
import Bill from './home/Bill.vue'
import Chart from './home/Chart.vue'
import Mine from './home/Mine.vue'
import Tab from '../components/home/HomeFooterTab.vue'
import { ref } from 'vue'

const component = ref('Bill')
function tabClick(componentName){
	component.value = componentName
}
</script>

<template>
	<div class="flex flex-col w-screen h-screen bg-gray-100">
		<div class="flex-1">
			<Bill v-show="component === 'Bill'"/>
			<Chart v-show="component === 'Chart'"/>
			<Mine v-show="component === 'Mine'"/>
		</div>
		<Tab @click="tabClick"/>
	</div>
</template>

<style scoped>
</style>
