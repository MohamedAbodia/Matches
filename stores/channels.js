export const useChannelsStore = defineStore('channels', {
  state: () => ({
    isChannelsHidden: false,
  }),

  getters: {
    getIsChannelsHidden: (state) => state.isChannelsHidden,
  },

  actions: {
    toggleChannels() {
      this.isChannelsHidden = !this.isChannelsHidden;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useChannelsStore, import.meta.hot));
}
