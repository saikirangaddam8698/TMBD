<template>
    <div class="container">
        <div class="pushDirective  d-flex flex-column justify-content-center mt-3 p-5">
            <label for="itemname">Name of item</label>
            <input type="text" id="itemname" v-model="itemname"><br>
            <label for="itemNumber">Number of items</label>
            <input type="text" id="itemNumer" v-model="itemnumber"><br>
            <button type="button" class="btn btn-primary" @click="additem">Add</button>

            <h1>List:</h1>
            <ul>
                <li v-for="(list, index) in items" :key="index">{{ list.name }}, {{ list.number }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            itemname: '',
            itemnumber: '',
            items: [],
        }
    },
    methods: {
        additem() {
            let item = {
                name: this.itemname,
                number: this.itemnumber,
            }
            this.items.push(item)
            this.itemname = '',
                this.itemnumber = ''
        }
    }
}

</script>

<style scoped>
.pushDirective{
    width: 500px;
    height: auto;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
}
</style>