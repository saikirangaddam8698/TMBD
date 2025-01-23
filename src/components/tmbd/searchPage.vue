<template>
    <div>
        <div class="search">
            <div class="d-flex justify-content-between align-items-center">
                <input type="search__text" placeholder="search here" class="search__input p-1" v-model="searchTxt" @keyup="performSearch">
                <div class="input-group-text p-2 ms-1">
                    <i class="fas fa-search search__icon" @click="performSearch"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
    data() {
        return {
            searchTxt: '',
        }
    },
    methods: {
        ...mapMutations(['setSearchTxt']),
        performSearch() {
            this.setSearchTxt(this.searchTxt);
            console.log("searchTxtvalue", this.searchTxt);
            // const searchitem = this.searchTxt;
            // console.log("search text", searchitem);
            // this.$emit("search-text", searchitem)
        }
    }
}

</script>

<style>

</style>