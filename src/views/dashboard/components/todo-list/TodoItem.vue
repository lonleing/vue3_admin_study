<template>
    <li>
        <div class="view">
            <input
                :id="key"
                type="checkbox"
                class="_todo_checkbox_"
                v-model="checked"
                :value="val"
                :name="name"
                @change="$emit('change', data)"
                hidden
            />
            <label
                :for="key"
                class="toggle"
            >
                <div></div>
            </label>
            <div
                class="text-container"
                :class="{ moved_text: checked }"
            >
                {{ text }}
            </div>
            <button @click="$emit('delete-todo', data)" />
        </div>
    </li>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
interface DataType {
    [x: string]: unknown
}
export default defineComponent({
    props: {
        id: {
            type: [Number, String],
            require: true
        },
        value: {
            type: [Boolean, String],
            default: false
        },
        name: {
            type: String,
            default: ''
        },
        data: {
          type: Object,
          require: true
        },
        textProp: {
            type: String,
            default: 'text'
        },
        doneProp: {
            type: String,
            default: 'done'
        }
    },
    emits: ['delete-todo', 'change', 'update:done'],
    setup(props) {
        const text = computed(() => (props.data as DataType)[props.textProp])
        const done = computed(() => (props.data as DataType)[props.doneProp])
        const checked = ref(done.value)
        watch(done, (newVal) => {
            checked.value = newVal
        })

        const key = computed(() => `_todo_checkbox_${props.id}`)
        const val = computed(() => {
            let tempVal = props.value
            if (tempVal === false) {
                tempVal = ''
            }
            return tempVal
        })

        return {
            text,
            checked,
            key,
            val
        }
    }
})
</script>
<style lang="scss" scoped>
li {
    border-bottom: 1px solid #ededed;
    &:hover .view button {
        display: initial;
    }
    .view {
        display: flex;
        align-items: center;
        position: relative;
        .text-container {
            word-break: break-all;
            font-weight: bold;
            padding: 15px 15px 15px 10px;
            font-size: 14px;
            cursor: context-menu;
            transition: all 0.3s ease;
            color: #333;
        }
        .moved_text {
            color: #d9d9d9;
            text-decoration: line-through;
        }
        button {
            position: absolute;
            right: 10px;
            width: 40px;
            height: 40px;
            background: transparent;
            border: none;
            color: #cc9a9a;
            cursor: pointer;
            display: none;
            &::after {
                content: '×';
                font-size: 30px;
            }
            &:hover {
                color: #af5b5e;
            }
        }
    }
}
.toggle {
    flex-shrink: 0;
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    div {
        height: 30px;
        width: 30px;
        border-radius: 50%;
        border: 1px solid #f1f1f1;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
._todo_checkbox_:checked+label div {
    border-color: #e1eeec;
    &::before {
        content: '';
        display: block;
        width: 5px;
        height: 15px;
        border: 2px solid #5dc2af;
        border-top-color: transparent;
        border-left-color: transparent;
        transform: rotateZ(36deg) translateY(-1px) translateX(0px);
    }
}
</style>