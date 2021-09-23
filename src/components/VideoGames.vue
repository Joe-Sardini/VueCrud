<template>
  <div v-if="currentVideoGame" class="edit-form">
    <h4>Video Game</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title"
          v-model="currentVideoGame.title"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input type="text" class="form-control" id="description"
          v-model="currentVideoGame.description"
        />
      </div>

      <div class="form-group">
        <label for="review">Review</label>
        <textarea class="form-control" id="review"
          v-model="currentVideoGame.review"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentVideoGame.published ? "Published" : "Pending" }}
      </div>
    </form>

    <button class="badge badge-primary mr-2"
      v-if="currentVideoGame.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button v-else class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button>

    <button class="badge badge-danger mr-2"
      @click="deleteVideoGame"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateVideoGame"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Video Game...</p>
  </div>
</template>

<script>
import VideoGamesDataService from "../services/VideoGamesDataService";

export default {
  name: "videogame",
  data() {
    return {
      currentVideoGame: null,
      message: ''
    };
  },
  methods: {
    getVideoGame(id) {
      VideoGamesDataService.get(id)
        .then(response => {
          this.currentVideoGame = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentVideoGame.id,
        title: this.currentVideoGame.title,
        description: this.currentVideoGame.description,
        review: this.currentVideoGame.review,
        published: status
      };

      VideoGamesDataService.update(this.currentVideoGame.id, data)
        .then(() => {
          this.currentVideoGame.published = status;
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateVideoGame() {
      VideoGamesDataService.update(this.currentVideoGame.id, this.currentVideoGame)
        .then(() => {
          this.message = 'The video game was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteVideoGame() {
      VideoGamesDataService.delete(this.currentVideoGame.id)
        .then(() => {
          this.$router.push({ name: "videogame" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getVideoGame(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
