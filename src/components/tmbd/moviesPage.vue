<template>
    <div class="movies row p-5">
        <div class="col-12 col-sm-6 col-md-4 col-lg-3" v-for="(item, index) in paginatedMovies" :key="index">
            <div class="card movies__card movies-card p-3" @click="openModel(item)">
                <img :src="getImageUrl(item.poster_path)" alt="poster" class="movies-card__image">
                <div class="card-body">
                    <h6 class="movies-card__txt"><b>{{ item.title }}</b></h6>
                    <p><b>{{ item.release_date }}</b></p>
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
import { mapState, mapActions } from 'vuex';

export default {
    name: 'moviesPage',
    data() {
        return {
            selectedMovie: null,
        }
    },
    computed: {
        ...mapState(['moviesData', 'searchTxt']),
        // ...mapMutations(['searchTxt']),

        paginatedMovies() {
            if (!this.searchTxt) {
                return this.moviesData;
            }
            const searchLower = this.searchTxt.toLowerCase();
            return this.moviesData.filter(movie => movie.title.toLowerCase().includes(searchLower));
        }
    },
    methods: {
        ...mapActions(['fetchMovies']),
        fetchMovies() {
            this.$store.dispatch('fetchData', { apiType: 'movies' });
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