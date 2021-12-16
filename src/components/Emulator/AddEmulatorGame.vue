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
          v-model="EmulatorGame.title"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="rating">Rating</label>
        <input
          type="number"
          class="form-control"
          id="rating"
          required
          v-model="EmulatorGame.rating"
          name="description"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="EmulatorGame.description"
          name="description"
        />
      </div>

      <div class="form-group">
        <label for="genre">Genre</label>
        <input
          class="form-control"
          id="genre"
          required
          v-model="EmulatorGame.genre"
          name="description"
        />
      </div>

      <button @click="saveEmulatorGame" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newEmulatorGame">Add</button>
    </div>
  </div>
</template>

<script>
import EmulatorGamesDataService from "../services/EmulatorGamesDataService";

export default {
  name: "add-EmulatorGame",
  data() {
    return {
      EmulatorGame: {
        id: null,
        title: "",
        description: "",
        genre: "",
        rating: null,
        console: ""
      },
      submitted: false
    };
  },
  methods: {
    saveEmulatorGame() {
      var data = {
        title: this.EmulatorGame.title,
        description: this.EmulatorGame.description,
        rating: this.EmulatorGame.rating,
        genre: this.EmulatorGame.genre,
        console: this.EmulatorGame.console
      };

      EmulatorGamesDataService.create(data)
        .then(response => {
          this.EmulatorGame.id = response.data.id;
          //console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    newEmulatorGame() {
      this.submitted = false;
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
