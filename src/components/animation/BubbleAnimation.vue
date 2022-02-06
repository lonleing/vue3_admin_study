<template>
    <div ref="root" class="__bubble_main__">
        <keep-alive>
            <div v-for="item, index in lists" :key="`bubble${ index }`" class="__bubble__" :style="item.styles"></div>
        </keep-alive>
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, onMounted, onBeforeUnmount } from 'vue'
interface BubbleStyle {
    width: string;
    height: string;
    transform: string;
    left: string;
    top: string;
}
interface Lists {
    styles: BubbleStyle;
    initHorizontalDirection: boolean;
    initVerticalDirection: boolean;
    speed: number;
}
export default defineComponent({
    props: {
        limit: {
            type: Number,
            default: 3
        },
        maxSize: {
            type: Number,
            default: 55
        },
        minSize: {
            type:Number,
            default: 22
        }
    },
    setup (props) {
        const lists: Ref<Array<Lists>> = ref([])

        /* 气泡动画 */
        const root: Ref<HTMLElement|undefined> = ref();
        let animationId: number;
        onMounted(() => {
            // 生成范围内随机数
            function getRandomIntInclusive(min: number, max: number, isInt = true) {
                if (isInt) {
                    min = Math.ceil(min);
                    max = Math.floor(max);
                }
                return Math.random() * (max - min + 1) + min
            }

            /* 生成气泡 */
            const max_x = root.value?.clientWidth as number
            const max_y = root.value?.clientHeight as number
            const max_speed = 0.5
            const min_speed = 0.1

            function preventBump(bubble_lists: Array<Lists>, left: number, top: number, size: number) {
                let res = { left, top }
                bubble_lists.forEach(item => {
                    let existLeft = Number(item.styles.left.replace(/(\d+)px/, '$1'))
                    let existTop = Number(item.styles.top.replace(/(\d+)px/, '$1'))
                    let existSize = Number(item.styles.width.replace(/(\d+)px/, '$1'))
                    if (left + size > existLeft && top + size > existTop && top < existTop + existSize && left < existLeft + existSize) {
                        left = existSize + existLeft + 5
                        top = existSize + existTop + 5
                        res = preventBump(bubble_lists, left, size, top)
                        return true;
                    }
                })
                return res
            }

            for (let index = 0; index < props.limit; index++) {
                let size = getRandomIntInclusive(props.maxSize, props.minSize)
                let angle = getRandomIntInclusive(360, 0)
                let left = getRandomIntInclusive(max_x - size, 0)
                let top = getRandomIntInclusive(max_y - size, 0)
                let speed = getRandomIntInclusive(max_speed, min_speed, false)

                // 防止初始化时气泡重叠
                const nexPos = preventBump(lists.value, left, top, size)
                left = nexPos.left
                top = nexPos.top

                lists.value.push({
                    styles: {
                        width: `${ size }px`,
                        height: `${ size }px`,
                        transform: `rotateZ(${ angle }deg)`,
                        left: `${ left }px`,
                        top: `${ top }px`,
                    },
                    initHorizontalDirection: left > max_x / 2,
                    initVerticalDirection: top > max_y / 2,
                    speed
                })
            }

            /* 添加动画 */
            function runAnimation () {
                lists.value.forEach(item => {
                    let left = Number(item.styles.left.replace(/(\d+)px/, '$1'))
                    let top = Number(item.styles.top.replace(/(\d+)px/, '$1'))
                    let size = Number(item.styles.width.replace(/(\d+)px/, '$1'))
                    left = item.initHorizontalDirection ? left - item.speed : left + item.speed
                    top = item.initVerticalDirection ? top - item.speed : top + item.speed

                    // 边缘碰撞
                    if (left < 0 && item.initHorizontalDirection) {
                        item.initHorizontalDirection = false
                        item.speed = getRandomIntInclusive(max_speed, min_speed, false)
                    } else if ((left > max_x - size) && !item.initHorizontalDirection) {
                        item.initHorizontalDirection = true
                        item.speed = getRandomIntInclusive(max_speed, min_speed, false)
                    }
                    if (top < 0 && item.initVerticalDirection) {
                        item.initVerticalDirection = false
                        item.speed = getRandomIntInclusive(max_speed, min_speed, false)
                    } else if ((top > max_y - size) && !item.initVerticalDirection) {
                        item.initVerticalDirection = true
                        item.speed = getRandomIntInclusive(max_speed, min_speed, false)
                    }

                    item.styles.left = `${ left }px`
                    item.styles.top = `${ top }px`
                })
                animationId = requestAnimationFrame(runAnimation)
            }
            runAnimation()
        }) 

        // 销毁动画
        onBeforeUnmount(() => {
            cancelAnimationFrame(animationId)
        })
        
        return {
            lists,
            root
        }
    }
})
</script>

<style lang="scss" scoped>
.__bubble_main__ {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
}
.__bubble__ {
    position: absolute;
    border-radius: 50%;
    box-shadow: inset 2px -5px 17px rgba(255, 255, 254, 0.2), inset -3px -1px 5px rgba(255, 255, 254, 0.2);
    &::before {
        content: '';
        position: absolute;
        width: 10%;
        height: 10%;
        background: rgba(255, 255, 254, 0.4);
        border-radius: 50%;
        left: 13%;
        top: 27%;
    }
    &::after {
        content: '';
        position: absolute;
        width: 5%;
        height: 5%;
        background: rgba(255, 255, 254, 0.25);
        border-radius: 50%;
        left: 88%;
        top: 51%;
    }
}
</style>