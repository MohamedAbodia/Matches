<script setup>
  import { toPng } from 'html-to-image';

  const props = defineProps({
    matchRef: { required: true },
    matchText: { required: true },
  });

  const saveMatchAsImage = async () => {
    const imageUrl = await toPng(props.matchRef);
    const matchName = `${props.matchText} [Arab Sat Sharing]`;
    download(imageUrl, matchName);
  };

  const download = (dataUrl, name) => {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = name;
    link.click();
  };
</script>

<template>
  <button aria-label="Save match card as an image" @click="saveMatchAsImage">
    <Icon name="iconoir:screenshot" size="18" />
  </button>
</template>
