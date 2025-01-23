<template>
    <div class="actors row p-5">
        <div class="col-12 col-sm-6 col-md-4 col-lg-3" v-for="(item, index) in paginatedActors" :key="index">
            <div class="card actors__card actors-card p-3" @click="openModel(item)">
                <img :src="getImageUrl(item.profile_path)" alt="poster" class="actors-card__image card-img-top">
                <div class="card-body ">
                    <h6 class="d-flex align-items-center justify-content-center actors-card__txt"><b>{{ item.name
                            }}</b></h6>
                    <p class=" d-flex align-items-center justify-content-center"><b>Role: {{ item.known_for_department
                            }}</b></p>
                </div>
            </div>
        </div>
        <div v-if="selectedActor" :class="['modal-overlay', { show: selectedActor }]"></div>

        <!-- Modal Content -->
        <div v-if="selectedActor" :class="['actors__modal', { show: selectedActor }]">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header d-flex">
                        <img :src="getImageUrl(selectedActor.profile_path)" alt="poster" class="modal-image">
                        <div class="modal-header d-flex flex-column flex-start">
                            <h3>{{ selectedActor.name }}</h3>
                            <p>{{ selectedActor.known_for_department }}</p>
                            <p>{{ selectedActor.original_name }}</p>
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
    name: 'actorsPage',
    data() {
        return {
            selectedActor: null,
        }
    },
    computed: {
        ...mapState(['actorsData', 'searchTxt']),
        paginatedActors() {
            if (!this.searchTxt) {
                return this.actorsData;
            }
            const searchLower = this.searchTxt.toLowerCase();
            return this.actorsData.filter(actor => actor.name.toLowerCase().includes(searchLower));
        }
    },
    methods: {
        ...mapActions(['mapActors']),
        fetchActors() {
            this.$store.dispatch('fetchData', { apiType: 'actors' });
        },
        getImageUrl(path) {
            if (!path) {
                return 'path/to/placeholder.jpg';
            }
            return `https://image.tmdb.org/t/p/w500${path}`;
        },

        openModel(actor) {
            this.selectedActor = actor;
            console.log("selected actor", this.selectedActor);
        },
        closeModal() {
            this.selectedActor = null;
        },
    },
    mounted() {
        this.fetchActors();
    },

}

</script>