<template>
  <div class="sidebar">
    <div class="sidebar__admin">
      <p>CREAR SOLICITUD</p>
      <div class="sidebar__admin--items">
        <span>Nuevo usuario</span>
      </div>
    </div>
    <div class="sidebar__filter">
      <p>FILTRO</p>
      <div class="sidebar__filter--item">
        <span>Proveedor</span>
        <vue-autosuggest :suggestions="filteredOptions" :on-selected="onSelected" :limit="10" :input-props="inputProps" ref="refAutoProveedor">
          <template slot-scope="{suggestion}">
            <span class="my-suggestion-item">{{suggestion.item.name}}</span>
          </template>
        </vue-autosuggest>
        <div class="selectedProveedores">
          <div v-for="(item, $i) in selectedProveedor" @click="borrarSeleccion('proveedores',$i)">
            <span>{{item.name}}</span>
          </div>
        </div>
      </div>
      <div class="sidebar__filter--item">
        <span>Marca</span>
        <vue-autosuggest :suggestions="filteredOptions" :on-selected="onSelected" :limit="10" :input-props="inputProps" ref="refAutoProveedor">
          <template slot-scope="{suggestion}">
            <span class="my-suggestion-item">{{suggestion.item.name}}</span>
          </template>
        </vue-autosuggest>
        <div class="selectedProveedores">
          <div v-for="(item, $i) in selectedProveedor" @click="borrarSeleccion('proveedores',$i)">
            <span>{{item.name}}</span>
          </div>
        </div>
      </div>
      <div class="sidebar__filter--item">
        <span>Modelo</span>
        <vue-autosuggest :suggestions="filteredOptions" :on-selected="onSelected" :limit="10" :input-props="inputProps" ref="refAutoProveedor">
          <template slot-scope="{suggestion}">
            <span class="my-suggestion-item">{{suggestion.item.name}}</span>
          </template>
        </vue-autosuggest>
        <div class="selectedProveedores">
          <div v-for="(item, $i) in selectedProveedor" @click="borrarSeleccion('proveedores',$i)">
            <span>{{item.name}}</span>
          </div>
        </div>
      </div>
      <div class="sidebar__filter--item">
        <span>Status</span>
        <b-form-checkbox-group id="checkboxes2" name="flavour2" v-model="selected">
            <b-form-checkbox v-model="status" value="activo">Activo</b-form-checkbox>
            <b-form-checkbox value="inactivo">Inactivo</b-form-checkbox>
            <b-form-checkbox value="consultar">En Proceso</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
      </div>
      <b-button>
        FILTRAR
      </b-button>
    </div>
  </div>
</template>
<script>
import { VueAutosuggest } from 'vue-autosuggest';
export default {
  components: {
      VueAutosuggest
  },
  data () {
    return {
      manu: 'asd',
      proveedores: [{data:['asd']}],
      selectedProveedor: [],
      status: true,
      selected: [],
      options: [{
        data: ['Frodo', 'Samwise', 'Gandalf', 'Galadriel', 'Faramir', 'Éowyn', 'Peregrine Took', 'Boromir', 'Legolas', 'Gimli', 'Gollum', 'Beren', 'Saruman', 'Sauron', 'Théoden']
      }],
      filteredOptions: [],
      inputProps: {
        id: "autosuggest__input",
        onInputChange: this.onInputChange,
        placeholder: "Type 'e'",
        initialValue: ''
      },
      limit: 10
    }
  },
  mounted() {
    const self = this
    self.proveedores[0].data = self.$store.getters['activos/getProveedores']
  },
  methods: {
    borrarSeleccion(lista, i) {
      console.log('entro')
      this.selectedProveedor.splice(i, 1)
    },
    onSelected(option) {
      this.selectedProveedor.push(option.item)
      

      this.$refs.refAutoProveedor.searchInput = ''
    },
    onInputChange(text) {
      if (text === '' || text === undefined) {
        return;
      }
      
      /* Full control over filtering. Maybe fetch from API?! Up to you!!! */
      const filteredData = this.proveedores[0].data.filter(item => {
        var itemreturn = item.name.toLowerCase().indexOf(text.toLowerCase()) > -1;
        return itemreturn
      }).slice(0, this.limit);
      
      this.filteredOptions = [{
        data: filteredData
      }];
      // this.$refs.refAutoProveedor.value = ''

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
  .sidebar{
    font-family: Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-family: Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 9pt;
    color: #52575f;
    padding: 21px;
    p{
      font-family: Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      margin: 0;
      font-size: 7.5pt;
      // font-weight: 700;
      color: #9b9b9b;
    }
    span{
      margin-left: 5px;
      cursor: pointer;
    }
    &__admin{
      padding-bottom: 10px;
      margin-bottom: 20px;
      &::after{
        box-shadow: inset 0px -1.2px 0 #dadada;
        content: '';
        height: 2px;
        display: block;
        margin: 0 12px;
      }
      &--items{
        padding: 10px 0;
      }      
    }
    &__filter{
      &--item{
        padding: 10px 0;
      }
      .selectedProveedores{
        display: flex;
        div{
          border-radius: 6px;
          background: linear-gradient(to right, rgba(1,33,97,1) 0%, rgba(20,97,184,1) 100%);
          display: unset;
          span{
            color:#FFF;
            margin: 0 5px;
          }
        }
      }
    }
  }
  .autosuggest__results-container {
      position: relative;
      width: 100%;
    }
    
    .autosuggest__results {
      font-weight: 300;
      margin: 0;
      position: absolute;
      z-index: 10000001;
      width: 100%;
      border: 1px solid #e0e0e0;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      background: white;
      padding: 0px;
      overflow: scroll;
      max-height: 200px;
    }
    
    .autosuggest__results ul {
      list-style: none;
      padding-left: 0;
      margin: 0;
    }
    
    .autosuggest__results .autosuggest__results_item {
      cursor: pointer;
      padding: 15px;
    }
    
    #autosuggest ul:nth-child(1) > .autosuggest__results_title {
      border-top: none;
    }
</style>



