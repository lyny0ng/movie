<script>
export default {
  name: 'App',
};
</script>

<template>
  <div id="app">
    <header class="app-header">
      <img class="logo" src="./assets/images/popcorn_logo.png" alt="popcorn">
      <p class="dunggeun">장르별 영화추천, 팝콘픽!</p>
    </header>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
#app {
  font-family: 'Pretendard-Regular';
  text-align: center;
  color: #2c3e50;
}

.content {
  padding: 0;
  padding-top: 0px;
  position: relative;
}

.logo {
  width: 13rem;
  height: auto;
}
</style>
