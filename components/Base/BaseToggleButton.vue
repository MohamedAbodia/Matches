<script setup>
  defineProps({ isActive: { type: Boolean, required: true } });
  defineEmits(['update:isActive']);
</script>

<template>
  <button
    aria-label="Collapse or expand menu"
    @click="$emit('update:isActive', !isActive)"
    class="transition-colors hover:text-blue-300 dark:hover:text-blue-200"
  >
    <Icon
      name="fluent:chevron-down-16-regular"
      :class="{ 'rotate-180 ': isActive }"
      class="transition-transform"
    />
  </button>
</template>
