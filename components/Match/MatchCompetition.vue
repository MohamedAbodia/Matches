<script setup>
  defineProps({ competition: { type: Object, required: true } });

  const imgUrl = useImageUrl();
</script>

<template>
  <div class="flex items-center gap-2">
    <BaseImg
      :src="imgUrl.getCompetitionUrl(competition.name)"
      :alt="`${competition.name} logo`"
      class="h-6 w-6"
      width="64"
    />
    <p>
      {{ competition.name }}
      <span v-if="competition.stage"> - {{ competition.stage }}</span>
    </p>
  </div>
</template>
