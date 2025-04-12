<script setup>
  defineProps({ channels: { type: Array, required: true } });
  const channelsStore = useChannelsStore(); // Global State Switch Button
  const isChannelsVisible = ref(false); // Component Arrow Button
</script>

<template>
  <div
    v-auto-animate
    v-if="!channelsStore.getIsChannelsHidden && channels.length"
    class="border-t border-gray-200 pt-2 dark:border-blue-400"
  >
    <div class="flex items-center justify-between gap-2 [direction:rtl]">
      <div>
        <Icon name="majesticons:tv-old-line" />
        <p class="mr-2 inline-block"><slot /></p>
      </div>

      <div class="flex items-center gap-2">
        <p class="tag bg-blue-400 text-xs font-bold leading-6">
          {{ channels.length }}
        </p>

        <BaseToggleButton v-model:is-active="isChannelsVisible" />
      </div>
    </div>

    <div class="mt-2 flex flex-col gap-2" v-if="isChannelsVisible">
      <ChannelCard
        v-for="(channel, index) in channels"
        :key="index"
        :channel="channel"
      />
    </div>
  </div>
</template>
