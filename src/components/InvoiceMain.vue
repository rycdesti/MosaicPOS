<template>
  <div class="h-screen">
    <div class="flex justify-center items-center h-16 font-bold text-2xl text-white bg-sky-400">Mosaic POS</div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-x-0">
      <div class="col-span-2">
        <customer-invoice :invoice-data="invoiceData"
                          @removeProduct="removeProduct"
                          @cancelInvoice="cancelInvoice"/>
      </div>
      <div class="col-span-4">
        <product-list @addProduct="addProduct"/>
      </div>
    </div>
  </div>
</template>

<script>
import CustomerInvoice from '@/components/invoice/CustomerInvoice';
import ProductList from '@/components/ProductList';

export default {
  name: 'InvoiceMain',
  components: {
    CustomerInvoice,
    ProductList
  },
  data () {
    return {
      invoiceData: []
    }
  },
  methods: {
    addProduct (data) {
      this.invoiceData.push(data)
    },
    removeProduct (key) {
      this.invoiceData.splice(key, 1)
    },
    cancelInvoice () {
      this.invoiceData = []
    }
  }
}
</script>

<style scoped>

</style>