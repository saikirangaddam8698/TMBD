<template>
    <div class="tvshows row p-5">
        <div class="col-12 col-sm-6 col-md-4 col-lg-3" v-for="(item, index) in tvshowsData" :key="index">
            <div class="card tvshows__card tvshows-card p-3" @click="openModel(item)">
                <img :src="getImageUrl(item.poster_path)" alt="poster" class="tvshows-card__image card-img-top">
                <div class="card-body ">
                    <h6 class="d-flex align-items-center justify-content-center tvshows-card__txt"><b>{{
                        item.original_name
                            }}</b></h6>
                    <p class=" d-flex align-items-center justify-content-center"><b>{{ item.first_air_date }}</b></p>
                </div>
            </div>
        </div>

        <!-- Modal Overlay -->
        <div v-if="selectedtvshow" :class="['modal-overlay', { show: selectedtvshow }]"></div>

        <!-- Modal Content -->
        <div v-if="selectedtvshow" :class="['movies__modal', { show: selectedtvshow }]">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header d-flex flex-row flex">
                        <img :src="getImageUrl(selectedtvshow.poster_path)" alt="poster" class="modal-image">
                        <div>
                            <h3>{{ selectedtvshow.original_name }}</h3>
                            <p>{{ selectedtvshow.first_air_date }}</p>
                            <p>language: <b>{{ selectedtvshow.original_language }}</b></p>
                            <p>Rating: <b>{{ selectedtvshow.vote_average }}</b></p>
                            <p><b>Overview: </b>{{ selectedtvshow.overview }}</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" @click="closeModal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios';
export default {
    name: 'tvshowsPage',
    data() {
        return {
            tvshowsData: [],
            selectedtvshow: null,

        }
    },
    methods: {
        fetchtvshows() {
            const config = {
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NGJlMWUzMTk2YzcwZmM2ZjUxOTEwYmFlN2JjZGRhZCIsIm5iZiI6MTcyOTY4MDczMi45MDEsInN1YiI6IjY3MThkNTVjYzc4MDJjYzUwMzU5YTcxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mmd_oVE0cpvWbt-rGore0a7z864gQUWvcR87QE-Tg24'
                }
            };

            axios
                .get(
                    'https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc',
                    config
                )
                .then(response => {
                    this.tvshowsData = response.data.results;
                    console.log(response.data);
                })
                .catch(error => {
                    console.error("error in fetching Tvshows", error);
                });
        },
        getImageUrl(path) {
            if (!path) {
                return 'path/to/placeholder.jpg';
            }
            return `https://image.tmdb.org/t/p/w500${path}`;
        },

        openModel(tvshow) {
            this.selectedtvshow = tvshow;
            console.log("selected tvshow", this.selectedtvshow);
        },
        closeModal() {
            this.selectedtvshow = null;
        }
    },
    mounted() {
        this.fetchtvshows();
    }

}

</script>