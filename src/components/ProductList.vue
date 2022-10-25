<template>
  <div class="mr-4">
    <form class="m-8 mr-4 sm:ml-10 lg:ml-2 flex items-center" @submit.prevent="searchProduct">
      <label class="sr-only">Search</label>
      <div class="relative w-full">
        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg aria-hidden="true"
               class="w-5 h-5 text-gray-500 dark:text-gray-400"
               fill="currentColor"
               viewBox="0 0 20 20"
               xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
        </div>
        <input type="text"
               v-model="searchValue"
               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md w-full pl-10 p-4"
               placeholder="Search for Product">
      </div>
      <button type="submit" class="submit-btn" v-on:submit.prevent="searchProduct">
        <svg class="w-5 h-5"
             fill="none"
             stroke="currentColor"
             viewBox="0 0 24 24"
             xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      </button>
    </form>

    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 m-8 sm:ml-10 lg:ml-2">
      <div class="cursor-pointer" v-for="prop in productTypes" :key="prop.type" v-on:click="setProductType(prop.category)">
        <product-type-card :type="prop.type"
                           :background-color="prop.color"
                           :hover="prop.hover"
                           :ring="prop.ring"
                           :selected="selectedType === prop.category"/>
      </div>
    </div>
    <div v-if="filteredProducts.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 m-8 sm:ml-10 lg:ml-2">
      <div class="cursor-pointer" v-for="(prop, key) in filteredProducts" :key="key" v-on:click="openModal(prop)">
        <product-card :productName="prop.name"
                      :price="prop.price"
                      :image="prop.image"/>
      </div>
    </div>
    <div v-else class="pb-8">No Products Available</div>

    <product-modal :product="product"
                   :hidden="modalHidden"
                   @submitModal="submitModal"
                   @closeModal="modalHidden = true"/>
  </div>
</template>

<script>

import ProductTypeCard from '@/components/product/ProductTypeCard';
import ProductCard from '@/components/product/ProductCard';
import ProductModal from '@/components/product/ProductModal';

export default {
  name: 'ProductList',
  components: {
    ProductTypeCard,
    ProductCard,
    ProductModal
  },
  watch: {
    searchValue: function (newVal) {
      if (!newVal) {
        this.setProductType(this.selectedType)
      }
    }
  },
  data () {
    return {
      searchValue: '',
      selectedType: 1,
      modalHidden: true,
      product: {
        name: '',
        price: 0.00,
        image: ''
      },
      productTypes: [
        { type: 'All', color: 'bg-slate-300', hover: 'bg-slate-500', ring: 'ring-slate-300', category: 0 },
        { type: 'Fruits', color: 'bg-red-400', hover: 'bg-red-500', ring: 'ring-red-400', category: 1 },
        { type: 'Drinks', color: 'bg-indigo-400', hover: 'bg-indigo-500', ring: 'ring-indigo-400', category: 2 },
        { type: 'Appetizers', color: 'bg-pink-400', hover: 'bg-pink-500', ring: 'ring-pink-400', category: 3 },
        { type: 'Sandwiches', color: 'bg-cyan-400', hover: 'bg-cyan-500', ring: 'ring-cyan-400', category: 4 },
      ],
      productList: [
        { name: 'Grapes', price: 15.99, category: 1, image: require('@/assets/grapes.jpg') },
        { name: 'Apples', price: 29.99, category: 1, image: require('@/assets/apples.jpg') },
        { name: 'Oranges', price: 35.00, category: 1, image: require('@/assets/oranges.jpg') },
        { name: 'Lemons', price: 40.00, category: 1, image: require('@/assets/lemons.jpg') },
        { name: 'Bananas', price: 12.99, category: 1, image: require('@/assets/bananas.jpg') },
        { name: 'Iced Tea', price: 18.00, category: 2, image: require('@/assets/tea.jpg') },
        { name: 'Coca-Cola', price: 25.00, category: 2, image: require('@/assets/coke.jpg') }
      ],
      filteredProducts: []
    }
  },
  mounted () {
    this.setProductType(0)
  },
  methods: {
    setProductType (category) {
      this.selectedType = category
      if (category) {
        this.filteredProducts = this.productList.filter(data => data.category === category)
      } else {
        this.filteredProducts = this.productList
      }
    },
    searchProduct () {
      if (this.searchValue) {
        this.filteredProducts = this.productList.filter(data => data.name.toLowerCase().includes(this.searchValue.toLowerCase()))
      } else {
        this.setProductType(this.selectedType)
      }
    },
    openModal (prop) {
      this.product = prop
      this.modalHidden = false
    },
    submitModal (data) {
      this.$emit('addProduct', data)
    }
  }
}
</script>

<style scoped>
  .submit-btn {
    @apply p-4 ml-2 text-sm font-medium text-white bg-sky-400 rounded-lg border border-sky-400 hover:bg-sky-500
  }
</style>