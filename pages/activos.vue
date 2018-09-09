<template>
  <section class="activos">
    <div class="activos__sidebar">
      <side-bar></side-bar>
    </div>
    <div class="activos__content">
<b-container fluid>
    <b-row>
      <b-col md="6" class="my-1">
        <b-form-group horizontal label="Filter" class="mb-0">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Type to Search" />
            <b-input-group-append>
              <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col md="6" class="my-1">
        <b-form-group horizontal label="Sort" class="mb-0">
          <b-input-group>
            <b-form-select v-model="sortBy" :options="sortOptions">
              <option slot="first" :value="null">-- none --</option>
            </b-form-select>
            <b-form-select :disabled="!sortBy" v-model="sortDesc" slot="append">
              <option :value="false">Asc</option>
              <option :value="true">Desc</option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col md="6" class="my-1">
        <b-form-group horizontal label="Sort direction" class="mb-0">
          <b-input-group>
            <b-form-select v-model="sortDirection" slot="append">
              <option value="asc">Asc</option>
              <option value="desc">Desc</option>
              <option value="last">Last</option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col md="6" class="my-1">
        <b-form-group horizontal label="Per pstock" class="mb-0">
          <b-form-select :options="pstockOptions" v-model="perPstock" />
        </b-form-group>
      </b-col>
    </b-row>

    <b-table show-empty
             stacked="md"
             :items="items"
             :fields="fields"
             :current-pstock="currentPstock"
             :per-pstock="perPstock"
             :filter="filter"
             :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc"
             :sort-direction="sortDirection"
             class="tablaActivos"
             @filtered="onFiltered"
    >
      <template slot="name" slot-scope="row">{{row.value.first}} {{row.value.last}}</template>
      <template slot="isActive" slot-scope="row">{{row.value?'SI':'NO'}}</template>
      <template slot="actions" slot-scope="row">
        <b-button size="sm" @click.stop="info(row.item, row.index, $event.target)" class="mr-1">
          Info modal
        </b-button>
        <b-button size="sm" @click.stop="row.toggleDetails">
          {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
        </b-button>
      </template>
      <template slot="row-details" slot-scope="row">
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value}}</li>
          </ul>
        </b-card>
      </template>
    </b-table>

    <b-row>
      <b-col md="6" class="my-1">
        <b-pagination :total-rows="totalRows" :per-pstock="perPstock" v-model="currentPstock" class="my-0" />
      </b-col>
    </b-row>
    <b-modal id="modalInfo" @hide="resetModal" :title="modalInfo.title" ok-only>
      <pre>{{ modalInfo.content }}</pre>
    </b-modal>

  </b-container>
    </div>
  </section>
</template>

<script>
const items = [
  { isActive: true, stock: 40, name: { first: ' ', last: 'Cables 30 cat 5' } },
  { isActive: false, stock: 21, name: { first: ' ', last: 'UPS marca APC' } },
  {
    isActive: false,
    stock: 9,
    name: { first: ' ', last: 'Switch Cisco 3460' },
    // _rowVariant: 'success'
  },
  { isActive: false, stock: 89, name: { first: ' ', last: 'Cables 3m cat6' } },
  { isActive: true, stock: 38, name: { first: ' ', last: 'Cables 30 cat 5' } },
  { isActive: false, stock: 27, name: { first: ' ', last: 'UPS marca Elise' } },
  { isActive: true, stock: 40, name: { first: ' ', last: 'Switch Cisco 3460' } },
  {
    isActive: true,
    stock: 87,
    name: { first: ' ', last: 'UPS marca APC' },
    _cellVariants: { stock: 'danger', isActive: 'warning' }
  },
  { isActive: false, stock: 26, name: { first: ' ', last: 'Cables 3m cat6' } },
  { isActive: false, stock: 22, name: { first: ' ', last: 'Cables 30 cat 5' } },
  { isActive: true, stock: 38, name: { first: ' ', last: 'UPS marca Elise' } },
  { isActive: false, stock: 29, name: { first: ' ', last: 'Switch Cisco 3460' } }
]
import axios from '~/plugins/axios'
import SideBar from '~/components/SideBar.vue'
export default {
  data() {
    return {
      items: items,
      fields: [
        { key: 'name', label: 'Nombre', sortable: true, sortDirection: 'desc' },
        { key: 'stock', label: 'stock', sortable: true, 'class': 'text-center' },
        { key: 'isActive', label: 'Active' },
        { key: 'actions', label: 'Actions' }
      ],
      currentPstock: 1,
      perPstock: 5,
      totalRows: items.length,
      pstockOptions: [ 5, 10, 15 ],
      sortBy: null,
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      modalInfo: { title: '', content: '' }
    }
  },
  computed: {
    sortOptions () {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => { return { text: f.label, value: f.key } })
    }
  },
  components: {
    'sideBar': SideBar
  },
  middleware: 'auth',
  head () {
    return {
      title: 'Users'
    }
  },
  mounted () {
    const self = this
    console.log(self.$store.getters)
  },
  methods: {
    async logout () {
      try {
        await this.$store.dispatch('logout');
      } catch (e) {
        this.formError = e.messstock;
      }
    },
    info (item, index, button) {
      this.modalInfo.title = `Row index: ${index}`
      this.modalInfo.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', 'modalInfo', button)
    },
    resetModal () {
      this.modalInfo.title = ''
      this.modalInfo.content = ''
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pstocks due to filtering
      this.totalRows = filteredItems.length
      this.currentPstock = 1
    }
  }
}
</script>

<style lang="scss">
.activos{
  height: calc(100% - 50px);
  position: relative;
  display: flex;
  font-family: Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  &__sidebar{
    width: 300px;
    box-shadow: 1px 3px 0 #f0f0f0;
  }
  &__content{
    width: fill-available;
  }
}
.tablaActivos{
  font-family: Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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
