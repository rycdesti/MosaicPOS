<template>
  <div class="relative z-10 transition ease-out duration-300 ease-in duration-200" aria-labelledby="modal-title" role="dialog" aria-modal="true" :class="`${hidden ? 'hidden' : ''}`">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div class="relative transform overflow-hidden rounded-md bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:text-left">
                <div class="text-lg grid grid-cols-5 gap-4 text-left text-sm">
                  <div class="col-span-3">{{ product.name }}</div>
                  <div class="col-span-2 text-right font-bold">P{{ product.price.toFixed(2) }}</div>
                </div>

                <div class="mt-2">
                  <img class="flex mx-auto object-cover rounded-t-md" :src="product.image" alt="product image" />
                </div>

                <div class="flex justify-center items-center mb-4 mt-8">
                  <label class="text-gray-700 mr-4">Quantity:</label>
                  <input type="number"
                         v-model="data.quantity"
                         class="rounded-md w-24 focus:ring-0 border border-gray-300  text-center"
                         min="1"
                         max="50"/>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button type="button" class="add-btn" v-on:click="submit">Add product</button>
            <button type="button" class="cancel-btn" v-on:click="close">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductModal',
  props: {
    product: {
      default: function() {
        return {
          name: '',
          price: 0.00,
          image: ''
        }
      },
      type: Object
    },
    hidden: {
      default: true,
      type: Boolean
    }
  },
  watch: {
    'data.quantity': function (newVal) {
      if (newVal >= 50) {
        this.data.quantity = 50
      }
    }
  },
  data () {
    return {
      data: {
        quantity: 1
      }
    }
  },
  methods: {
    submit () {
      this.$emit('submitModal', Object.assign({}, this.data, this.product))
      this.close()
    },
    close () {
      this.data.quantity = 1
      this.$emit('closeModal')
    }
  }
}
</script>

<style scoped>
  .add-btn {
    @apply inline-flex w-full justify-center rounded-md border border-transparent bg-sky-400 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-sky-500 sm:ml-3 sm:w-auto sm:text-sm
  }
  .cancel-btn {
    @apply mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm
  }
</style>