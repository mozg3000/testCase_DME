<template>
  <div class="list-of-staff">
    <div class="staff-row">
      <div class="staff-row-col staff-row-col1 header">
        <span>
          ФИО
        </span>
        <input
          id="sortByName"
          type="checkbox"
          name="chk_fullname"
          @change="$emit('change')"
          :checked="isSortedByName? 'checked': ''"
        >
        <label
          for="sortByName"
        >
          сортировать
        </label>
      </div>
      <div class="staff-row-col staff-row-col2 header">
        <span>
          д.р.
        </span>
        <input
          id="sortByDate"
          type="checkbox"
          name="chk_birthday"
          @change="$emit('change')"
          :checked="isSortedByDate? 'checked': ''"
        >
        <label
          for="sortByDate">
          сортировать
        </label>
      </div>
      <div class="staff-row-col staff-row-col3 header">
        <span>
          Фото
        </span>
      </div>
    </div>
    <StaffTableItem
      v-for="person of staff"
      :key="person.id.value"
      :person="person"/>
  </div>
</template>

<script>

  import StaffTableItem from './StaffTableItem'

  export default {
    name: "StaffTable",
    components: {
      StaffTableItem
    },
    props: {
      staff: {
        type: Array,
        require: true
      },
      isSortedByName: {
        type: Boolean,
        required: false
      },
      isSortedByDate: {
        type: Boolean,
        required: false
      }
    },
    data() {
      return {
      }
    },
    methods: {
    },
    mounted(){
    },
    created() {
    }
  }
</script>

<style scoped lang="sass">
  .header
    background-color: grey
    display: flex
  .staff-row
    display: flex
    text-align: center
    margin-top: 30px
    font-weight: bold
    &-col1
      flex-basis: 0
      flex-grow: 3
    &-col2
      flex-basis: 0
      flex-grow: 1
    &-col3
      flex-basis: 0
      flex-grow: 2
      span
        margin: 0 auto
</style>