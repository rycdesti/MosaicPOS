<template>
  <button class="w-full m-2 shadow-md transition duration-100 delay-100 rounded-md" :class="`${backgroundColor} ${selected ? `ring-8 ${ring}` : ''}`">
    <div class="h-full align-middle text-sm p-5 md:text-md lg:text-lg text-white">{{ type }}</div>
  </button>
</template>

<script>
export default {
  name: 'ProductTypeCard',
  props: {
    type: {
      default: 'Not Available',
      type: String
    },
    backgroundColor: {
      default: 'white',
      type: String
    },
    hover: {
      default: 'bg-slate-500',
      type: String
    },
    ring: {
      default: 'ring-slate-300',
      type: String
    },
    selected: {
      default: false,
      type: Boolean
    }
  }
}
</script>

<style scoped>

</style>