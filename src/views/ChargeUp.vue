<script setup>
const types = ['衣','食','住','行']
</script>

<template>
	<div class="flex flex-wrap h-full">
		<div class="w-1/2 h-1/2" v-for="type in types" :key="type">{{type}}</div>
	</div>
</template>

<style></style>
