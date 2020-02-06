<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import StaffCatalog from './views/StaffCatalog'

export default {
  name: 'app',
  components: {
      StaffCatalog,
  },
  data() {
      return {
      }
  },
  methods: {
  },
  computed:{
  },
  created() {
  }

}
</script>

<style scoped lang="sass">
  #app
    width: 1024px
    padding-top: 50px
    margin: 0 auto
    height: 100%
</style>
