<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        title="Treats"
        :rows="getRows"
        :columns="columns"
        row-key="item_name"
      />
    </div>
    <div>
      <q-btn
        style="background: rgb(20, 196, 209); color: rgb(0, 0, 0)"
        label="Log In"
        type="submit"
      />
    </div>
    <div class="q-gutter-y-md column" style="max-width: 300px"></div>
  </q-page>
</template>

<script lang="ts">
import { QTableProps } from 'quasar';
import { getTransactionsByUserId } from '../services/transactionsService';
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

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
  data() {
    return {
      columns: cols,
      rows: [],
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
      const user_id = route.query.user_id;
      console.log('user_id' + user_id);
      const res = await getTransactionsByUserId(user_id);
      this.rows = res;
    },
  },
  mounted() {
    this.fetchTransactions();
  },
});
</script>
