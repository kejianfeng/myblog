<template>
  <keep-alive>
    <div id="app">
     
      <router-view/>
    </div>
  </keep-alive>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped lang="less">

  #app {
    width: 100%;
    padding-bottom: 5rem;
  }

</style>
