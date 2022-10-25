<template>
  <div class="w-full justify-center bg-white rounded-md shadow-md">
    <div>
      <img class="flex mx-auto object-cover rounded-t-md" :src="image" alt="product image" />
    </div>
    <div class="pl-4 pr-4 pt-4 pb-4 align-bottom">
      <div class="grid grid-cols-5 gap-4 text-left text-sm">
        <div class="col-span-3">{{ productName }}</div>
        <div class="col-span-2 text-right font-bold">P{{ price.toFixed(2) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    image: {
      default: require('@/assets/grapes.jpg'),
      type: String
    },
    productName: {
      default: 'Not Available',
      type: String
    },
    price: {
      default: 0.00,
      type: Number
    }
  }
}
</script>

<style scoped>

</style>