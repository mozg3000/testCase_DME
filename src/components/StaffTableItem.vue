<template>
  <router-link
    :to="{name: 'profile', params: {person}}"
  >
    <div class="staff-row">
      <div
        class="staff-row-col1"
      >
        <p>
          {{person.name | fullNameFormat}}
        </p>
      </div>
      <div
        class="staff-row-col2">
        <p>
          {{person.dob.date | westernDate}}
        </p>
      </div>
      <div class="staff-row-col3">
        <img
          :src="person.picture.thumbnail"
          alt="person.name | fullNameFormat">
      </div>
    </div>
  </router-link>
</template>

<script>
  export default {
    name: "StaffListItem",
    props: {
      person: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style scoped lang="sass">
  a
    text-decoration: none
    color: black

  .staff-row
    display: flex
    text-align: center
    margin-top: 30px
    align-items: center
    &:hover
      background-color: lightgray
    &-col1
      flex-basis: 0
      flex-grow: 3
      text-align: left
      padding-left: 10px
    &-col2
      flex-basis: 0
      flex-grow: 1
      text-align: left
      padding-left: 10px
    &-col3
      flex-basis: 0
      flex-grow: 2
      padding-left: 10px
      img
        vertical-align: middle

</style>