<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by title"
          v-model="title"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchTitle"
          >
            Search
          </button>
          By User<input type="checkbox" ref="byUser" id="byUser" :v-model="byUser" >
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Emulator Games List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(emulatorGame, index) in emulatorGames"
          :key="index"
          @click="setActiveVideoGame(emulatorGame, index)"
        >
          {{ EmulatorGame.title }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllEmulatorGames">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentEmulatorGame">
        <h4>Emulator Game</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentEmulatorGame.title }}
        </div>
        <div>
          <label><strong>Description:</strong></label> {{ currentEmulatorGame.description }}
        </div>
        <div>
          <label><strong>Review:</strong></label> {{ currentEmulatorGame.review }}
        </div>
        <div>
          <label><strong>Status:</strong></label> {{ currentEmulatorGame.published ? "Published" : "Pending" }}
        </div>
        <div>
          <label><strong>Rating:</strong></label> {{ currentEmulatorGame.rating }}
        </div>
        <div>
          <label><strong>Genre:</strong></label> {{ currentEmulatorGame.genre }}
        </div>
        <div>
          <label><strong>User:</strong></label> {{ currentEmulatorGame.user }}
        </div>        
        <router-link :to="'/EmulatorGames/' + currentEmulatorGame.id" class="badge badge-warning">Edit</router-link>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Emulator Game...</p>
      </div>
    </div>
  </div>
</template>

<script>
import EmulatorGamesDataService from "../services/EmulatorGamesDataService";

export default {
  name: "EmulatorGames-list",
  data() {
    return {
      EmulatorGames: [],
      currentEmulatorGame: null,
      currentIndex: -1,
      title: "",
    };
  },
  methods: {
    retrieveEmulatorGames() {
      EmulatorGamesDataService.getAll()
        .then(response => {
          this.EmulatorGame = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveEmulatorGames();
      this.currentEmulatorGame = null;
      this.currentIndex = -1;
    },

    setActiveEmulatorGame(EmulatorGames, index) {
      this.currentEmulatorGame = EmulatorGames;
      this.currentIndex = index;
    },

    removeAllEmulatorGames() {
      EmulatorGamesDataService.deleteAll()
        .then(() => {
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchTitle() {
      let searchByTitle = true;
      
      if (searchByTitle) {
        EmulatorGamesDataService.findByTitle(this.title)
          .then(response => {
            this.EmulatorGame = response.data;
          })
          .catch(e => {
            console.log(e);
          });
      }else{
        EmulatorGamesDataService.getAllByUser(this.title)
          .then(response => {
            this.EmulatorGame = response.data;
          })
          .catch(e => {
            console.log(e);
          });
      }
    }
  },
  mounted() {
    this.retrieveEmulatorGame();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
