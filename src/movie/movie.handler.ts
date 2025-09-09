import { MovieService } from "./movie.service";
import { actorService } from "../actor/actor.handler";

const movieService = new MovieService(actorService);

export const MovieHandler = {
  ListMovies(call: any, callback: any) {
    callback(null, { movies: movieService.list() });
  },

  GetMovieById(call: any, callback: any) {
    callback(null, movieService.getById(call.request.id));
  },

  CreateMovie(call: any, callback: any) {
    const { title, year, genreId } = call.request;
    const newMovie = movieService.create({ title, year, genreId, actors: [] });
    callback(null, newMovie);
  },

  UpdateMovie(call: any, callback: any) {
    const { id, title, year, genreId, actors } = call.request;
    const updated = movieService.update(id, { title, year, genreId, actors });
    callback(null, updated);
  },

  DeleteMovie(call: any, callback: any) {
    movieService.delete(call.request.id);
    callback(null, {});
  },

  AddActorToMovie(call: any, callback: any) {
    const { movieId, actorId } = call.request;
    const movie = movieService.addActorToMovie(movieId, actorId);
    if (movie) callback(null, movie);
    else callback(new Error("Movie or Actor not found"));
  },

  ListActorsByMovie(call: any, callback: any) {
    const actors = movieService.listActorsByMovie(call.request.id);
    if (actors) callback(null, { actors });
    else callback(new Error("Movie not found"));
  }
};
