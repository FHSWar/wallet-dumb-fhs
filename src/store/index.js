// 组件维护 vuex，实现全局实时局部刷新，vuex 维护 localStorage，实现数据持久化，存时 JSON.stringify()，取时 JSON.parse()
import { createStore } from 'vuex'

// 如果没有 entities 和 totalCost, recordedDays 属性就初始化个，按道理一个用户只应该初始化一次
if (localStorage.entities === undefined) localStorage.entities = JSON.stringify({})
if (localStorage.totalCost === undefined) localStorage.totalCost = 0
if (localStorage.recordedDays === undefined) localStorage.recordedDays = JSON.stringify([])

const store = createStore({
    state() {
        return {
            // 各单日总额和各单词消费明细
            entities: localStorage.entities,
            // 有消费明细的日期们
            recordedDays: localStorage.recordedDays,
            // 单月消费总额
            totalCost: localStorage.totalCost
        }
    },
    getters: {
        getEntities(state) {
            return JSON.parse(state.entities)
        },
        getRecordedDays(state) {
            return JSON.parse(state.recordedDays)
        },
        getTotalCost(state) {
            return Number(state.totalCost)
        },
    },
    mutations: {
        setEntities(state, { newEntites }) {
            state.entities = newEntites
            localStorage.entities = newEntites
        },
        setRecordedDays(state, {newRecordedDays}) {
            state.recordedDays = newRecordedDays
            localStorage.recordedDays = newRecordedDays
        },
        setTotalCost(state, { newTotalCost }) {
            state.totalCost = newTotalCost
            localStorage.totalCost = newTotalCost
        },
    }
})

export default store