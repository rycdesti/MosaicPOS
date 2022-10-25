<template>
  <div class="mt-8 pl-8 mr-8 md:pr-8 pb-8 lg:pr-2 overflow-x-hidden">
    <div>
      <div class="h-96 overflow-x-auto relative shadow-md rounded-md">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="py-3 px-6">Product name</th>
            <th scope="col" class="py-3 px-6">Quantity</th>
            <th scope="col" class="py-3 px-6">Price</th>
            <th scope="col" class="py-3 px-6">Total</th>
            <th scope="col" class="py-3 px-6">Action</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(data, key) in invoiceData" class="bg-white border-b dark:bg-gray-900 dark:border-gray-700" :key="key">
            <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {{ data.name }}
            </th>
            <td class="py-4 px-6">
              {{ data.quantity }}
            </td>
            <td class="py-4 px-6">
              {{ data.price }}
            </td>
            <td class="py-4 px-6">
              {{ itemComputedPrice(data) }}
            </td>
            <td class="py-4 px-6">
              <button class="inline-flex items-center px-2 py-2 bg-red-500 hover:bg-red-500 text-white text-sm font-medium rounded-md"
                      v-on:click="removeProduct(key)">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <form class="mt-10 shadow-md p-6" v-on:submit.prevent="printInvoice">
        <div class="grid grid-cols-3 gap-4 text-left items-center">
          <div>
            <span class="font-bold">Customer Name:</span>
          </div>
          <div class="col-span-2">
            <input type="text"
                   v-model="customerName"
                   required
                   class="rounded-md w-full focus:ring-0 border border-gray-300 text-left"/>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-4 text-left items-center mt-2">
          <div>
            <span class="font-bold">Payment Received:</span>
          </div>
          <div>
            <input type="number"
                   v-model="payment"
                   required
                   class="rounded-md w-36 focus:ring-0 border border-gray-300 text-center"/>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 text-left mt-8">
          <div>
            <span class="font-bold">Gross Amount:</span> <span class="font-bold text-lg text-sky-500">{{ computeGrossAmount.toFixed(2) }}</span>
          </div>
          <div>
            <span class="font-bold">Balance Due:</span> <span class="font-bold text-lg text-red-500">{{ computeBalanceDue.toFixed(2) }}</span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 text-left">
          <div>
            <span class="font-bold">Vat Amount (12%):</span> <span class="font-bold text-lg text-sky-500">{{ computeVatAmount.toFixed(2) }}</span>
          </div>
          <div>
            <span class="font-bold">Change Due:</span> <span class="font-bold text-lg text-emerald-500">{{ computeChangeDue.toFixed(2) }}</span>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-4 text-left mt-8">
          <div class="text-2xl items-center">
            <span class="font-bold">Total Amount:</span> <span class="font-bold text-sky-500">{{ computeNetAmount.toFixed(2) }}</span>
          </div>
        </div>


        <div class="grid grid-cols-2 gap-4 mt-8">
          <div class="col-start-2 grid grid-cols-2 gap-4">
            <button type="button" class="cancel-btn" v-on:click="cancelInvoice">Cancel</button>
            <button type="submit" class="done-btn">Done</button>
          </div>
        </div>
      </form>
    </div>

    <invoice-modal
        :hidden="modalHidden"
        :data="modalData"
        @closeModal="closeModal"/>
  </div>
</template>

<script>
import InvoiceModal from '@/components/invoice/InvoiceModal';

export default {
  name: 'CustomerInvoice',
  props: {
    invoiceData: {
      default: function () {
        return []
      },
      type: Array
    }
  },
  components: {
    InvoiceModal
  },
  computed: {
    computeGrossAmount () {
      let grossAmount = 0;
      this.invoiceData.forEach(item => {
        grossAmount += (item.price * item.quantity)
      })
      return grossAmount
    },
    computeVatAmount () {
      return this.computeGrossAmount * this.vat
    },
    computeNetAmount () {
      return this.computeGrossAmount + this.computeVatAmount
    },
    computeBalanceDue () {
      return this.payment <= this.computeNetAmount ?  this.computeNetAmount - this.payment : 0.00
    },
    computeChangeDue () {
      return this.payment >= this.computeNetAmount ? this.payment - this.computeNetAmount : 0.00
    }
  },
  data () {
    return {
      modalHidden: true,
      vat: 0.12,
      payment: null,
      customerName: '',
      modalData: {}
    }
  },
  methods: {
    itemComputedPrice (props) {
      return (props.price * props.quantity).toFixed(2)
    },
    removeProduct (key) {
      this.$emit('removeProduct', key)
    },
    printInvoice () {
      let balanceDue = this.computeBalanceDue
      if (!this.invoiceData.length) {
        alert('There are no products added in the cart.')
        return;
      }
      if (balanceDue) {
        alert('Can\'t proceed. Balance should be equal to zero (0).')
        return;
      }
      this.modalData = {
        products: this.invoiceData,
        grossAmount: this.computeGrossAmount,
        vatAmount: this.computeVatAmount,
        netAmount: this.computeNetAmount,
        change: this.computeChangeDue,
        vat: this.vat,
        payment: this.payment,
        customerName: this.customerName
      }
      this.modalHidden = false
    },
    cancelInvoice () {
      this.payment = null
      this.customerName = ''
      this.$emit('cancelInvoice')
    },
    closeModal () {
      this.cancelInvoice()
      this.modalHidden = true
    }
  }
}
</script>

<style scoped>
  .cancel-btn {
    @apply inline-flex w-full justify-center rounded-md border border-transparent bg-sky-400 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-sky-500 sm:ml-3 sm:w-auto sm:text-sm
  }
  .done-btn {
    @apply mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm
  }
</style>