<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="videoGame.title"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="rating">Rating</label>
        <input
          class="form-control"
          id="rating"
          required
          v-model="videoGame.rating"
          name="description"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="videoGame.description"
          name="description"
        />
      </div>

      <div class="form-group">
        <label for="genre">Genre</label>
        <input
          class="form-control"
          id="genre"
          required
          v-model="videoGame.genre"
          name="description"
        />
      </div>

      <div class="form-group">
        <label for="genre">User</label>
        <input
          class="form-control"
          id="user"
          required
          v-model="videoGame.user"
          name="description"
        />
      </div>

      <button @click="saveVideoGame" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newVideoGame">Add</button>
    </div>
  </div>
</template>

<script>
import VideoGamesDataService from "../services/VideoGamesDataService";

export default {
  name: "add-videoGame",
  data() {
    return {
      videoGame: {
        id: null,
        title: "",
        description: "",
        published: false,
        genre: "",
        rating: null,
        user: ""
      },
      submitted: false
    };
  },
  methods: {
    saveVideoGame() {
      var data = {
        title: this.videoGame.title,
        description: this.videoGame.description,
        rating: this.videoGame.rating,
        genre: this.videoGame.genre,
        user: this.videoGame.user
      };

      VideoGamesDataService.create(data)
        .then(response => {
          this.videoGame.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    newVideoGame() {
      this.submitted = false;
      this.tutorial = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
