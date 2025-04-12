<script setup>
  defineProps({ isActive: { type: Boolean, required: true } });
</script>

<template>
  <div class="flex items-center gap-1">
    <button
      :class="
        isActive
          ? 'bg-blue-300 dark:bg-blue-200'
          : 'bg-gray-100 dark:bg-blue-500'
      "
      class="h-4 min-w-[28px] rounded-full p-1 transition-colors duration-500"
      aria-label="Toggle Channels"
    >
      <div
        :class="{ '-translate-x-3': isActive }"
        class="h-2 w-2 transform rounded-full bg-white shadow-md transition-all duration-500"
      />
    </button>
    <p><slot /></p>
  </div>
</template>
