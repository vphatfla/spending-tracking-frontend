<template>
  <q-page class="q-pa-md flex flex-center">
    <h4 v-show="u_name !== ''">Hello, {{ u_name }}</h4>
    <div class="q-pa-md column items-center" style="width: 100%">
      <q-card
        flat
        bordered
        class="q-pa-md"
        style="max-width: 900px; width: 100%"
      >
        <div class="row items-center justify-end q-mb-md">
          <q-input
            borderless
            dense
            debounce="300"
            v-model="filter"
            placeholder="Search"
            style="max-width: 150px; width: 100%"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
        <q-table
          title="Spending"
          :rows="getRows"
          :columns="columns"
          row-key="id"
          dense
        />
      </q-card>
      <q-separator class="q-my-md" />
      <div flat bordered class="q-pa-md" style="max-width: 400px; width: 100%">
        <new-item @fetchTransactions="fetchTransactions"></new-item>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { QTableProps } from 'quasar';
import { getTransactionsByUserId } from '../services/transactionsService';
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import NewItem from '../components/NewItem.vue';
import { getAccountDetails } from 'src/services/accountService';
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}-${day}-${year}`;
};
const cols: QTableProps['columns'] = [
  {
    name: 'item_name',
    required: true,
    label: 'Item Name',
    align: 'left',
    field: 'item_name',
    sortable: true,
  },
  {
    name: 'type',
    align: 'center',
    label: 'Type',
    field: 'type',
    sortable: true,
  },
  {
    name: 'amount',
    align: 'center',
    label: 'Amount',
    field: 'amount',
    sortable: true,
  },
  {
    name: 'date',
    align: 'center',
    label: 'Date',
    format: (val) => `${formatDate(val)}`,
    field: 'date',
    sortable: true,
  },
  {
    name: 'comment',
    align: 'center',
    label: 'Comment',
    field: 'comment',
    sortable: true,
  },
];
export default defineComponent({
  name: 'TransactionsView',
  components: {
    NewItem,
  },
  data() {
    return {
      columns: cols,
      rows: [],
      date: Date,
      filter: '',
      u_name: '',
    };
  },
  computed: {
    getRows() {
      return this.rows;
    },
  },
  methods: {
    async fetchTransactions() {
      console.log('fetch');
      const route = useRoute();
      const user_id = localStorage.getItem('user_id') || route.query.user_id;
      const res = await getTransactionsByUserId(user_id);
      this.fetchUserInformation(user_id);
      this.rows = res;
    },
    /* eslint-disable @typescript-eslint/no-explicit-any */
    async fetchUserInformation(user_id: any) {
      const res = await getAccountDetails(user_id);
      console.log('res u = ' + res);
      this.u_name = res.name;
    },
  },
  mounted() {
    this.fetchTransactions();
  },
});
</script>
