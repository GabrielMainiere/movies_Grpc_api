import { IMovie } from "../interfaces/IMovie";
import { MovieService } from "./movie.service";

const movieService = new MovieService();

export const MovieHandler = {
  ListMovies(call: any, callback: any): void {
    callback(null, { movies: movieService.list() });
  },

  GetMovieById(call: any, callback: any): void {
    callback(null, movieService.getById(call.request.id));
  },

    CreateMovie(call: any, callback: any): void {
        const { title, year, genreId } = call.request;

        const newMovie = movieService.create({
            title,
            year,
            genreId,
            actors: []
        });  
        callback(null, newMovie);
    },


  UpdateMovie(call: any, callback: any): void {
    const { id, title, year, genreId, actors } = call.request;
    const movieData: Partial<Omit<IMovie, "id">> = { title, year, genreId, actors };

    const updated = movieService.update(id, movieData);
    if (updated) {
      callback(null, updated);
    } 
  },

  DeleteMovie(call: any, callback: any): void {
    movieService.delete(call.request.id);
    callback(null, {});
  },
};
