<template>
  <span :class="badgeColorClasses">
    <slot />
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: {
    type: Boolean,
    required: false,
    default: '',
  },
})

const badgeColorClasses = computed(() => {
  if(props.status == 1){
    return 'bg-green-500 bg-opacity-25 px-2 py-1 text-sm  text-green-900 uppercase font-normal text-center block'
  }else if(props.status == 0){
    return 'bg-red-300 bg-opacity-50 px-2  py-1 text-sm  text-red-900 uppercase font-normal text-center block'
  }else{
    return 'bg-gray-500 bg-opacity-25 px-2 py-1 text-sm  text-gray-900 uppercase font-normal text-center block'
  }
})
</script>
