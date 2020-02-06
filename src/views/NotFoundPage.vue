<template>
  <div>
    <a
      href=""
      @click.prevent="$router.push({name: 'root'})"
    >
      Start Page
    </a>
    <h1>Page Not Found</h1>
  </div>
</template>

<script>
    export default {
        name: "NotFoundPage"
    }
</script>

<style scoped>

</style>