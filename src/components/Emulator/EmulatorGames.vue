<template>
  <div v-if="currentEmulatorGame" class="edit-form">
    <h4>Emulator Game</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title"
          v-model="currentEmulatorGame.title"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input type="text" class="form-control" id="description"
          v-model="currentEmulatorGame.description"
        />
      </div>

      <div class="form-group">
        <label for="review">Review</label>
        <textarea class="form-control" id="review"
          v-model="currentEmulatorGame.review"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentEmulatorGame.published ? "Published" : "Pending" }}
      </div>
    </form>

    <button class="badge badge-primary mr-2"
      v-if="currentEmulatorGame.published"
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
      @click="deleteEmulatorGame"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateEmulatorGame"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Emulator Game...</p>
  </div>
</template>

<script>
import EmulatorGamesDataService from "../services/EmulatorGamesDataService";

export default {
  name: "EmulatorGame",
  data() {
    return {
      currentEmulatorGame: null,
      message: ''
    };
  },
  methods: {
    getEmulatorGame(id) {
      EmulatorGamesDataService.get(id)
        .then(response => {
          this.currentEmulatorGame = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentEmulatorGame.id,
        title: this.currentEmulatorGame.title,
        description: this.currentEmulatorGame.description,
        published: status
      };

      EmulatorGamesDataService.update(this.currentEmulatorGame.id, data)
        .then(() => {
          this.currentEmulatorGame.published = status;
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateEmulatorGame() {
      EmulatorGamesDataService.update(this.currentEmulatorGame.id, this.currentEmulatorGame)
        .then(() => {
          this.message = 'The Emulator Game was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteEmulatorGame() {
      EmulatorGamesDataService.delete(this.currentEmulatorGame.id)
        .then(() => {
          this.$router.push({ name: "EmulatorGame" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getEmulatorGame(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
