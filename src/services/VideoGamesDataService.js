import http from "../http-common";

class VideoGamesDataService {
  getAll() {
    return http.get("/videoGames");
  }

  get(id) {
    return http.get(`/videoGames/${id}`);
  }

  create(data) {
    return http.post("/videoGames", data);
  }

  update(id, data) {
    return http.put(`/videoGames/${id}`, data);
  }

  delete(id) {
    return http.delete(`/videoGames/${id}`);
  }

  deleteAll() {
    return http.delete(`/videoGames`);
  }

  findByTitle(title) {
    return http.get(`/videoGames?title=${title}`);
  }

  getAllByUser(user) {
    return http.get(`/videoGames/user/${user}`);
  }
}

export default new VideoGamesDataService();
