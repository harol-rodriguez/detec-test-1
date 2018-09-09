<template>
  <section class="activos">
    <img src="~assets/img/logo_detec.svg" alt="Nuxt.js Logo" class="logo" />
    <nuxt-link to="/login">Ir a la página de login</nuxt-link>
    <button @click="logout" class="btn btn-danger float-right">Cerrar sesión</button>
  </section>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  middleware: 'auth',
  async asyncData () {
    let { data } = await axios.get('/api/users')
    return { users: data }
  },
  head () {
    return {
      title: 'Users'
    }
  },
  methods: {
    async logout () {
      try {
        await this.$store.dispatch('logout');
      } catch (e) {
        this.formError = e.message;
      }
    }
  }
}
</script>

<style scoped>
.activos{
  height: calc(100% - 50px);
}
.title
{
  margin: 30px 0;
}
.users
{
  list-style: none;
  margin: 0;
  padding: 0;
}
.user
{
  margin: 10px 0;
}
</style>
