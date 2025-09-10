import { IMovie } from "../interfaces/IMovie";
import { MovieRepository } from "./movie.repository";
import { ActorService } from "../actor/actor.service";

export class MovieService {
  private movieRepository: MovieRepository;
  private actorService: ActorService;

  constructor(actorService: ActorService) {
    this.movieRepository = new MovieRepository();
    this.actorService = actorService;
  }

  public list(): IMovie[] {
    const movies = this.movieRepository.findAll();
    if (!movies || movies.length === 0){
      throw new Error(`movie not found in database.`);
    }
    return movies
  }

  public getById(id: number): IMovie | undefined {
    const movie = this.movieRepository.findById(id)

    if (!movie){
      throw new Error(`movie with ${id} not found`);
    }
    return movie;
  }

  public create(movie: Omit<IMovie, "id">): IMovie {
    return this.movieRepository.create(movie);
  }

  public update(id: number, movieData: Partial<Omit<IMovie, "id">>): IMovie | undefined {
    const movie = this.movieRepository.findById(id)

    if (!movie){
      throw new Error(`movie with ${id} not found. Unable to update.`);
    }
    return this.movieRepository.update(id, movieData);
  }

  public delete(id: number): void {
    const movie = this.movieRepository.findById(id)

    if (!movie){
      throw new Error(`movie with ${id} not found. Unable to delete.`);
    }
    this.movieRepository.delete(id);
  }

  public addActorToMovie(movieId: number, actorId: number): IMovie | undefined {
    const movie = this.movieRepository.findById(movieId);
    const actor = this.actorService.getById(actorId);

    if (!movie || !actor){
      throw new Error (`Movie or actor not found.`);
    }
    if (!movie.actors.includes(actorId)) movie.actors.push(actorId);
    if (!actor.movies.includes(movieId)) actor.movies.push(movieId);

    return movie;
  }

  public listActorsByMovie(movieId: number) {
    const movie = this.movieRepository.findById(movieId);
    if (!movie){
      throw new Error(`movie with ${movieId} not found.`);
    }
    return movie.actors.map(actorId => this.actorService.getById(actorId)).filter(Boolean);
  }
}
