<template>
  <section class="todoapp">
    <header class="header">
      <input
        id="toggle-all"
        type="checkbox"
        class="toggle_all"
        v-model="checked"
        hidden
        @change="toggleAllChange"
      />
      <label v-if="getFilters[TodoTypes.All].length" for="toggle-all" />
      <input
        class="new-todo"
        autocomplete="off"
        placeholder="Todo List"
        v-model="newTodoItem"
        @keyup.enter="addTodo"
      />
    </header>
    <ul class="todo_list">
      <todo-item
        v-for="(todo, index) in getFilters[todoType]"
        :key="'todoList_' + index"
        :data="todo"
        :id="index"
        @delete-todo="deleteTodo"
        @change="change"
      />
    </ul>
    <footer class="footer" v-if="getFilters[TodoTypes.All].length">
      <div>{{ getFilters[TodoTypes.Active].length }} items left</div>
      <div class="fotter-right-box">
        <div
          v-for="(TodoType, index) in TodoTypes"
          :key="index"
          @click="toggleTodoType(TodoType)"
          :class="{ selected: todoType == TodoType }"
        >
          {{ capitalize(TodoType) }}
        </div>
      </div>
    </footer>
  </section>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue'
import TodoItem from './TodoItem.vue'

interface DataType {
  done: boolean
  [x: string]: unknown
}
enum TodoTypes {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}
export default defineComponent({
  components: {
    TodoItem,
  },
  setup() {
    const newTodoItem = ref<string>()
    const todos: DataType[] = reactive([
      { text: 'star this repository', done: true },
      { text: 'fork this repository', done: false },
      { text: 'settings', done: false },
      { text: 'theme', done: false },
      { text: 'doc', done: false },
      { text: 'gitpages', done: false },
    ])
    const checked = ref(isCheckedAll())
    const getFilters = computed(() => {
      return {
        [TodoTypes.All]: todos,
        [TodoTypes.Active]: todos.filter((todo) => !todo.done),
        [TodoTypes.Completed]: todos.filter((todo) => todo.done),
      }
    })
    const todoType = ref(TodoTypes.All)

    function isCheckedAll() {
      return todos.every((todo) => todo.done)
    }

    function toggleTodoType(params: TodoTypes) {
      todoType.value = params
    }

    function capitalize(str: string) {
      return str.charAt(0).toLocaleUpperCase() + str.slice(1)
    }

    function setLocalStorage(
      item: DataType,
      callback?: (todo?: DataType) => void,
      is_del = false
    ) {
      const itemJson = JSON.stringify(item)
      todos.forEach((todo) => {
        const todoJson = JSON.stringify(todo)
        if (itemJson === todoJson) {
          is_del
            ? todos.splice(todos.indexOf(todo), 1)
            : (todo.done = !todo.done)
          if (callback) callback(todo)
        }
      })
      checked.value = isCheckedAll()
    }

    function change(todoItem: DataType) {
      setLocalStorage(todoItem)
    }

    function deleteTodo(todoItem: DataType) {
      setLocalStorage(todoItem, undefined, true)
    }

    function addTodo() {
      todos.push({ text: newTodoItem.value, done: false })
      checked.value = false
      newTodoItem.value = ''
    }

    function toggleAllChange() {
      todos.forEach((todo) => (todo.done = checked.value))
    }
    return {
      getFilters,
      todoType,
      TodoTypes,
      newTodoItem,
      checked,
      deleteTodo,
      toggleTodoType,
      change,
      capitalize,
      addTodo,
      toggleAllChange,
    }
  },
})
</script>

<style lang="scss" scoped>
.todoapp {
  background: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  .header {
    display: flex;
    align-items: center;
    box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
    position: relative;
    .toggle_all + label[for='toggle-all'] {
      display: block;
      transform: rotateZ(90deg) translateY(3px);
      position: absolute;
      &::before {
        content: '❯';
        padding: 10px 20px 10px 20px;
        font-size: 22px;
        color: #e6e6e6;
      }
    }
    .toggle_all:checked + label[for='toggle-all']::before {
      color: #737373;
    }
    .new-todo {
      font-size: 18px;
      border: none;
      padding: 10px 16px 16px 50px;
      background: rgba(0, 0, 0, 0.003);
      outline: none;
      width: 100%;
    }
  }
  .todo_list {
    list-style: none;
  }
  .footer {
    display: flex;
    align-items: center;
    padding: 10px 15px;
    font-size: 14px;
    color: #777;
    position: relative;
    .fotter-right-box {
      flex: 1 0 0;
      display: flex;
      justify-content: center;
      align-items: center;
      position: static;
      z-index: 1;
      > div {
        padding: 3px 7px;
        font-size: 12px;
        border: 1px solid transparent;
        border-radius: 3px;
        cursor: context-menu;
        &.selected,
        &:hover {
          border-color: #af2f2f33;
        }
      }
    }
    &::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      margin-bottom: 4px;
      box-shadow: 0 1px 1px rgba($color: #000000, $alpha: 20%),
        0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgba($color: #000000, $alpha: 20%),
        0 16px 0 -6px #f6f6f6,
        0 17px 2px -6px rgba($color: #000000, $alpha: 20%);
    }
  }
}
</style>
