<script setup>
import BillUpper from '../../components/home/BillUpper.vue'
import BillMain from '../../components/home/BillMain.vue'
</script>

<template>
	<div class="flex flex-col">
		<BillUpper/>
		<div class="flex-1 overflow-scroll bg-gray-100">
			<BillMain />
		</div>
	</div>
</template>
