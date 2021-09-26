<template>
  <UpDown
    :beforePullDown="beforePullDown"
    :loading="scrollLoading"
    :noMore="noMore"
    :wrapper-height="500"
  >
  <!-- 
    @pullingDown="pullingDownHandler"
    @pullingUp="pullingUpHandler" 
  -->
    <!-- 内容的主体 -->
    <div class="up-down__content">
      <ul style="list-style: none">
        <li>13579，顶部</li>
        <li v-for="i in 100" :key="i">12345</li>
        <li>97531，底部</li>
      </ul>
    </div>
  </UpDown>
</template>

<script>
import UpDown from "../../components/scroll/index.vue";

const TIME_BOUNCE = 800;
let STEP = 0;

export default {
  name: "simpleScroll",
  components: {
    UpDown,
  },
  data() {
    return {
      // 下拉前后的状态
      beforePullDown: true,
      // 请求和处理接口数据前后为 false，处理过程中为 true
      scrollLoading: false,
      // 没有数据时置为 true
      noMore: false,
    };
  },
  methods: {
    pullingDownHandler($scroller) {
      this.beforePullDown = false;
      this.scrollLoading = true;
      // 用定时模拟加载数据的耗时
      new Promise((res) => {
        setTimeout(() => {
          $scroller.finishPullDown();
          // DOM 结构发生变化的时候务必要调用确保滚动的效果正常。
          $scroller.refresh();
          this.scrollLoading = false;
          res();
        }, 2000);
      }).then(() => {
        // 回弹结束后要重置 this.beforePullingDown 为 true
        setTimeout(() => (this.beforePullDown = true), TIME_BOUNCE);
      });
    },
    pullingUpHandler($scroller) {
      STEP++;
      this.scrollLoading = true;
      // 模拟请求数据
      setTimeout(() => {
        if (STEP <= 3) {
          console.log("上划插入数据完成", STEP);
        } else {
          console.log("模拟服务端不再返回数据");
          this.noMore = true;
        }
        this.scrollLoading = false;
        $scroller.finishPullUp();
        $scroller.refresh();
      }, 2000);
    },
  },
};
</script>
