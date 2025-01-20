<template>
    <div>
        <div class="tmbdBody d-flex flex-column justify-content-center">
            <div class="tmbdBody__tophead d-flex flex-column align-items-center mb-3 mt-0">
                <h1>Welcome</h1>
                <h2>Millons of movies, Tv shows and people to discover more</h2>
            </div>
            <div class="d-flex justify-content-center align-items-baseline">
                <input type="text" placeholder="search for any movie, tv shows, actor etc...."
                    class="tmbdBody__searchInput p-3">
                <i class="fas fa-search tmbdBody__searchIcon"></i>
            </div>
        </div>
        <div class="trending">
            <h1 class="trending__heading ms-3 mt-2"><strong>Trending</strong></h1>
            <div class="trending__Card trending-Card d-flex p-3">
                <div class="card trending-Card__main p-2" v-for="(trend_item, index) in trendingData" :key="index">
                    <img :src="getImageUrl(trend_item.poster_path)" alt="poster" class="trending-Card__image">
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "homePagee",
    data() {
        return {
            trendingData: []
        }
    },
    methods: {
        fetchTrending() {
            const config = {
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NGJlMWUzMTk2YzcwZmM2ZjUxOTEwYmFlN2JjZGRhZCIsIm5iZiI6MTcyOTY4MDczMi45MDEsInN1YiI6IjY3MThkNTVjYzc4MDJjYzUwMzU5YTcxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mmd_oVE0cpvWbt-rGore0a7z864gQUWvcR87QE-Tg24'
                }
            };

            axios
                .get(
                    'https://api.themoviedb.org/3/trending/all/day?language=en-US',
                    config
                )
                .then(response => {
                    this.trendingData = response.data.results;
                    console.log(response.data);
                })
                .catch(error => {
                    console.error("error in fetching movies", error);
                });
        },
        getImageUrl(path) {
            if (!path) {
                return 'path/to/placeholder.jpg';
            }
            return `https://image.tmdb.org/t/p/w500${path}`;
        }
    },
    mounted() {
        this.fetchTrending();
    },
}


</script>

<style>

</style>