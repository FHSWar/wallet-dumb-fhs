<script setup>
import Tab from '../components/home/HomeFooterTab.vue'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const bill = () => { router.push({ name: 'Bill' }) }
const chart = () => { router.push({ name: 'Chart' }) }
const mine = () => { router.push({ name: 'Mine' }) }


const activeTab = ref('Bill')
const tabClick = (componentName) => (activeTab.value = componentName)
watch(() => activeTab.value, () => {
	switch (activeTab.value) {
		case 'Bill': bill(); break
		case 'Chart': chart(); break
		case 'Mine': mine(); break
	}
})
</script>

<template>
	<div class="bg-gray-50">
		<div class="flex-grow">
			<!-- vue3 新写法，现在不能直接在 keep-alive 里面写 router-view 了 -->
			<router-view v-slot="{ Component }">
				<keep-alive>
					<component :is="Component" />
				</keep-alive>
			</router-view>
		</div>
		<Tab class="fixed bottom-0" @click="tabClick" />
	</div>
</template>

<style scoped>
</style>
