import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        apiURI: 'https://randomuser.me/api/?results=',
        staff: [],
        isSortedByName: false,
        isSortedByDate: false,
        startDate: '',
        endDate: '',
        searchLine: ''
    },
    getters: {
        getAllStaff(state){
            return state.staff;
        },
        isSortedByName(state){
            return state.isSortedByName;
        },
        isSortedByDate(state){
            return state.isSortedByDate;
        },
        getStartDate(state){
            return state.startDate;
        },
        getEndDate(state){
            return state.endDate;
        },
        getSearchLine(state){
            return state.searchLine;
        }
    },
    mutations: {
        setAllStaff: (state, staff) => state.staff = staff,
        setIsSortedByName: (state, bool) => state.isSortedByName = bool,
        setIsSortedByDate: (state, bool) => state.isSortedByDate = bool,
        setStartDate: (state, value) => state.startDate = value,
        setEndDate: (state, value) => state.endDate = value,
        setSearchLine: (state, searchLine) => state.searchLine = searchLine
    },
    actions: {
        getStaff({commit, state}, quantity) {
            return new Promise((resolve, reject) =>
                axios({
                method: 'get',
                url: `${state.apiURI}${quantity}`,
                // headers: {'Content-Type': 'application/json'}
                // этот хедер добавлен в хедеры по умолчанию
                // axios.defaults.headers.common['Content-Type'] = 'application/json';
                // в файле /src/main.js
                }).then(response =>{
                    commit('setAllStaff', response.data.results);
                    resolve(response.data.results);
                }).catch(error =>
                    reject(error)
                )

            )
        },
    },
modules: {
}
})
