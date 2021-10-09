<script setup>
import BillUpper from '../../components/home/BillUpper.vue'
import BillMain from '../../components/home/BillMain.vue'

import { onMounted } from 'vue'
onMounted(()=>{
	console.log('这不得试试？')
})

</script>

<template>
	<div class="flex flex-col relative">
		<BillUpper />
		<BillMain />
	</div>
</template>
