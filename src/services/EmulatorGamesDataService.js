import http from "../http-common";

class EmulatorGamesDataService {
  getAll() {
    return http.get("/EmulatorGames");
  }

  get(id) {
    return http.get(`/EmulatorGames/${id}`);
  }

  create(data) {
    return http.post("/EmulatorGames", data);
  }

  update(id, data) {
    return http.put(`/EmulatorGames/${id}`, data);
  }

  delete(id) {
    return http.delete(`/EmulatorGames/${id}`);
  }

  deleteAll() {
    return http.delete(`/EmulatorGames`);
  }

  findByTitle(title) {
    return http.get(`/EmulatorGames?title=${title}`);
  }
}

export default new EmulatorGamesDataService();
