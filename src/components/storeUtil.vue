<script>
// 两行 import 和对应属性的 getter 和 setter 在每个文件都写会造成相当多的代码容易，于是抽取为组件
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
    setup() {
        // vuex 数据	
        const store = useStore()
        const entities = computed(() => store.getters.getEntities)
        const recordedDays = computed(() => store.getters.getRecordedDays)
        const totalCost = computed(() => store.getters.getTotalCost)
        function setEntities(newEntites) { store.commit('setEntities', { newEntites: JSON.stringify(newEntites) }) }
        function setTotalCost(newTotalCost) { store.commit('setTotalCost', { newTotalCost }) }
        function setRecordedDays(newRecordedDays) {
            store.commit('setRecordedDays', { newRecordedDays: JSON.stringify(newRecordedDays) })
        }

        return {
            entities,
            recordedDays,
            totalCost,
            setEntities,
            setTotalCost,
            setRecordedDays
        }
    }
}
</script>