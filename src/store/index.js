import { createStore } from "vuex";
import axios from "axios";
const store = createStore({
  state: {
    searchTxt: "",
    moviesData: [],
    tvshowsData: [],
    actorsData: [],
    trendingData: [],
  },

  mutations: {
    setSearchTxt(state, text) {
      state.searchTxt = text;
    },
    setMoviesData(state, data) {
      state.moviesData = data;
    },
    setTvShowsData(state, data) {
      state.tvshowsData = data;
    },
    setActorsData(state, data) {
      state.actorsData = data;
    },
    setTrendingData(state, data) {
      state.trendingData = data;
    },
  },

  actions: {
    async fetchData({ commit }, { apiType }) {
      const config = {
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NGJlMWUzMTk2YzcwZmM2ZjUxOTEwYmFlN2JjZGRhZCIsIm5iZiI6MTcyOTY4MDczMi45MDEsInN1YiI6IjY3MThkNTVjYzc4MDJjYzUwMzU5YTcxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mmd_oVE0cpvWbt-rGore0a7z864gQUWvcR87QE-Tg24",
        },
      };

      let allData = [];
      const totalPagesToFetch = 5;

      const fetchPage = async (page) => {
        let url = "";
        if (apiType === "movies") {
          url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`;
        } else if (apiType === "tvshows") {
          url = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc`;
        } else if (apiType === "actors") {
          url = `https://api.themoviedb.org/3/person/popular?language=en-US&page=${page}`;
        }

        try {
          const response = await axios.get(url, config);
          return response.data.results;
        } catch (error) {
          console.error(`Error fetching page ${page}:`, error);
          return [];
        }
      };

      const fetchAllPages = async () => {
        for (let page = 1; page <= totalPagesToFetch; page++) {
          const data = await fetchPage(page);
          if (data.length === 0) break;
          allData = [...allData, ...data];
        }

        if (apiType === "movies") {
          commit("setMoviesData", allData);
        } else if (apiType === "tvshows") {
          commit("setTvShowsData", allData);
        } else if (apiType === "actors") {
          commit("setActorsData", allData);
        }
      };

      fetchAllPages();
    },
    async fetchTrending({ commit }) {
      const config = {
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NGJlMWUzMTk2YzcwZmM2ZjUxOTEwYmFlN2JjZGRhZCIsIm5iZiI6MTcyOTY4MDczMi45MDEsInN1YiI6IjY3MThkNTVjYzc4MDJjYzUwMzU5YTcxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mmd_oVE0cpvWbt-rGore0a7z864gQUWvcR87QE-Tg24",
        },
      };
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/all/day?language=en-US`,
          config
        );
        if (response.data && response.data.results) {
          commit("setTrendingData", response.data.results);
        } else {
          console.warn("No results found in API response.");
        }
      } catch (error) {
        console.error("Error fetching trending data:", error);
      }
    },
  },
});

export default store;
