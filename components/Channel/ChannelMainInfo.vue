<script setup>
  defineProps({ channelMainInfo: { type: Object, required: true } });

  const imgUrl = useImageUrl();
</script>

<template>
  <div
    class="flex flex-col justify-between gap-1.5 2xs:flex-row-reverse 2xs:items-center"
  >
    <!-- isFree & Resoultion -->
    <div class="flex items-center gap-1.5">
      <Icon
        v-if="channelMainInfo.is4K"
        name="bi:badge-4k-fill"
        size="14px"
        class="text-green-900 dark:text-green-200"
      />
      <Icon
        v-else-if="channelMainInfo.isHD"
        name="bi:badge-hd-fill"
        size="14px"
        class="text-green-700 dark:text-green-400"
      />
      <Icon v-else name="bi:badge-sd-fill" size="14px" class="text-red-400" />

      <Icon
        v-if="channelMainInfo.isFree"
        name="ion:unlocked"
        size="14px"
        class="text-green-700 dark:text-green-400"
      />
      <Icon v-else name="ion:locked" size="14px" class="text-red-400" />
    </div>

    <!-- Name & Image -->
    <div class="flex items-center">
      <BaseImg
        :src="imgUrl.getChannelUrl(channelMainInfo.name)"
        width="64"
        class="inline-block h-6 w-6 object-contain"
      />
      <p class="ml-2 inline-block">{{ channelMainInfo.name }}</p>
    </div>
  </div>
</template>
