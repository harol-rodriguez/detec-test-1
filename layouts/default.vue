<template>
  <div class="ly_default">
    <header>
      <nav class="ly_default__navbar">
        <div class="ly_default__navbar--logo">
        </div>
        <ul class="ly_default__navbar--menu">
          <li class="item" :class="$i == activemenu ?'active':''" v-for="(item, $i) in menu" :key="$i">
            <nuxt-link :to="'/'+item.path" @click="activemenu = $i">{{item.name}}</nuxt-link>
            <!-- <a href="#" @click="activemenu = $i">{{item.name}}</a> -->
          </li>
        </ul>
      </nav>
    </header>
    <nuxt />
  </div>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        { icon: 'apps', title: 'Welcome', to: '/' },
        { icon: 'bubble_chart', title: 'Inspire', to: '/inspire' }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'DETEC',
      menu: [
        { name: 'Panel', path:'dashboard', status: true },
        { name: 'Activos', path:'activos', status: false },
        { name: 'Operaciones', path:'operaciones', status: false },
        { name: 'Reportes', path:'reportes', status: false }
      ],
      activemenu: 0
    }
  },
  created() {
    this.activemenu = this.$store.getters.doneActiveMenu
  }

}
</script>
<style lang="scss">
  .ly_default{
    height: 100vh;
    font-family: Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

    &__navbar{
      display: flex;
      position: relative;
      background-color: #fefefe;
      height: 50px;
      box-shadow: inset 0 -1px 0 rgba(240,240,240,1);
      &--logo{
        height: 50px;
        width: 162px;
        background: url(~assets/img/logo.svg);
        background-size: 120px;
        background-position-x: 15px;
        background-position-y: center;
        background-repeat: no-repeat;
      }
      &--menu{
        display: flex;
        align-items: center;
        margin: 0;
        .item{
          display: block;
          float: left;
          margin-right: 10px;
          position: relative;
          padding: 12px 10px;
          height: 100%;
          transform: translateZ(0);
          backface-visibility: hidden;
          a{
            font-size: 13px;
            font-family: Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            font-weight: 500;
            background-color: transparent;
            color: #242629;
            border-color: transparent;
            &:hover{
              color: #053974;
              text-decoration: none;
            }
          }
          &.active{
            a{
              color: #053974;
              font-weight: 700;
            }
          }
        }
      }
    }
  }
</style>
