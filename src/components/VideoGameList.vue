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
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Video Games List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(videogame, index) in videogames"
          :key="index"
          @click="setActiveVideoGame(videogame, index)"
        >
          {{ videogame.title }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllVideoGames">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentVideoGame">
        <h4>Video Game</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentVideoGame.title }}
        </div>
        <div>
          <label><strong>Description:</strong></label> {{ currentVideoGame.description }}
        </div>
        <div>
          <label><strong>Status:</strong></label> {{ currentVideoGame.published ? "Published" : "Pending" }}
        </div>
        <div>
          <label><strong>Rating:</strong></label> {{ currentVideoGame.rating }}
        </div>
        <div>
          <label><strong>Genre:</strong></label> {{ currentVideoGame.genre }}
        </div>
        <div>
          <label><strong>User:</strong></label> {{ currentVideoGame.user }}
        </div>        
        <router-link :to="'/videogames/' + currentVideoGame.id" class="badge badge-warning">Edit</router-link>
      </div>
      <div v-else>
        <br />
        <p>Please click on a video game...</p>
      </div>
    </div>
  </div>
</template>

<script>
import VideoGamesDataService from "../services/VideoGamesDataService";

export default {
  name: "videogames-list",
  data() {
    return {
      videogames: [],
      currentVideoGame: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
    retrievevideogames() {
      console.log("File");
      VideoGamesDataService.getAll()
        .then(response => {
          this.videogames = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrievevideogames();
      this.currentVideoGame = null;
      this.currentIndex = -1;
    },

    setActiveVideoGame(videogames, index) {
      this.currentVideoGame = videogames;
      this.currentIndex = index;
    },

    removeAllVideoGames() {
      VideoGamesDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchTitle() {
      VideoGamesDataService.findByTitle(this.title)
        .then(response => {
          this.videogamess = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrievevideogames();
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
