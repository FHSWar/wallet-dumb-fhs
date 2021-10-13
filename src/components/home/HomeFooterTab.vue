<script setup>
const tabButtons = [
	{name:'账单', component: 'Bill'},
	{name:'图表', component: 'Chart'},
	{name:'我的', component: 'Mine'},
]
// 不传 click 的话，下面都 @click 会触发两次，第二次是原生事件。
const emit = defineEmits(['click'])
</script>

<template>
	<footer 
		class="flex w-screen border-t-2 border-gray-300 border-opacity-50 h-12 bg-yellow-100 items-center"
	>
		<div class="flex-1 flex flex-col mb-1  text-xl text-center text-gray-600 active:bg-yellow-200 select-none border-r-2 border-gray-200"
			 v-for="button in tabButtons"
			 :key="button.name"
			 @click="emit('click', button.component)"
		>
			{{button.name}}
		</div>
	</footer>
</template>
