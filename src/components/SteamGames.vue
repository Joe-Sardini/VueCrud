<template>
    <div>
        <div>76561198241670740</div>
        <div>76561197972375532</div>
        <b-button @click="SaveData">Save</b-button>
        <b-button @click="LoadData">Load</b-button>
        <div>
            <ul>
                <li v-for="(item,index) in items" :key="index">
                    <div>
                        <button @click="getGameData(item.appid, index)">{{index}}) Get Data</button>   <B>{{item.gameName}}</B> {{item.appid}} || {{formatPlaytime(item.playtime_windows_forever)}} hours ({{item.playtime_windows_forever}} mins) 
                    </div>
                    <div :ref="`gd${index}`"></div>
                </li>
            </ul>
        </div>
    <div ref="jsonOut"></div>
    </div>
</template>

<script>
import axios from "axios";
import SteamGamesDataService from "../services/SteamGamesDataService";

export default {
    mounted() {
        //this.getGamesList();
    },
    data() {
        return {
            items: [],
            currentSteamGame: {}
        }
    },
    methods: {
        formatPlaytime(mins){
            return (mins/60).toFixed(2);
        },
        getSteamGame(id){
            SteamGamesDataService.getbyAppid(id)
                .then(response => {
                    console.log(response);
                    //this.currentSteamGame = response.data;
                })
                .catch(e => {
                    console.log(e);
                });
        },
        getGamesList(){
            const config = {
                'url':'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/',
                'method':'get',
                'params': {
                    'key':'8CF244EFA0DF168CE2F2F4D63E1F01A8',
                    'steamid': '76561197972375532', //'76561198241670740',
                    'format':'json' 
                },
            }
            try {
                axios.request(config).then(res => {
                    this.$refs.jsonOut.innerText = JSON.stringify(res.data.response.games);
                    this.items = res.data.response.games;
                    return res;
                });
            }catch(e){
                console.log(e);
            }
        },
        LoadData() {
            SteamGamesDataService.getAll().then(res => {
                this.items = res.data;
            });
        },
        SaveData(){
             this.items.forEach(e => {
                 this.saveSteamGame(e);
             });
        },
        saveSteamGame(entry) {
            let data = {
                appid: entry.appid,
                playtime_windows_forever: entry.playtime_windows_forever,
            };
            SteamGamesDataService.create(data)
                    .then(response => {
                    //this.videoGame.id = response.data.id;
                    //this.submitted = true;
                    console.log("resp" + response);
                })
                .catch(e => {
                    console.log(e);
                });
        },
        getGameData(appid, divID){
            const config = {
                'url':'https://store.steampowered.com/api/appdetails/',
                'method':'get',
                'params': {
                    'appids': appid, //'76561198241670740',
                },
            }
            axios.request(config).then(res => {
                if (res.data[appid].data) {
                        this.$refs['gd'+divID][0].innerHTML = `<H2>${res.data[appid].data.name}</H2><BR>`;
                        this.updateSteamGame(appid,res.data[appid].data.name);
                        res.data[appid].data.screenshots.forEach(e => {
                        this.$refs['gd'+divID][0].innerHTML += `<img src='${e.path_thumbnail}' width='100px' height='100px'/>`;
                    });
                }
                //this.getSteamGame(appid);
                return res;
            });
        },
        updateSteamGame(appid, gameName){
            SteamGamesDataService.updateByAppid(appid,{'gameName':gameName})
                .catch(e => {
                    console.log(e);
                });
        }
    }
}
</script>

