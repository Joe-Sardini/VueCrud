import http from "../http-common";

class SteamGamesDataService {
  getAll() {
    return http.get("/SteamGames");
  }

  get(id) {
    return http.get(`/SteamGames/${id}`);
  }

  getbyAppid(id) {
    return http.get(`/SteamGames/appid/${id}`);
  }

  create(data) {
    return http.post("/SteamGames", data);
  }

  update(id, data) {
    return http.put(`/SteamGames/${id}`, data);
  }

  updateByAppid(id, data) {
    return http.put(`/SteamGames/appid/${id}`, data);
  }

  delete(id) {
    return http.delete(`/SteamGames/${id}`);
  }

  deleteAll() {
    return http.delete(`/SteamGames`);
  }

  findByTitle(title) {
    return http.get(`/SteamGames?title=${title}`);
  }
}

export default new SteamGamesDataService();
