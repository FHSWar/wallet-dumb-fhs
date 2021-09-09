<script setup>

</script>

<template>
	<div>
<!--	这个一整个去迭代，一天一大块	-->
		<div>
			<header class="flex justify-between px-1 bg-yellow-50 text-sm">
				<div>2021年9月9日</div>
				<div>支出：40.00</div>
			</header>
			<div>
				<div class="h-8 border-b-2 border-yellow-100 bg-gray-50"
					 v-for="i in 50"
					 :key="i"
				>{{i}}</div>
			</div>
		</div>
	</div>
</template>
