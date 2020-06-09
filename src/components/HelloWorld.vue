<template>
  <div class="hello">
    <input type="checkbox" id="child" :value="check_child" :checked="check_child">
    <label for="child">child</label>
    <button @click="toggleChildCheck">toggle</button>
    {{check_child}}
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    check_child: Boolean
  },
  methods: {
      toggleChildCheck() {
          this.$emit('toggleChildCheck', !this.check_child);
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
