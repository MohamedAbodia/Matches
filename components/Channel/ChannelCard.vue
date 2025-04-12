<script setup>
  defineProps({ channel: { type: Object, required: true } });

  const isSatInfoVisible = ref(false);
</script>

<template>
  <div
    v-auto-animate
    class="rounded-sm bg-blue-200 px-2 py-1 hover:cursor-pointer dark:bg-blue-300"
    @click="isSatInfoVisible = !isSatInfoVisible"
  >
    <ChannelMainInfo :channel-main-info="channel.mainInfo" />
    <ChannelSatInfo
      v-if="isSatInfoVisible"
      :channel-sat-info="channel.satInfo"
    />
  </div>
</template>
