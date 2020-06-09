<template>
  <div class="p-index">
    <header class="l-header">
      <h1>Shopping List</h1>
      <div class="c-icon-user" @click="openModal"><b-icon icon="person" font-scale="2"></b-icon></div>
      <p v-if="remainingTask.length"> Remaining: {{ remainingTask.length }}</p>
      <p v-else>You got everything you need :)</p>
    </header>
    
    <sign-in v-if="modal" @close-modal="closeModal" @auth-user="authUser" />
    <todo-form @update-value="addTask" />
    <todo-list :tasks="tasks" @click-delete="deleteTask" />

    <div class="l-footer">
      <p class="c-purge" @click="purge">Delete done</p>
    </div>
  </div>
</template>

<script>

import TodoForm from '@/components/TodoForm'
import TaskList from '@/components/TaskList'
import SignIn from '@/components/SignIn'
import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/auth'

export default {
  name: 'Home',
  components: {
    TodoForm,
    TaskList,
    SignIn
  },
  data() {
    return {
      tasks: [],
      isLogin: false,
      modal: false,
      user: '',
    }
  },
  mounted: function() {
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  },
  watch: {
    tasks: {
      handler: function() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
      },
      deep: true,
    }
  },
  computed: {
    remainingTask() {
      return this.tasks.filter( task => {
        return !task.isDone
      });
    }
  },
  methods: {
    addTask(value) {
      if(value) {
        let newTask = {
          text: value,
          isDone: false
        }
      }
    },
    deleteTask(index) {
      this.tasks.splice(index, 1);
    },
    purge() {
      this.tasks = this.remainingTask;
    },
    closeModal() {
      this.modal = false;
    },
    openModal() {
      this.modal = true;
    },
  },
}
</script>

<style lang="css" scoped>
.l-header {
  position: relative;
  padding: 20px 20px 15px;
  text-align: center;
}
.l-header > h1 {
  margin-bottom: 8px;
  font-size: 24px;
  letter-spacing: .02em;
}
.l-header > p {
  margin-bottom: 0;
  font-size: 14px;
  letter-spacing: .01em;
}
.l-add-container {
  padding: 5px 20px;
}
.l-list-container {
  margin-top: 20px;
}
.l-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 420px;
  height: 60px;
  background-color: #060606;
  color: #fff;
  text-align: center;
}
.l-footer > p {
  margin-bottom: 0;
}
.c-icon-user {
  position: absolute;
  top: 20px;
  left: 20px;
}
.c-purge {
  cursor: pointer;
  text-decoration: underline;
}

</style>