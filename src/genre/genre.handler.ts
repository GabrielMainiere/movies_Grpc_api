import { GenreService } from "./genre.service";

const genreService = new GenreService();

export const GenreHandler = {
  ListGenres(call: any, callback: any): void {
    callback(null, { genres: genreService.list() });
  },

  GetGenreById(call: any, callback: any): void {
    callback(null, genreService.getById(call.request.id));
  },

  CreateGenre(call: any, callback: any): void {
    const { name } = call.request;
    callback(null, genreService.create(name));
  },

  UpdateGenre(call: any, callback: any): void {
    callback(null, genreService.update(call.request));
  },

  DeleteGenre(call: any, callback: any): void {
    genreService.delete(call.request.id);
    callback(null, {});
  },
};
