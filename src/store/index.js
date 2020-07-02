import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

const SPOTIFY_URI = "https://api.spotify.com/v1/me";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accessToken: "",
    userProfile: {},
    topTracks: {}
  },
  mutations: {
    setAccessToken(state, token) {
      state.accessToken = token;
    },
    setUserProfile(state, userProfile) {
      state.userProfile = userProfile;
    },
    setTopTracks(state, topTracks) {
      state.topTracks = topTracks;
    },
    logout(state) {
      state.accessToken = "";
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
    async fetchTopTracks({ commit, state }, limit = 50) {
      const response = await axios.get(`${SPOTIFY_URI}/top/tracks?limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${state.accessToken}`
        }
      });
      commit("setTopTracks", response.data);
      return response.data;
    }
  },
  modules: {}
});
