<template>
  <div class="loading-container">
    <div class="mouth-box">
      <div class="half_circle top_circle"></div>
      <div class="half_circle bottom_circle"></div>
    </div>
    <div class="balls-container">
      <div
        v-for="(ball, index) in balls"
        :key="`ball_item${index}`"
        class="ball-item"
      ></div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const balls = ref(Array.apply(null, { length: 5 }))
    return {
      balls,
    }
  },
})
</script>
<style lang="scss" scoped>
$diam: 50;
$open_angle: 35;
$time: 1; // 单位：s
.loading-container {
  width: 100%;
  height: 100%;
  margin-top: 26%;
  display: flex;
  justify-content: center;
  align-items: center;
  .mouth-box {
    flex-shrink: 0;
    width: $diam + px;
    height: $diam + px;
    position: relative;
    z-index: 10;
    .half_circle {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #3671ff;
      &.top_circle {
        border-radius: 50% 50% 0 0;
        clip: rect(0 $diam + px calc(#{$diam}px / 2) 0);
        animation: top_circle_animate $time + s linear infinite;
        &::before {
          content: '';
          position: absolute;
          top: 22%;
          left: 60%;
          width: 6px;
          height: 6px;
          background: black;
          border: 1px solid white;
          border-radius: 50%;
        }
      }
      &.bottom_circle {
        border-radius: 0 0 50% 50%;
        clip: rect(calc(#{$diam}px / 2) $diam + px $diam + px 0);
        animation: bottom_circle_animate $time + s linear infinite;
      }
    }
  }
  .balls-container {
    display: flex;
    animation: ball_move $time + s linear infinite;
    .ball-item {
      width: 10px;
      height: 10px;
      background: #868786;
      border-radius: 50%;
      flex-shrink: 0;
      margin-right: 24px;
    }
  }
}

@keyframes top_circle_animate {
  0% {
    transform: rotateZ(0);
  }
  50% {
    transform: rotateZ(-$open_angle + deg);
  }
  100% {
    transform: rotateZ(0);
  }
}
@keyframes bottom_circle_animate {
  0% {
    transform: rotateZ(0);
  }
  50% {
    transform: rotateZ($open_angle + deg);
  }
  100% {
    transform: rotateZ(0);
  }
}
@keyframes ball_move {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-34px);
  }
}
</style>
