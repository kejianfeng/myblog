<template>
  <div id="app">
    <div class="topHeader">
      <top-header></top-header>
    </div>
    <router-view/>
    <subscribe></subscribe>
  </div>
</template>

<script>
import TopHeader from 'components/topHeader/topHeader' 
import Subscribe from 'components/subscribe/subscribe'
export default {
  name: 'App',
  components: {
    TopHeader,
    Subscribe
  }
}
</script>

<style scoped>
  #app {
    background-color: #e6e8e9;
    height:auto;
  }

</style>
