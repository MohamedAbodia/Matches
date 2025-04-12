<script setup>
  defineProps({ competition: { type: Object, required: true } });
  const isMatchesVisible = ref(true);

  const imgUrl = useImageUrl();
</script>

<template>
  <div v-auto-animate>
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <BaseImg
          :src="imgUrl.getCompetitionUrl(competition.name)"
          :alt="`${competition.name} logo`"
          class="h-8 w-8"
          width="72"
        />
        <h2 class="text-xl font-medium text-blue-300 dark:text-blue-200">
          {{ competition.name }}
        </h2>
      </div>

      <div class="flex items-center gap-2">
        <p class="tag bg-blue-300 font-semibold dark:bg-blue-200">
          {{ competition.matches.length }}
        </p>

        <BaseToggleButton v-model:is-active="isMatchesVisible" />
      </div>
    </div>

    <MatchesWrapper :matches="competition.matches" v-if="isMatchesVisible" />
  </div>
</template>
