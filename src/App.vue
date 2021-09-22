<template>
  <div id="app">
    <MainLanding></MainLanding>
  </div>
</template>

<script>
import MainLanding from "@/components/MainLanding.vue"

export default {
  name: "app",
  components:{
    'MainLanding': MainLanding
  }
};
</script>
