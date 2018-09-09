<template>
    <div class="login">
      <b-card>
        <p class="error" v-if="formError">{{ formError }}</p>
        <div v-if="!$store.state.authUser">
          <div class="login__header">
            <img src="~assets/img/logo.svg" alt="">
          </div>
          <p v-if="alert">{{alert.message}}</p>
          <b-form class="login__form" @submit.prevent="login">
            <b-form-group id="exampleInputGroup1"
                          label="Email:"
                          label-for="exampleInput1"
                          description="Debe primero registrar su correo electrónico al administrador">
              <b-form-input id="exampleInput1"
                            type="text"
                            v-model="email"
                            required
                            placeholder="Enter email">
              </b-form-input>
            </b-form-group>
            <b-form-group id="exampleInputGroup2"
                          label="Contraseña:"
                          label-for="exampleInput2">
              <b-form-input id="exampleInput2"
                            type="password"
                            v-model="password"
                            required
                            placeholder="Password">
              </b-form-input>
            </b-form-group>
            <!-- <b-form-group id="exampleInputGroup3"
                          label="Almacén:"
                          label-for="lblAlmacen">
              <b-form-select id="lblAlmacen"
                            v-model="almacen"
                            :options="options"
                            required>
              </b-form-select>
            </b-form-group> -->
            <b-form-group id="exampleGroup4">
              <b-form-checkbox-group id="exampleChecks">
                <b-form-checkbox value="me">Recordar</b-form-checkbox>
              </b-form-checkbox-group>
            </b-form-group>
            <div class="login__bottom">
              <b-button type="submit">Ingresar</b-button>
              <!-- <b-button type="reset" variant="danger">Reset</b-button> -->
            </div>
          </b-form>
        </div>
        <div v-else >
              Hola {{ $store.state.authUser.username }}!
              <pre>Me puedes ver únicamente porque has iniciado sesión correctamente!.</pre>
              <p><i>Si actualizas la página verás que sigo apareciendo!</i></p>
              <button @click="logout" class="btn btn-danger float-right">Cerrar sesión</button>
          </div>
      </b-card>
    </div>
</template>

<script>
  export default {
    layout: 'fullscreen',
    middleware: 'login',
    data () {
      return {
        email: '',
        password: '',
        almacen: 'LR',
        alert: null,
        options: [{ value: 'LR', text: 'Almacen Lurin' }],
        loading: false,
        formError: ''
      }
    },
    mounted () {
      const self = this
      if(self.$store.state.authUser) {
        self.$router.replace('/')
      }
    },
    methods: {
      async login () {
        const self = this
        try {
          await this.$store.dispatch('login', {
            username: this.email,
            password: this.password
          })
          this.email = '';
          this.password = '';
          this.formError = null;
          self.$router.replace('/activos');
        } catch (e) {
          this.formError = e.message;
        }
      },
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
<style lang="scss">
  .error{
      color: #ee0f0f;
  }
  .text-muted {
    color: #6c757d !important;
    font-size: 10px !important;
  }
  .login{
    height: auto;
    width: 360px;
    box-shadow: none;
    margin: auto;
    text-align: center;
    &__header{
      margin-bottom: 15px;
      padding: 0 60px;
      img{
        width: 100%;
      }
    }
    &__form{
      text-align: left;
    }
    &__bottom{
      text-align: center;
      button{
        width: 100%;
        background-color: rgba(1,33,97,1);
        background: linear-gradient(to right, rgba(1,33,97,1) 0%, rgba(20,97,184,1) 100%);
        margin: 0;
        margin-bottom: 22px;
      }
    }
  }

</style>