<template>
  <div class="cube-loading">
    <span class="cube-loading-spinners" :style="style">
      <i class="cube-loading-spinner" v-for="item in balde"></i>
    </span>
  </div>
</template>
<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'cube-loading'

  export default {
    name: COMPONENT_NAME,
    data() {
      return {
        balde: 12
      }
    },
    props: {
      size: {
        type: Number
      }
    },
    computed: {
      style() {
        if (!this.size) {
          return
        }
        const value = `${this.size}px`
        return {
          width: value,
          height: value
        }
      }
    }
  }
</script>
<style>
.cube-loading {
	font-size: 16px;
}

.cube-loading-spinners {
	position: relative;
	display: block;
	width: 1em;
	height: 1em;
}

.cube-loading-spinner {
	position: absolute;
	left: 44.5%;
	top: 37%;
	width: 2PX;
	height: 25%;
	border-radius: 50%/20%;
	opacity: 0.25;
	background-color: currentColor;
	animation: spinner-fade 1s linear infinite;
}

.cube-loading-spinner:nth-child(1) {
	animation-delay: 0s;
	transform: rotate(-150deg) translateY(-150%);
}

.cube-loading-spinner:nth-child(2) {
	animation-delay: 0.083333333333333s;
	transform: rotate(-120deg) translateY(-150%);
}

.cube-loading-spinner:nth-child(3) {
	animation-delay: 0.166666666666667s;
	transform: rotate(-90deg) translateY(-150%);
}

.cube-loading-spinner:nth-child(4) {
	animation-delay: 0.25s;
	transform: rotate(-60deg) translateY(-150%);
}

.cube-loading-spinner:nth-child(5) {
	animation-delay: 0.333333333333333s;
	transform: rotate(-30deg) translateY(-150%);
}

.cube-loading-spinner:nth-child(6) {
	animation-delay: 0.416666666666667s;
	transform: rotate(0deg) translateY(-150%);
}

.cube-loading-spinner:nth-child(7) {
	animation-delay: 0.5s;
	transform: rotate(30deg) translateY(-150%);
}

.cube-loading-spinner:nth-child(8) {
	animation-delay: 0.583333333333333s;
	transform: rotate(60deg) translateY(-150%);
}

.cube-loading-spinner:nth-child(9) {
	animation-delay: 0.666666666666667s;
	transform: rotate(90deg) translateY(-150%);
}

.cube-loading-spinner:nth-child(10) {
	animation-delay: 0.75s;
	transform: rotate(120deg) translateY(-150%);
}

.cube-loading-spinner:nth-child(11) {
	animation-delay: 0.833333333333333s;
	transform: rotate(150deg) translateY(-150%);
}

.cube-loading-spinner:nth-child(12) {
	animation-delay: 0.916666666666667s;
	transform: rotate(180deg) translateY(-150%);
}

@keyframes spinner-fade {
	0% {
		opacity: 0.85;
	}

	50% {
		opacity: 0.25;
	}

	100% {
		opacity: 0.25;
	}
}
</style>