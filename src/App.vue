<template>
  <div id="app">
<!--     <div id="nav">
      <router-link to="/">Homt</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <div class="l-wrapper">
      <router-view/>      
    </div>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.l-wrapper {
  width: 100%;
  min-height: 100vh;
  height: 100%;
  max-width: 420px;
  margin-right: auto;
  margin-left: auto;
  padding-bottom: 60px;
  box-shadow: 0 0 2px 2px rgba(119,119,119, .2);
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
