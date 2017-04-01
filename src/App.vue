<template>
  <div id="app">
  <transition name='flod'>
    <router-view>
    </router-view>
  </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  components:{
    
  }
}
</script>

<style>
.flod-enter-active{animation-name:fadeInRight;animation-duration:.2s;}

</style>
