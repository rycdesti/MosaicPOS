<template>
  <div class="relative z-10 ease-out duration-300 ease-in duration-200" aria-labelledby="modal-title" role="dialog" aria-modal="true" :class="`${hidden ? 'hidden' : ''}`">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div class="relative transform overflow-hidden rounded-md bg-white text-center shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex text-center">
              <div class="mt-3 text-left sm:mt-0">
                <div class="font-bold text-lg">Mosaic POS Receipt</div>

                <div v-if="data.hasOwnProperty('products')" class="p-8">
                  <div class="mb-8 text-sm">Customer Name: <span class="font-bold">{{ data.customerName }}</span></div>

                  <div class="text-left grid grid-cols-4 gap-4" v-for="(product, key) in data.products" :key="key">
                    <div class="text-sm col-span-3">{{ product.name }}(x{{ product.quantity }})</div>
                    <div class="text-sm text-right">{{ itemComputedPrice(product) }}</div>
                  </div>
                  ---------------------------------------------
                  <div class="text-left grid grid-cols-4 gap-y-0">
                    <div class="text-xs col-span-3">Sub-total: </div>
                    <div class="text-xs text-right">{{ data.grossAmount.toFixed(2) }}</div>
                    <div class="text-xs col-span-3">VAT (12%): </div>
                    <div class="text-xs text-right">{{ data.vatAmount.toFixed(2) }}</div>
                    <div class="col-span-3 font-bold">Amount: </div>
                    <div class="font-bold text-right">{{ data.netAmount.toFixed(2) }}</div>
                    <div class="text-xs col-span-3">Cash: </div>
                    <div class="text-xs text-right">{{ data.payment.toFixed(2) }}</div>
                    <div class="text-xs col-span-3">Change: </div>
                    <div class="text-xs text-right">{{ data.change.toFixed(2) }}</div>
                  </div>
                </div>
                <div class="flex text-center mt-4">Thank you!</div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button type="button" class="cancel-btn" v-on:click="close">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InvoiceModal',
  props: {
    hidden: {
      default: true,
      type: Boolean
    },
    data: {
      default: () => {
        return null
      },
      type: Object
    }
  },
  data () {
    return {
    }
  },
  methods: {
    itemComputedPrice (props) {
      return (props.price * props.quantity).toFixed(2)
    },
    close () {
      this.$emit('closeModal')
    }
  }
}
</script>

<style scoped>
.add-btn {
  @apply inline-flex w-full justify-center rounded-md border border-transparent bg-sky-400 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm
}
.cancel-btn {
  @apply mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm
}
</style>