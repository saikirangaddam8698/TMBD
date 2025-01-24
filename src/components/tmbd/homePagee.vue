<template>
    <div>
        <div class="tmbdBody d-flex flex-column justify-content-center">
            <div class="tmbdBody__tophead d-flex flex-column align-items-center mb-3 mt-0">
                <h1>Welcome</h1>
                <h2>Millons of movies, Tv shows and people to discover more</h2>
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
import { mapState, mapActions } from 'vuex';

export default {
    name: "homePagee",
    computed: {
        ...mapState(['trendingData']),

    },
    methods: {
        ...mapActions(['fetchTrending']),
        getImageUrl(path) {
            if (!path) {
                return 'path/to/placeholder.jpg';
            }
            return `https://image.tmdb.org/t/p/w500${path}`;
        }
    },
    mounted() {
        this.fetchTrending()
    }
}
</script>
