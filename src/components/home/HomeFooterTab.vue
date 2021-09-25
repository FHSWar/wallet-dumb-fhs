<script setup>
const tabButtons = [
	{name:'账单', icon: '#icon-wallet', component: 'Bill'},
	{name:'图表', icon: '#icon-tubiao-zhuzhuangtu', component: 'Chart'},
	{name:'我的', icon: '#icon-zhangdan_o', component: 'Mine'},
	{name:'滚动测试', icon: '#icon-zhangdan_o', component: 'Scroll'},
]
// 不传 click 的话，下面都 @click 会触发两次，第二次是原生事件。
const emit = defineEmits(['click'])
</script>

<template>
	<footer class="flex w-screen border-t-2 border-gray-300 border-opacity-50 bg-yellow-100">
		<div class="flex-1 flex flex-col mb-1 text-center active:bg-yellow-200 select-none"
			 v-for="button in tabButtons"
			 :key="button.name"
			 @click="emit('click', button.component)"
		>
			<svg class="icon m-auto my-1" aria-hidden="true">
				<use :xlink:href="button.icon"></use>
			</svg>
			{{button.name}}
		</div>
	</footer>
</template>
