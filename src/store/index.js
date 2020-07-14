import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

const SPOTIFY_URI = 'https://api.spotify.com/v1/me';

Vue.use(Vuex);
const defaultState = {
  accessToken: '',
  userProfile: {},
  topTracksCurrent: [],
  topTracksAllTime: [],
  hasStartedLoading: false,
};

export default new Vuex.Store({
  state: { ...defaultState },
  mutations: {
    setAccessToken(state, token) {
      state.accessToken = token;
    },
    setUserProfile(state, userProfile) {
      state.userProfile = userProfile;
    },
    setTopTracksCurrent(state, topTracks) {
      state.topTracksCurrent = topTracks;
    },
    setTopTracksAllTime(state, topTracks) {
      state.topTracksAllTime = topTracks;
    },
    setTopArtistsCurrent(state, topArtists) {
      state.topArtistsCurrent = topArtists;
    },
    setTopArtistsAllTime(state, topArtists) {
      state.topArtistsAllTime = topArtists;
    },
    setLoadingStatus(state, loadingStatus) {
      state.hasStartedLoading = loadingStatus;
    },
    logout(state) {
      Object.assign(state, { ...defaultState });
    },
  },
  actions: {
    async fetchUserProfile({ commit, state }) {
      const response = await axios.get(`${SPOTIFY_URI}`, {
        headers: {
          Authorization: `Bearer ${state.accessToken}`,
        },
      });
      commit('setUserProfile', response.data);
    },
    async fetchTop({ commit, state }, { type, limit = 20, timeRange }) {
      const response = await axios.get(
        `${SPOTIFY_URI}/top/${type}?limit=${limit}&time_range=${timeRange}`,
        {
          headers: {
            Authorization: `Bearer ${state.accessToken}`,
          },
        }
      );
      if (timeRange === 'short_term') {
        if (type === 'tracks') {
          commit('setTopTracksCurrent', response.data.items);
        }
        if (type === 'artists') {
          commit('setTopArtistsCurrent', response.data.items);
        }
      }
      if (timeRange === 'long_term') {
        if (type === 'tracks') {
          commit('setTopTracksAllTime', response.data.items);
        }
        if (type === 'artists') {
          commit('setTopArtistsAllTime', response.data.items);
        }
      }
    },
  },
  modules: {},
});
