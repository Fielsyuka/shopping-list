<template>
  <div class="p-index">
    <header class="l-header">
      <h1>Shopping List</h1>
      <div class="c-icon-user" @click="openModal"><b-icon icon="person" font-scale="2"></b-icon></div>
      <p v-if="remainingTask.length"> Remaining: {{ remainingTask.length }}</p>
      <p v-else>You got everything you need :)</p>
    </header>
    
    <modal v-if="modal" :user="user" @close-modal="closeModal" @auth-user="authUser" @log-out="logOut" />
    <todo-form @update-value="addTask" />
    <todo-list :tasks="tasks" :local="local" :user="user" @click-delete="deleteTask" @update-check="updateCheck" />

    <div class="l-footer">
      <p class="c-purge" @click="purge">Delete done</p>
    </div>
  </div>
</template>

<script>

import TodoForm from '@/components/TodoForm'
import TodoList from '@/components/TodoList'
import Modal from '@/components/Modal'
import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore';

export default {
  name: 'Index',
  components: {
    TodoForm,
    TodoList,
    Modal
  },
  data() {
    return {
      collection: firebase.firestore().collection('tasks'),
      tasks: [],
      local: [],
      isLogin: false,
      modal: false,
      user: {},
    }
  },
  created: function() {

  },
  mounted: function() {
    let _this = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
      _this.isLogin = true;
      _this.getDatabase();
      console.log("loggedin");
      } else {
      _this.isLogin = false;
      _this.modal = true;
      _this.getLocalData();
      }
    });
  },
  watch: {
    local: {
      handler: function() {
        localStorage.setItem('tasks', JSON.stringify(this.local));
      },
      deep: true,
    }
  },
  computed: {
    remainingTask() {
      let filterTargt = this.user ? this.tasks : this.local;
      return filterTargt.filter( task => {
        return !task.isDone
      });
    }
  },
  methods: {
    getDatabase() {
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
    getLocalData() {
      this.local = JSON.parse(localStorage.getItem('tasks')) || [];
    },
    addTask(value) {
      if(value) {        
        if(Object.keys(this.user).length) {
          let taskRef = this.collection.doc();
          let newTask = {
            id: taskRef.id,
            text: value,
            isDone: false
          };
          taskRef.set(newTask).catch( err => {
            console.log(err);
          });
        } else {
          let newTask = {
            text: value,
            isDone: false
          }
          this.local.unshift(newTask);
        }
      }
    },
    deleteTask(index) {
      if(Object.keys(this.user).length) {
        let targetId = this.tasks[index].id;
        this.collection.doc(targetId).delete();
      } else {
        this.local.splice(index, 1);
      }
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
    authUser(user) {
      this.isLogin = true;
      this.closeModal();
      this.user = user;
    },
    logOut() {
      firebase.auth().signOut().then(()=>{
        console.log("ログアウトしました");
      })
      .catch( (error)=>{
        console.log(`ログアウト時にエラーが発生しました (${error})`);
      });
      this.tasks = [];
      this.user = {};
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
  cursor: pointer;
  position: absolute;
  top: 20px;
  left: 20px;
}
.c-purge {
  cursor: pointer;
  text-decoration: underline;
}

</style>