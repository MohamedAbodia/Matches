<script setup>
  const channelsStore = useChannelsStore();

  const props = defineProps({ match: { type: Object, required: true } });
  const mena = props.match.channels.mena;
  const free = props.match.channels.free;
  const encrypted = props.match.channels.encrypted;

  const matchRef = ref(null);
</script>

<template>
  <div
    v-if="match"
    ref="matchRef"
    class="flex flex-col gap-2 rounded bg-gray-100 p-4 dark:bg-blue-500"
    :class="{ 'pb-0': channelsStore.getIsChannelsHidden }"
  >
    <div class="flex items-center justify-between gap-2">
      <MatchCompetition :competition="match.competition" />
      <MatchScreenshot
        :match-ref="matchRef"
        :match-text="match.teams.fullText"
      />
    </div>
    <MatchHeading :teams="match.teams" :time="match.time" />
    <MatchChannels :channels="mena"> القنوات العربية </MatchChannels>
    <MatchChannels :channels="free"> القنوات المجانية </MatchChannels>
    <MatchChannels :channels="encrypted"> القنوات المشفرة </MatchChannels>
  </div>
</template>
