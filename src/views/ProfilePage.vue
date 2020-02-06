<template>
  <div class="container">
    <a
      @click.prevent="$router.go(-1)"
      href=""
    >
      Back
    </a>
    <div class="flex">
      <div
        class="picture-container"
        @click.prevent="isBig = !isBig"
      >
        <img
          :src="person.picture.medium"
          :alt="person.name | fullNameFormat">
      </div>
      <div
        class="profile-data-container"
      >
        <div
          class="profile-titles"
        >
          <p>
            Name:
          </p>
          <p>
            Lastname:
          </p>
          <p>
            cell:
          </p>
          <p>
            email:
          </p>
        </div>
        <div
          class="profile-data"
        >
          <p>
            {{person.name.first}}
          </p>
          <p>
            {{person.name.last}}
          </p>
          <p>
            {{person.cell}}
          </p>
          <p>
            {{person.email}}
          </p>
        </div>
      </div>
    </div>
    <div
        class="bigPic"
        v-show="isBig"
        @click.prevent="isBig = !isBig"
    >
      <img
          :src="person.picture.large"
          :alt="person.name | fullNameFormat"
      >
    </div>
  </div>
</template>

<script>
  export default {
    name: "ProfilePage",
    props: {
      person: {
        type: Object,
        required: true,
      }
    },
    data: ()=>({
      isBig: false,
    })
  }
</script>

<style scoped lang="sass">
  .container
    position: relative
    height: 100%
  .flex
    display: flex
    flex-direction: column
    justify-content: center
    img
      object-fit: none
    .picture-container
      display: flex
      justify-content: center
    .profile
      &-titles
        display: flex
        width: 30%
        align-items: stretch
        flex-direction: column
        font-weight: bold
      &-data
        display: flex
        padding-left: 50px
        width: auto
        align-items: stretch
        flex-direction: column
        &-container
          display: flex
          margin: 0 auto
          padding-top: 40px
  .bigPic
    display: flex
    justify-content: center
    align-items: center
    width: 100%
    height: 100%
    background-color: dimgrey
    position: absolute
    top: 0
    left: 0


</style>