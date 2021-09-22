<template>
    <div>
        <div>76561198241670740</div>
        <div>76561197972375532</div>
        <b-button @click="doSearch">Search</b-button>
        <input v-model="userid" placeholder="user id">
        <div>
            <img :src="imgAvatar">
            <img :src="imgAvatarFull">
        </div>

        <div>
            
        </div>
        <div>
            <div ref="imageContainer">

            </div>
            <b-table striped hover :items="items" @row-clicked="myRowClickHandler" ref="friendsList">
            </b-table>
        </div>
    <b-button @click="SaveData">Save</b-button>
    </div>
</template>

<script>
import axios from "axios";
import SteamGamesDataService from "../services/SteamGamesDataService";

export default {
    mounted() {
        this.getGamesList();
    },
    data() {
        return {
            steamData: {},
            userid: '',
            imgAvatar: '',
            imgAvatarFull: '',
            userrealname: '',
            friendList: [],
            items: []
        }
    },
    methods: {
        SaveData(){
            console.log(this.steamData);
        },
        saveSteamGame(entry) {
            let data = {
                title: entry.appid,
                playtime_windows_forever: entry.playtime_windows_forever,
            };

            SteamGamesDataService.create(data)
                    .then(response => {
                    //this.videoGame.id = response.data.id;
                    //this.submitted = true;
                    console.log(response);
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
                    'steamid': '76561197960434622', //'76561198241670740',
                    'format':'json' 
                },
            }
            try {
                axios.request(config).then(res => {
                    console.log(res);
                    return res;
                });
            }catch(e){
                console.log(e);
            }
        },
        rowClicked(item, index, button) {
            console.log(item);
            console.log(index);
            console.log(button);
        },
        configMainAvatar(data) {
            this.imgAvatar = data.data.response.players[0].avatar;
            this.imgAvatarFull = data.data.response.players[0].avatarfull;
            this.userrealname = data.data.response.players[0].realname;
        },
        doSearch() {
            this.getSteamData(this.userid);
            //this.configMainAvatar(this.steamData);
            this.getFriendsList();
        },
        getSteamData(uid){
            const config = {
                'url':'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/',
                'method':'get',
                'params': {
                    'key':'8CF244EFA0DF168CE2F2F4D63E1F01A8',
                    'steamids': uid //'76561198241670740'
                },
            }
            try {
                axios.request(config).then(res => {
                    this.steamData = res;
                    return res;
                });
            }catch(e){
                console.log(e);
            }
        },
        getFriendsList() {
            const config = {
                'url':'http://api.steampowered.com/ISteamUser/GetFriendList/v0001/',
                'method':'get',
                'params': {
                    'key':'8CF244EFA0DF168CE2F2F4D63E1F01A8',
                    'relationship':'friend',
                    'steamid': this.userid, //'76561198241670740'
                },
            }
            try {
                axios.request(config).then(res => {
                    this.friendList = res;
                    for (const item of res.data.friendslist.friends){
                        this.items.push(
                            {
                                'steamID':item.steamid,
                                'friendSince':item.friend_since,
                                'userImage': ''
                            }) 
                    }
                });
            }catch(e){
                console.log(e);
           
            }
        },
        myRowClickHandler(record){
            this.getSteamData(record.steamID);
            this.$refs.imageContainer.innerHTML += `<img src='${this.steamData.data.response.players[0].avatarfull}' >`;
        }
    }
}
</script>

