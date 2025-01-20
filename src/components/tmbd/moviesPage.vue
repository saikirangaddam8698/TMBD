<template>
    <div class="movies row p-5">
        <div class="col-12 col-sm-6 col-md-4 col-lg-3" v-for="(item, index) in moviesData" :key="index">
            <div class="card movies__card movies-card p-3" @click="openModel(item)">
                <img :src="getImageUrl(item.poster_path)" alt="poster" class="movies-card__image card-img-top">
                <div class="card-body">
                    <h6 class="d-flex align-items-center justify-content-center movies-card__txt"><b>{{ item.title
                            }}</b></h6>
                    <p class="d-flex align-items-center justify-content-center"><b>{{ item.release_date }}</b></p>
                </div>
            </div>
        </div>

        <!-- Modal Overlay -->
        <div v-if="selectedMovie" :class="['modal-overlay', { show: selectedMovie }]"></div>

        <!-- Modal Content -->
        <div v-if="selectedMovie" :class="['movies__modal', { show: selectedMovie }]">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header d-flex flex-start">
                        <img :src="getImageUrl(selectedMovie.poster_path)" alt="poster" class="modal-image">
                        <div>
                            <h3>{{ selectedMovie.title }}</h3>
                            <p>{{ selectedMovie.release_date }}</p>
                            <p>language: <b>{{ selectedMovie.original_language }}</b></p>
                            <p>Rating: <b>{{ selectedMovie.vote_average }}</b></p>
                            <p>{{ selectedMovie.overview }}</p>
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
    name: 'moviesPage',
    data() {
        return {
            moviesData: [],
            selectedMovie: null,
        }
    },
    methods: {
        fetchMovies() {
            const config = {
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NGJlMWUzMTk2YzcwZmM2ZjUxOTEwYmFlN2JjZGRhZCIsIm5iZiI6MTcyOTY4MDczMi45MDEsInN1YiI6IjY3MThkNTVjYzc4MDJjYzUwMzU5YTcxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mmd_oVE0cpvWbt-rGore0a7z864gQUWvcR87QE-Tg24'
                }
            };

            axios
                .get(
                    'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc',
                    config
                )
                .then(response => {
                    this.moviesData = response.data.results; // Ensure tableData matches your response data structure
                    console.log(response.data);
                })
                .catch(error => {
                    console.error("error in fetching movies", error); // Use console.error for errors
                });
        },
        getImageUrl(path) {
            if (!path) {
                return 'path/to/placeholder.jpg';
            }
            return `https://image.tmdb.org/t/p/w500${path}`;
        },

        openModel(movie) {
            this.selectedMovie = movie;
            console.log("selected movie", this.selectedMovie);
        },
        closeModal() {
            this.selectedMovie = null;
        }
    },
    mounted() {
        this.fetchMovies();
    }

}

</script>