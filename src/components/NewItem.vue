<template>
  <q-page class="q-pa-md column items-center">
    <q-btn label="New Item" @click="toggleForm" color="primary" />

    <q-form v-if="showForm" @submit="submitForm">
      <q-input v-model="formData.name" label="Name of the item" />
      <q-input v-model="formData.type" label="Type of the item" />
      <q-input
        v-model="formData.amount"
        label="Amount of the item"
        type="number"
        prefix="$"
      />
      <q-input filled v-model="formData.date" mask="date" :rules="['date']">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date v-model="formData.date">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-input v-model="formData.comment" label="Comment" />
      <q-btn type="submit" label="Submit" color="primary" class="q-mt-md" />
      <q-popup-proxy
        ref="qDatePopup"
        transition-show="scale"
        transition-hide="scale"
        anchor="bottom middle"
      >
      </q-popup-proxy>
    </q-form>
    <q-inner-loading
      :showing="uploading"
      label="Please wait..."
      label-class="text-teal"
      label-style="font-size: 1.1em"
    />
  </q-page>
</template>

<script>
import { uploadTransactionFunction } from '../services/transactionsService';
export default {
  name: 'NewItem',
  data() {
    return {
      showForm: false,
      formData: {
        name: '',
        type: '',
        amount: '',
        date: '',
        comment: '',
      },
      uploading: false,
    };
  },
  methods: {
    toggleForm() {
      this.showForm = !this.showForm;
    },
    openDatePicker(event) {
      this.$refs.qDatePopup.show(event);
    },
    closeDatePicker() {
      this.$refs.qDatePopup.hide();
    },
    async submitForm() {
      this.uploading = true;
      const newTransaction = {
        user_id: localStorage.getItem('user_id') - '0',
        item_name: this.formData.name,
        type: this.formData.type,
        amount: parseFloat(this.formData.amount),
        comment: this.formData.comment,
        date: '2024-07-20T00:00:00Z',
      };
      const res = await uploadTransactionFunction(newTransaction);
      console.log(res);
      this.uploading = false;
      this.showForm = false;
      this.$emit('fetchTransactions');
    },
  },
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
