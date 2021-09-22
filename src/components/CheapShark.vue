<template>
    <div>
        Cheap Shark
        <div class="navButtons">
            <b-button @click="paginate(-1)" variant="success">&lt;</b-button>
            {{pageNum}}
            <b-button @click="paginate(1)" variant="success">&gt;</b-button>
        </div>
        <b-table striped hover :items="items" :fields="fields" ref="cheapList" dark :busy="isBusy">
            <template #cell(thumb)="data">
                <img :src="data.value" /> 
            </template>
            <template #cell(dealID)="data">
                <a :href="`https://www.cheapshark.com/redirect?dealID=${data.value}`" target="_blank">Link</a> 
            </template>
            <template #table-busy>
                <div class="text-center text-danger my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Loading...</strong>
                </div>
            </template>
        </b-table>
        <div class="navButtons">
            <b-button @click="paginate(-1)" variant="success">&lt;</b-button>
            {{pageNum}}
            <b-button @click="paginate(1)" variant="success">&gt;</b-button>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    mounted() {
        this.isBusy = true;
        this.fetchData();
    },
    methods: {
        fetchData(){
            const config = {
                'url':'https://www.cheapshark.com/api/1.0/deals',
                'method':'get',
                'params': {
                    'pageNumber': this.pageNum,
                },
            }
            axios.request(config).then(res => {
                this.items = res.data;
                this.isBusy = false;
                return res;
            });
        },
        paginate(num) {
            this.items.length = 0;
            this.isBusy = true;
            this.pageNum += num;
            this.fetchData();
        }
    },
    data() {
        return {
            pageNum: 0,
            isBusy: true,
            items: [],
            fields: [
                {
                    key: 'thumb',
                    label: 'Image',
                    sortable: false
                }, 
                {
                    key: 'title',
                    sortable: true
                },
                {
                    key: 'salePrice',
                    label: 'Sale Price',
                    sortable: true
                },
                {
                    key: 'normalPrice',
                    label: 'N-Price',
                    sortable: true
                },
                {
                    key: 'steamRatingPercent',
                    sortable: true
                },               
                {
                    key: 'dealRating',
                    sortable: true
                },                    
                {
                    key: 'dealID',
                    label: 'GOTO',
                    sortable: false
                }
            ]
        }
    },

}
</script>

<style scoped>
.navButtons{
    text-align: center;
}
</style>