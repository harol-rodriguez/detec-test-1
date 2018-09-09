import axios from 'axios'

export const state = () => ({
  proveedores: [
    { id: 1, name: '3M'},
    { id: 2, name: 'Cisco'},
    { id: 3, name: 'Asterics'},
    { id: 4, name: 'Delta'},
    { id: 5, name: 'Elise'},
  ]
})

export const getters = {
  getProveedores: state => {
    return state.proveedores
  }
}

export const mutations = {
  SET_UsSER: (state, user) => {
    state.authUser = user;
  }
}

export const actions = {
  nuxtServersInit ({commit}, {req}) {
    if (req.session && req.session.authUser) {
      commit('SET_USER', req.session.authUser);
    }
  }
}