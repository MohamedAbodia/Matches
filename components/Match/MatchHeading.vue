<script setup>
  defineProps({
    teams: { type: Object, required: true },
    time: { type: Object, required: true },
  });

  const imgUrl = useImageUrl();
</script>

<template>
  <div class="match-heading">
    <div class="team team--home">
      <p class="font-lg font-medium">{{ teams.homeTeam }}</p>

      <BaseImg
        :src="imgUrl.getTeamUrl(teams.homeTeam)"
        :alt="`${teams.homeTeam} emblem`"
        width="64"
        class="h-6 w-6"
      />
    </div>

    <span class="time">{{ time.full }}</span>

    <div class="team team--away">
      <p class="font-lg font-medium">{{ teams.awayTeam }}</p>
      <BaseImg
        :src="imgUrl.getTeamUrl(teams.awayTeam)"
        :alt="`${teams.awayTeam} emblem`"
        width="64"
        class="h-6 w-6"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .match-heading {
    @apply my-2 items-center;
    @apply grid  gap-x-3 gap-y-1.5;
    @apply grid-cols-3 grid-rows-2;
    @apply 2xs:grid-cols-7 2xs:grid-rows-1;
  }

  .team {
    @apply flex items-center justify-between gap-2;
    @apply col-span-2  row-span-1;
    @apply 2xs:col-span-3 2xs:justify-end;

    &--home {
      @apply row-start-1;
    }

    &--away {
      @apply row-start-2;
      @apply 2xs:row-start-1 2xs:flex-row-reverse;
    }
  }

  .time {
    @apply text-center font-semibold text-gray-300  dark:text-blue-100;
    @apply col-span-1 col-start-3 row-span-2 row-start-1;
    @apply 2xs:col-start-4 2xs:-mt-1.5;
  }
</style>
