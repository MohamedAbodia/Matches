<script setup>
  defineProps({ channelSatInfo: { type: Array, required: true } });
</script>

<template>
  <div class="divide-y-[0.25px] divide-gray-300 dark:divide-blue-200">
    <p v-if="!channelSatInfo.length" class="text-center text-sm">
      لا يوجد معلومات
    </p>

    <div
      v-for="(item, index) in channelSatInfo"
      v-else
      :key="index"
      class="grid grid-cols-2 grid-rows-2 gap-x-2 gap-y-1 p-1 sm:grid-cols-[1fr_0.75fr_0.75fr_0.75fr] sm:grid-rows-1"
    >
      <!-- Satellite -->
      <div class="info-item">
        <Icon name="gis:satellite" />
        <p class="caption">
          {{ item.satName }}
          ({{ item.satPosition.value }} {{ item.satPosition.direction }})
        </p>
      </div>

      <!-- Frequency -->
      <div class="info-item">
        <Icon name="icon-park-outline:waves-right" />
        <p class="caption">{{ item.frequency }}</p>
      </div>

      <!-- Symbol Rate -->
      <div class="info-item">
        <Icon name="tabler:wave-square" />
        <p class="caption">{{ item.symbol }}</p>
      </div>

      <!-- Encryption -->
      <div class="info-item">
        <Icon name="fluent:shield-16-filled" />
        <p class="caption">{{ item.encryption }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .info-item {
    @apply flex items-center gap-1;

    p {
      @apply line-clamp-1;
    }
  }
</style>
