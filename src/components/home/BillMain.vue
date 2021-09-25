<!-- <script setup>

</script> -->

<template>
<!--	对应 Bill 组件根元素的 flex	-->
	<div class="flex-1 overflow-scroll bg-gray-100">
<!--	这个一整个去迭代，一天一大块	-->
		<div v-for="i in 5" :key="i">
			<header class="flex justify-between px-1 bg-yellow-50 text-sm">
				<div>2021年9月9日</div>
				<div>支出：40.00</div>
			</header>
			<div>
				<div class="h-8 border-b-2 border-yellow-100 bg-gray-50"
					 v-for="u in 5"
					 :key="u"
				>{{i * u}}</div>
			</div>
		</div>
	</div>
</template>
