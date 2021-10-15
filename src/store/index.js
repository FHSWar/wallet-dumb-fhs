// 组件维护 vuex，实现全局实时局部刷新，vuex 维护 localStorage，实现数据持久化，存时 JSON.stringify()，取时 JSON.parse()
import { createStore } from 'vuex'

// 如果没有 entities 和 totalCostMonth, recordedDays 属性就初始化个，按道理一个用户只应该初始化一次
if (localStorage.entities === undefined) localStorage.entities = JSON.stringify({})
if (localStorage.totalCostMonth === undefined) localStorage.totalCostMonth = JSON.stringify({})
if (localStorage.recordedDays === undefined) localStorage.recordedDays = JSON.stringify([])

const store = createStore({
    state() {
        return {
            // 各单日总额和各单词消费明细
            entities: localStorage.entities,
            // 有消费明细的日期们
            recordedDays: localStorage.recordedDays,
            // 单月消费总额
            totalCostMonth: localStorage.totalCostMonth
        }
    },
    getters: {
        getEntities(state) {
            return JSON.parse(state.entities)
        },
        getRecordedDays(state) {
            return JSON.parse(state.recordedDays)
        },
        getTotalCostMonth(state) {
            return JSON.parse(state.totalCostMonth)
        }
    },
    mutations: {
        setEntities(state, { newEntites }) {
            state.entities = newEntites
            localStorage.entities = newEntites
        },
        setRecordedDays(state, { newRecordedDays }) {
            state.recordedDays = newRecordedDays
            localStorage.recordedDays = newRecordedDays
        },
        setTotalCostMonth(state, { newTotalCostMonth }) {
            state.totalCostMonth = newTotalCostMonth
            localStorage.totalCostMonth = newTotalCostMonth
        }
    }
})

export default store