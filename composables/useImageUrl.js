export default function () {
  return {
    getCompetitionUrl: (competitionName) => {
      return competitionName
        ? `/Competitions/${competitionName.replaceAll(' ', '_')}`
        : '';
    },

    getTeamUrl: (teamName) => {
      return teamName ? `/Teams/${teamName.replaceAll(' ', '_')}` : '';
    },

    getBeinChannelUrl: (beinChannelName) => {
      return beinChannelName
        ? `/Channels/beIN_Sports_MENA_${beinChannelName.replaceAll(' ', '_')}`
        : '';
    },

    getChannelUrl: (channelName) => {
      return `/Channels/${channelName
        .replaceAll(' ', '_')
        .replaceAll('#', '')
        .replaceAll('*', '')}`;
    },
  };
}
