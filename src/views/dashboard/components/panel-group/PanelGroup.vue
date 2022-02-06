<template>
    <el-row
        :gutter="40"
    >
        <el-col
            :lg="6"
            :span="12"
            class="card-panel-col"
            v-for="panelItem, index in panelLists"
            :key="'card-panel'+index"
        >
            <div class="card-panel" @click="$emit('handleSetLineChartData', panelItem._id)">
                <div>
                    <img
                        class="card-panel-img"
                        :src="panelItem.image"
                    />
                </div>
                <div class="card-panel-description">
                    <div>
                        <p class="card-panel-text">{{ panelItem.title }}</p>
                        <count-to
                            :start-val="0"
                            :end-val="panelItem.num"
                            :duration="3600"
                            class="card-panel-num"
                        />
                    </div>
                </div>
            </div>
        </el-col>
    </el-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import visits from '@images/home/visits.png'
import messages from '@images/home/messages.png'
import purchases from '@images/home/purchases.png'
import shoppings from '@images/home/shoppings.png'
import { CountTo } from 'vue3-count-to'
export default defineComponent({
    components: {
        CountTo
    },
    emits: ['handleSetLineChartData'],
    setup () {
        const panelLists = [
            {
                _id: 'newVisitis',
                image: visits,
                title: 'New Visits',
                num: 102400
            },
            {
                _id: 'messages',
                image: messages,
                title: 'Messages',
                num: 81212
            },
            {
                _id: 'purchases',
                image: purchases,
                title: 'Purchases',
                num: 9280
            },
            {
                _id: 'shoppings',
                image: shoppings,
                title: 'Shoppings',
                num: 13600
            }
        ]

        return {
            panelLists
        }
    }
})
</script>
<style lang="scss" scoped>
.card-panel-col {
    margin-bottom: 32px;
}
.card-panel {
    display: flex;
    align-items: center;
    color: white;
    height: 124px;
    cursor: pointer;
    border-radius: 10px;
    overflow: hidden;
    background: white;
    box-shadow: 4px 4px 40px rgb(0 0 0 / 5%);
    .card-panel-img {
        width: 60px;
        height: 60px;
        margin-left: 30px;
    }
    .card-panel-description {
        margin-right: 26px;
        display: flex;
        justify-content: right;
        font-weight: 700;
        color: #666;
        .card-panel-text {
            margin-bottom: 8px;
            font-size: 16px;
            color: #8c8c8c;
        }
        .card-panel-num {
            font-size: 20px;
        }
    }
    >div {
        flex: 1 0 0;
        position: relative;
    }

    @media (max-width:550px) {
        .card-panel-description {
            display: none;
        }
        .card-panel-img {
            margin-left: 0;
            position: absolute;
            left: 50%;
            top: 0;
            transform: translate(-50%, -50%);
            animation: imgAnimate 1s;
        }
        @keyframes imgAnimate {
            from {
                left: 30px;
                margin-left: 30px;
            }
            to {
                left: 50%;
                margin-left: 0;
            }
        }
    }
}
</style>