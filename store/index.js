import axios from 'axios'

export const state = () => ({
  authUser: null,
  activemenu: 1
})

export const getters = {
  doneActiveMenu: state => {
    return state.activemenu
  }
}

export const mutations = {
  SET_USER: (state, user) => {
    state.authUser = user;
  },
  SET_ACTIVE_MENU: (state, menu) => {
    state.activemenu = menu;
  }
}

export const actions = {
  nuxtServerInit ({commit}, {req}) {
    if (req.session && req.session.authUser) {
      commit('SET_USER', req.session.authUser);
    }
  },
  async login ({commit}, {username, password}) {
    try {
      const {data} = await axios.post('/api/login', { username, password });
      commit('SET_USER', data);
    } catch (e) {
      if (e.response && e.response.status === 401) {
        throw new Error('Bad credentials');
      }
      throw e;
    }
  },
  async logout ({commit}) {
    await axios.post('/api/logout');
    commit('SET_USER', null);
  }
}