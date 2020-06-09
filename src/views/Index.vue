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
    <todo-list :tasks="tasks" @click-delete="deleteTask" @update-check="updateCheck" />

    <div class="l-footer">
      <p class="c-purge" @click="purge">Delete done</p>
    </div>
  </div>
</template>

<script>

import TodoForm from '@/components/TodoForm'
import TodoList from '@/components/TodoList'
import SignIn from '@/components/SignIn'
import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore';

export default {
  name: 'Index',
  components: {
    TodoForm,
    TodoList,
    SignIn
  },
  data() {
    return {
      database: firebase.firestore(),
      collection: firebase.firestore().collection('tasks'),
      tasks: [],
      isLogin: false,
      modal: false,
      user: '',
    }
  },
  created: function() {

  },
  mounted: function() {
    // this.user = firebase.auth().currentUser.uid;
    // this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    // this.collection.get().then( snapshot => {
    //   snapshot.forEach(doc => {
    //     this.tasks.unshift(doc.data());
    //   })
    // });
    this.collection.onSnapshot( snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === "added") {
          this.tasks.unshift(change.doc.data());
        }
        if(change.type === "removed") {
          let targetId = change.doc.id;
          this.tasks = this.tasks.filter(task => {
            return task.id !== targetId;
          });
        }
        if(change.type === "modified") {
          let targetId = change.doc.id;
          let targetTask = this.findTaskById(targetId)[0];
          let newValue = change.doc.data().isDone;
          if(targetTask !== newValue) {
            targetTask.isDone = newValue;
          }
        }
      });
    });
  },
  watch: {
    // tasks: {
    //   handler: function(newValue, oldValue) {

    //     // localStorage.setItem('tasks', JSON.stringify(this.tasks));
    //   },
    //   deep: true,
    // }
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
        let taskRef = this.collection.doc();
        let newTask = {
          id: taskRef.id,
          text: value,
          isDone: false
        };
        taskRef.set(newTask)
          .catch( err => {
            console.log(err);
          });
      }
    },
    deleteTask(index) {
      let targetId = this.tasks[index].id;
      this.collection.doc(targetId).delete();
    },
    updateCheck(index) {
      let targetId = this.tasks[index].id;
      let newValue = !this.tasks[index].isDone;
      this.collection.doc(targetId).update({
        isDone: newValue
      }).catch(function(error) {
        console.error("Error updating document: ", error);
      });
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
    authUser() {
      this.isLogin = true;
      this.closeModal();
    },
    findTaskById(id) {
      return this.tasks.filter( task => {
        return task.id === id;
      })
    }
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