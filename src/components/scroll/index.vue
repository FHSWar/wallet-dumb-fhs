<script setup>
// 引入放在顶层
import { reactive } from "@vue/reactivity"
import { onMounted, onUpdated } from "@vue/runtime-core"
import BScroll from "@better-scroll/core";
import PullDown from "@better-scroll/pull-down";
import Pullup from "@better-scroll/pull-up";
import { ref, watchEffect } from 'vue'

BScroll.use(PullDown);
BScroll.use(Pullup);

// 顺序依次是：emit -> props -> reactive data -> computed data -> watch data -> life cycle hook -> methods
const emit = defineEmits(['pullingDown', 'pullingUp'])
/*
WARNING
However, because props are reactive, you cannot use ES6 destructuring because it will remove props reactivity.
*/
const props = defineProps({
     // 下拉前，初始值应为 true
    beforePullDown: { type: Boolean, required: true },
    // 加载中，初始值应为 true
    loading: { type: Boolean, required: true },
    // 没有更多数据
    noMore: { type: Boolean, required: true },
    // 容器高度，默认撑满
    wrapperHeight: { type: Number, default: window.innerHeight },
})
// 用于控制底部的显隐
const pullUpTipsShow = ref(false)
const scroll = ref(null)
const content = ref(null)
let bscroll // 下面会让 bscroll 变成响应式对象
// watchEffect(()=>{console.log('loading changed', props.loading)})

onMounted(() => {
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
        pullDownRefresh: { threshold: 70, stop: 56},
        pullUpLoad: true,
    }));
    bscroll.on("pullingDown", () => {emit("pullingDown", bscroll)});
    bscroll.on("pullingUp", () => {emit("pullingUp", bscroll)});
    bscroll.on("scroll", () => {});
}
// 计算 content 与 wrapper 的相对高度，content 比 wrapper 短的话就隐藏 pullUpTips
function calcSize() {
    // 判断 content 是否小于 wrapper， 是就隐藏底部上划提示语
    content.value.offsetHeight < props.wrapperHeight
    ? (pullUpTipsShow.value = false)
    : (pullUpTipsShow.value = true);
    // refresh 以使滚动正常工作
    bscroll.refresh();
}

</script>

<template>
  <div class="up-down__container" ref="container">
    <div class="up-down__wrapper" ref="scroll">
      <div>
        <!-- 下拉提示语：提示松手，提示加载中，提示加载完成， 一般只做数据的刷新 -->
        <slot name="pullDownTips" :state="{ loading, beforePullDown }">
          <div class="pulldown-tips">
            <div v-if="loading">加载中</div>
            <div v-else-if="beforePullDown">松开就刷新</div>
            <div v-else>加载好了</div>
          </div>
        </slot>

        <!-- 用来放内容的 -->
        <div ref="content">
          <slot></slot>
        </div>

        <!-- 上划提示语，提示上划加载，提示加载中，提示没有更多数据， 一般用于数据的加载 -->
        <slot name="pullUpTips" v-if="pullUpTipsShow">
          <div class="pullup-tips">
            <div v-if="loading">加载中</div>
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
  /* height: 667px; */
  position: relative;
  overflow: hidden;
}
.pulldown-tips {
  position: absolute;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  transform: translateY(-100%) translateZ(0);
  text-align: center;
  color: #999;
}
.pullup-tips {
  text-align: center;
  color: #999;
  border-top: solid 1px rgba(99, 99, 99, 0.3);
}
</style>