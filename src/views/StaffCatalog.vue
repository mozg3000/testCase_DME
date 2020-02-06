<template>
  <div class="">
    <h1>
      Телефонный справочник
    </h1>
    <form
      class="flex"
      @submit.prevent="commandHandler"
      name="formName"
    >
      <label
        for="staff_search"
      >Поиск:</label>
      <input
        id="staff_search"
        type="text"
        name="search"
        v-model="searchLine"
        @input="commandHandler"
      >
      <a
        href="#"
        id="undo"
        @click.prevent="searchUndo"
      >
        X
      </a>
      <label for="startDate">
        Дата начала
      </label>
      <input
        id="startDate"
        type="date"
        name="startDate"
        v-model="startDate"
      >
      <label for="endDate">
        Дата конца
      </label>
      <input
        id="endDate"
        type="date"
        name="endDate"
        v-model="endDate"
      >
      <input
        type="submit"
        value="Выбрать"
      >
      <a
        href=""
        @click.prevent="clearDates"
      >
        сбросить
      </a>
    </form>
    <p
      v-if="!!error"
      class="error"
    >
      {{error}}
    </p>
    <div
      v-else>
      <p
        v-if="isLoading"
      >
        Loading...
      </p>
      <StaffTable
        v-else
        :staff="staff"
        :isSortedByName="$store.getters.isSortedByName"
        :isSortedByDate="$store.getters.isSortedByDate"
        @change.native="sortTable"
      />
    </div>
  </div>
</template>

<script>
  import StaffTable from '../components/StaffTable';
  import Moment from 'moment/moment';
  import { extendMoment } from 'moment-range';
  const moment = extendMoment(Moment);
  import lastNameComparator from '../libs/comparators/stringComparator';
  import dateComparator from '../libs/comparators/dateComparator';

  export default {
    name: "StaffCatalog",
    components: {
      StaffTable,
    },
    data: () => ({
      searchLine: '',
      searchLineLength: 0,
      isLoading: false,
      staff: [],
      error: '',
      startDate: '',
      endDate: ''
    }),
    computed: {
      isRanged(){
        return this.startDate && this.endDate !== ''
      }
    },
    methods: {
      searchUndo(){
        this.searchLine = '';
        this.$store.commit('setSearchLine', '');
        this.commandHandler();
      },
      clearDates(){
        this.error = false;
        this.startDate = '';
        this.endDate = '';
        this.commandHandler();
      },
      //  Выборка по интервалу дат
      filterPeriod(){
        this.error = '';
        if(this.startDate && this.endDate){
          this.$store.commit('setStartDate', this.startDate);
          this.$store.commit('setEndDate', this.endDate);
          const startDate = new Date(this.startDate),
                endDate = new Date(this.endDate),
                range = moment.range(startDate, endDate);
          if (this.staff){
            this.staff = this.staff.filter(person => {
              return range.contains(new Date(person.dob.date))
            })
          }
        }else{
            this.error = 'Нужны все две даты'
        }
      },
      // Паттерн шаблонный метод
      // Реализует обобщённую логику сортировки\фильтрации для всей страницы
      commandHandler(){
        //  Если нет текста в поиске и не нет выборки даты
        if(!this.searchLine && !this.isRanged){
          this.staff = this.$store.getters.getAllStaff;
        }else{
          //  Если текст поиска стирается
          if(this.searchLineLength > this.searchLine.length){
            this.staff = this.$store.getters.getAllStaff;
          }
          // Делаем поиск по поисковому запросу , если он есть
          if(this.searchLine){
            this.filterInput();
          }
          // Делаем выборку по датам, если задан интервал
          if (this.isRanged){
            this.filterPeriod()
          }
        }
        // Сортируем, если стоят галочки
        if (this.$store.getters.isSortedByName){
          this.sortByName();
        }else if (this.$store.getters.isSortedByDate){
          this.sortByDate();
        }
        // Сохраняем длину поискового запроса, чтоб знать если его начнут стирать
        this.searchLineLength = this.searchLine.length;
      },
      // Поиск по введёному тексту
      filterInput(){
        this.error = '';
        let regexp = new RegExp(this.searchLine, 'i');
        this.$store.commit('setSearchLine', this.searchLine);
        this.staff = this.staff.filter((person) => {
            return regexp.test(`${person.name.first} ${person.name.last}`)
        });
        if (!this.staff.length){
          this.error = 'Nothing found';
        }
      },
      // Обработчик события нажатия на кнопку сортировки в шабке таблицы
      sortTable(e){
        if(e.target.checked){
          switch (e.target.name) {
            case 'chk_fullname': {
              this.sortByName();
              this.$store.commit('setIsSortedByName', true);
              this.$store.commit('setIsSortedByDate', false);
              break;
            }
            case 'chk_birthday': {
              this.sortByDate();
              this.$store.commit('setIsSortedByDate', true);
              this.$store.commit('setIsSortedByName', false);
              break;
            }
          }
        }else{
          //  Снятие сортировки
          this.$store.commit('setIsSortedByDate', false);
          this.$store.commit('setIsSortedByName', false);
          this.commandHandler();
        }
      },
      //  Сортировка по фамилии
      sortByName(){
        this.staff =  [...this.staff].sort(lastNameComparator);
      },
      //  Сортировка по дате рождения
      sortByDate(){
        this.staff =  [...this.staff].sort(dateComparator);
      },
      //  Загрузка данных с сервера
      async loadStaff(){
        this.isLoading = true;
        try {
          const results = await this.$store.dispatch('getStaff', 50);
          if(results){
            this.staff = results;
            this.commandHandler();
          }
        }catch(e){
          this.error = e;
        }finally {
          this.isLoading = false;
        }
      },
    },
    beforeMount() {
      //  Инициализация сохранённого состояния
      this.startDate = this.$store.getters.getStartDate;
      this.endDate = this.$store.getters.getEndDate;
      this.searchLine = this.$store.getters.getSearchLine;
    },
    mounted(){
      this.loadStaff();
    },
  }
</script>

<style scoped lang="sass">
  form > a
    border: #0c5460 1px solid
    padding: 2px
    text-decoration: none
    color: black
  .flex
    display: flex
    input, label, a
      margin-left: 10px
  .error
    color: red
  #undo
    margin-left: 0
    color: black
</style>