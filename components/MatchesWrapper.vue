<script setup>
  defineProps({ matches: { type: Array, required: true } });
</script>

<template>
  <div class="mt-2 flex flex-col gap-2">
    <MatchCard
      v-auto-animate
      v-for="(match, index) in matches"
      :key="index"
      :match="match"
    />
  </div>
</template>
