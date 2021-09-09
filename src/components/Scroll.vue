<template>
	<div class="up-down__container" ref="container">
		<div class="up-down__wrapper" ref="scroll">
			<div>
				<!-- 下拉提示语：提示松手，提示加载中，提示加载完成， 一般只做数据的刷新 -->
				<slot name="pullDownTips" :state="{ loading, beforePullDown }">
					<div class="pulldown-tips">
						<div v-if="loading">加载中</div>
						<div v-else-if="beforePullDown">释放立即刷新</div>
						<div v-else>加载成功</div>
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

<script>
import BScroll from "@better-scroll/core";
import PullDown from "@better-scroll/pull-down";
import PullUp from "@better-scroll/pull-up";

BScroll.use(PullDown);
BScroll.use(PullUp);

const TIME_BOUNCE = 800; // 默认值就是如此
const THRESHOLD = 70;
const STOP = 56;

export default {
	name: "upDown",
	props: {
		// 下拉前
		beforePullDown: {
			// 初始值应为 true
			type: Boolean,
			required: true,
		},
		// 加载中
		loading: {
			// 初始值应为 true
			type: Boolean,
			required: true,
		},
		// 没有更多数据
		noMore: {
			type: Boolean,
			required: true,
		},
		// 是否发送滚动信息, 发的话性能稍微差些
		probeType: {
			type: Number,
			default: 0,
		},
		// 容器高度，默认撑满
		wrapperHeight: {
			type: Number,
			default: window.innerHeight,
		},
	},
	data() {
		return {
			// 用于控制底部的显隐
			pullUpTipsShow: false,
		};
	},
	mounted() {
		this.initScroll();
		this.initWrapper();
	},
	updated() {
		this.calcSize();
	},
	methods: {
		// 初始化容器，wrapper 高度和底部提示显隐
		initWrapper() {
			// 设置 wrapper 高度
			this.$refs.scroll.style.height = `${this.wrapperHeight}px`;
		},
		// 初始化 better-scroll
		initScroll() {
			const bscroll = new BScroll(this.$refs.scroll, {
				bounceTime: TIME_BOUNCE,
				probeType: this.probeType,
				pullDownRefresh: {
					threshold: THRESHOLD,
					stop: STOP,
				},
				pullUpLoad: true,
			});
			this.bscroll = bscroll;
			bscroll.on("pullingDown", () => {
				this.$emit("pullingDown", bscroll);
			});
			bscroll.on("pullingUp", () => {
				this.$emit("pullingUp", bscroll);
			});
			// bscroll.on("scroll", (pos)=>{console.log("scroll", pos)});
			// bscroll.on("scrollEnd", () => {console.log("scrollEnd")});
			// bscroll.on("enterThreshold", () => {console.log("阶段一阈值触发")});
			// bscroll.on("leaveThreshold", () => {console.log("阶段二阈值触发")})
			bscroll.openPullUp({
				threshold: 100,
			});
		},
		// 计算 content 与 wrapper 的相对高度，content 比 wrapper 短的话就隐藏 pullUpTips
		calcSize() {
			// 判断 content 是否小于 wrapper， 是就隐藏底部上划提示语
			this.$refs.content.offsetHeight < this.wrapperHeight
				? (this.pullUpTipsShow = false)
				: (this.pullUpTipsShow = true);
			// refresh 以使滚动正常工作
			this.bscroll.refresh();
		},
	},
};
</script>

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
