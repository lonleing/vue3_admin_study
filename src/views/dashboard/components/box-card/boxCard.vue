<template>
  <el-card>
    <div class="box-card-header">
      <img src="@images/home/box_card_default_img.png" />
      <div class="pan_thumb">
        <div
          class="pan_thumb_img"
          :style="{
            background: `url(${panThumbDefault}) 50% 50% / 100% 100% no-repeat`,
          }"
        ></div>
      </div>
      <a href="#">
        <div class="mallki_text">
          vue-typescript-admin
          <span data-letters="vue-typescript-admin" class="upper_part" />
          <span data-letters="vue-typescript-admin" class="lower_half" />
        </div>
      </a>
    </div>
    <div
      class="progress-item"
      v-for="(progress, index) in progress_datas"
      :key="'progress_' + index"
    >
      <div>{{ progress.label }}</div>
      <el-progress
        :percentage="progress.percentage"
        :status="progress.status"
      />
    </div>
  </el-card>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import panThumbDefault from '@images/home/pan_thumb_default.gif'

export default defineComponent({
  setup() {
    const progress_datas = [
      {
        status: '',
        percentage: 82,
        label: 'Vue',
      },
      {
        status: '',
        percentage: 62,
        label: 'Typescript',
      },
      {
        status: '',
        percentage: 87,
        label: 'CSS',
      },
      {
        status: 'success',
        percentage: 100,
        label: 'ESLint',
      },
    ]
    return {
      panThumbDefault,
      progress_datas,
    }
  },
})
</script>
<style lang="scss" scoped>
.box-card-header {
  position: relative;
  margin-bottom: 35px;
  img {
    width: 100%;
    transition: all 0.2s linear;
    &:hover {
      filter: contrast(130%);
      transform: scale(1.1, 1.1);
    }
  }
  .pan_thumb {
    height: 70px;
    width: 70px;
    background-color: #fff;
    position: absolute;
    bottom: -25px;
    left: 0;
    border-radius: 50%;
    border: 5px solid #fff;
    &:hover .pan_thumb_img {
      transform: rotate(-110deg);
    }
    .pan_thumb_img {
      height: 100%;
      width: 100%;
      background: red;
      border-radius: 50%;
      transform-origin: 95% 40%;
      transition: all 0.3s ease-in-out;
    }
  }
  .mallki_text {
    position: absolute;
    right: 0;
    bottom: -19px;
    font-size: 20px;
    font-weight: bold;
    color: #4dd9d5;
    overflow: hidden;
    transition: color 0.5s 0.25s;
    span {
      position: absolute;
      height: 50%;
      width: 100%;
      left: 0;
      top: 0;
      overflow: hidden;
      &.upper_part::before {
        transform: translateY(100%);
      }
      &.lower_half {
        top: 50%;
        &::before {
          bottom: 0;
          transform: translateY(-100%);
        }
      }
      &::before {
        content: attr(data-letters);
        color: #3888fa;
        position: absolute;
        transition: transform 0.5s;
      }
    }
    &::before {
      content: '';
      width: 100%;
      height: 6px;
      background: #3888fa;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateX(-100%);
      transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
      transition: transform 0.4s;
    }
    &:hover {
      color: transparent;
      transition: none;
      &::before {
        transform: translateX(100%);
      }
      span::before {
        transform: translateY(0);
        transition-delay: 0.3s;
        transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
      }
    }
  }
}
.progress-item {
  margin-bottom: 10px;
  font-size: 14px;
}
</style>
