<template>
  <div>
    <div>THIS: {{ URL }}</div>
    <br />
    <div @click="doStuff">THIS: {{ env.VUE_APP_BOOLEAN }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      test: "STRING",
      env: process.env,
      URL: process.env.VUE_APP_API_URL,
    };
  },
  methods: {
    doStuff() {
      console.log(process.env.VUE_APP_API_URL);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
