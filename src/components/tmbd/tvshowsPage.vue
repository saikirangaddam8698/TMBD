<template>
    <div class="tvshows row p-5">
        <div class="col-12 col-sm-6 col-md-4 col-lg-3" v-for="(item, index) in paginatedTvshows" :key="index">
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
import { mapState, mapActions } from 'vuex';
export default {
    name: 'tvshowsPage',
    data() {
        return {
            selectedtvshow: null,

        }
    },
    computed: {
        ...mapState(['tvshowsData', 'searchTxt']),
        paginatedTvshows() {
            if (!this.searchTxt) {
                return this.tvshowsData;
            }
            const searchLower = this.searchTxt.toLowerCase();
            return this.tvshowsData.filter(tvshow => tvshow.original_name.toLowerCase().includes(searchLower));
        }
    },
    methods: {
        ...mapActions(['fetchtvshows']),
        fetchTvShows() {
            this.$store.dispatch('fetchData', { apiType: 'tvshows' });
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
        this.fetchTvShows();
    },

}

</script>