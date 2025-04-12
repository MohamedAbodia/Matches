<script setup>
  const colorMode = useColorMode();

  const toggleColorMode = () => {
    colorMode.preference = colorMode.preference === 'light' ? 'dark' : 'light';
  };
</script>

<template>
  <ClientOnly>
    <button @click="toggleColorMode" aria-label="Toggle white/dark mode">
      <Icon name="bx:sun" size="20px" v-if="colorMode.value === 'light'" />
      <Icon name="bx:moon" size="20px" v-else />
    </button>
  </ClientOnly>
</template>
