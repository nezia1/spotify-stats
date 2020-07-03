import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";

const SPOTIFY_URI = "https://api.spotify.com/v1/me";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accessToken: "",
    userProfile: {},
    topTracksCurrent: [],
    topTracksAllTime: []
  },
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
    logout(state) {
      state.accessToken = "";
      state.userProfile = "";
      state.topTracksCurrent = [];
      state.topTracksAllTime = [];
    }
  },
  actions: {
    async fetchUserProfile({ commit, state }) {
      const response = await axios.get(`${SPOTIFY_URI}`, {
        headers: {
          Authorization: `Bearer ${state.accessToken}`
        }
      });
      commit("setUserProfile", response.data);
      return response;
    },
    async fetchTopTracks({ commit, state }, { limit = 20, timeRange = "medium_term" }) {
      const response = await axios.get(
        `${SPOTIFY_URI}/top/tracks?limit=${limit}&time_range=${timeRange}`,
        {
          headers: {
            Authorization: `Bearer ${state.accessToken}`
          }
        }
      );
      switch (timeRange) {
        case "short_term":
          commit("setTopTracksCurrent", response.data.items);
          break;
        case "long_term":
          commit("setTopTracksAllTime", response.data.items);
          break;
        default:
          break;
      }
      return response;
    }
  },
  modules: {},
  plugins: [createPersistedState("accessToken")]
});
