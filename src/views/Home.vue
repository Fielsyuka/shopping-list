<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <input type="checkbox" id="parent"  v-model="check_parent">
    <label for="parent">parent</label>
    <button @click="toggleParentCheck">toggle</button>
    <HelloWorld :check_child="check_child" @toggleChildCheck="toggleChildCheck"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data() {
      return {
          check_parent: false,
          check_child: false
      };
  },
  methods: {
      toggleParentCheck() {
          this.check_parent = !this.check_parent;
      },
      toggleChildCheck(value) {
          this.check_child = value;
          console.log(this.check_child);
      }
  }
}
</script>
