<script setup>
// 引入放在顶部，vue 相关的放最下面，其他非项目内部文件次之，项目内部文件放在最上面
import Bubble from './Bubble.vue'
import Loading from './Loading.vue'
import BScroll from "@better-scroll/core"
import PullDown from "@better-scroll/pull-down"
import Pullup from "@better-scroll/pull-up"
import { ref, useAttrs } from 'vue'
// import { ref, useAttrs, watchEffect } from 'vue'
import { reactive } from "@vue/reactivity"
import { defineEmits, onBeforeMount, onMounted, onUpdated } from "@vue/runtime-core"


BScroll.use(PullDown)
BScroll.use(Pullup)

// 顺序依次是：emit -> props, attrs, slots -> reactive data -> computed data -> watch data -> life cycle hook -> methods
// emit 不写在 defineEmits 仍能 emit 且仍会在 attrs 里 （写在 defineEmits 里就不会出现在 attrs 中）
const emit = defineEmits() // ['pullingDown', 'pullingUp']
/*
WARNING
However, because props are reactive, you cannot use ES6 destructuring because it will remove props reactivity.
*/
const props = defineProps({
    beforePullDown: { type: Boolean, required: true }, // 下拉前，初始值应为 true
    loading: { type: Boolean, required: true }, // 加载中，初始值应为 true
    noMore: { type: Boolean, required: true }, // 没有更多数据
    wrapperHeight: { type: Number, default: window.innerHeight }, // 容器高度，默认撑满
})
const attrs = useAttrs()
const pullUpTipsShow = ref(false) // 用于控制底部的显隐
const emitPullingDown = ref(false)
const emitPullingUp = ref(false) // 与上划不同，下划动画一个条件可以搞定，因为不需要判断内容高度与容器高度的大小关系
const container = ref(null)
const scroll = ref(null)
const bubble = ref(null)
const content = ref(null)
let bscroll // 下面会让 bscroll 变成响应式对象
// watchEffect(()=>{console.log('loading changed', props.loading)})

onBeforeMount(() => {
    initScrollParam()
})
onMounted(() => {
    // console.log('what about $attrs', props)
    initScroll()
    initWrapper()
    bscroll.refresh()
})
onUpdated(() => {
    calcSize()
})

function initWrapper() {
    // 设置 wrapper 高度
    scroll.value.style.height = `${props.wrapperHeight}px`;
}
function initScroll() {
    // 初始化 better-scroll
    bscroll = reactive(new BScroll(scroll.value, {
        bounceTime: 800,
        probeType: 2,
        pullDownRefresh: emitPullingDown.value && { threshold: 70, stop: 56},
        pullUpLoad: emitPullingUp.value,
    }));
    if(emitPullingDown.value) { bscroll.on("pullingDown", () => { emit("pullingDown", bscroll) }) }
    if(emitPullingUp.value) { bscroll.on("pullingUp", () => { emit("pullingUp", bscroll) }) }
    bscroll.on("scroll", (pos) => {
        if(bubble.value) {
            // vm.$data 上面的值会被代理到 vm 上，vue2 和 vue3 都是这样
            bubble.value.y = pos.y - 67
        }
    });
}
// 计算 content 与 wrapper 的相对高度，content 比 wrapper 短的话就隐藏 pullUpTips
function calcSize() {
    // 判断 content 是否小于 wrapper， 是就隐藏底部上划提示语
    content.value.offsetHeight < props.wrapperHeight
        ? (pullUpTipsShow.value = false)
        : (pullUpTipsShow.value = true);
    // refresh 以使滚动正常工作
    bscroll.refresh()
}
// 判断是否需要向父组件发射事件
function initScrollParam() {
    console.log('onBeforeMount', Object.keys(attrs))
    const attrsKeys = Object.keys(attrs)
    switch(true) {
        case attrsKeys.includes('onPullingDown') && attrsKeys.includes('onPullingUp'):
            emitPullingDown.value = true
            emitPullingUp.value = true
            break
        case attrsKeys.includes('onPullingDown'):
            emitPullingDown.value = true
            break
        case attrsKeys.includes('onPullingUp'):
            emitPullingUp.value = true
            break
    }
}

</script>

<template>
  <div class="up-down__container" ref="container">
    <div class="up-down__wrapper" ref="scroll">
      <div>
        <!-- 下拉提示语：提示松手，提示加载中，提示加载完成， 一般只做数据的刷新 -->
        <slot name="pullDownTips" v-if="emitPullingDown" :state="{ loading, beforePullDown }">
          <div class="pulldown-tips">
            <div v-if="loading">
              <Loading />
            </div>
            <div v-else-if="beforePullDown">
              <Bubble ref="bubble" />
            </div>
            <div v-else>加载好了</div>
          </div>
        </slot>

        <!-- 用来放内容的 -->
        <div ref="content">
          <slot></slot>
        </div>

        <!-- 上划提示语，提示上划加载，提示加载中，提示没有更多数据， 一般用于数据的加载 -->
        <slot name="pullUpTips" v-if="emitPullingUp && pullUpTipsShow">
          <div class="pullup-tips">
            <div v-if="loading">
              <Loading />
            </div>
            <div v-else-if="noMore && !loading">没有更多数据了</div>
            <div v-else-if="!loading">上划加载数据</div>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<style>
/* .up-down__container {} */
.up-down__wrapper {
  position: relative;
  overflow: hidden;
}
.pulldown-tips {
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  transform: translateY(-100%) translateZ(0);
  color: #999;
}
.pullup-tips {
  display: flex;
  justify-content: center;
  height: 20px;
  font-size: 16px;
  color: #999;
  border-top: solid 1px rgba(99, 99, 99, 0.2);
}
</style>