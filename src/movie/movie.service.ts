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
    return this.movieRepository.findAll();
  }

  public getById(id: number): IMovie | undefined {
    return this.movieRepository.findById(id);
  }

  public create(movie: Omit<IMovie, "id">): IMovie {
    return this.movieRepository.create(movie);
  }

  public update(id: number, movieData: Partial<Omit<IMovie, "id">>): IMovie | undefined {
    return this.movieRepository.update(id, movieData);
  }

  public delete(id: number): void {
    this.movieRepository.delete(id);
  }

  public addActorToMovie(movieId: number, actorId: number): IMovie | undefined {
    const movie = this.movieRepository.findById(movieId);
    const actor = this.actorService.getById(actorId);
    if (!movie || !actor) return undefined;

    if (!movie.actors.includes(actorId)) movie.actors.push(actorId);
    if (!actor.movies.includes(movieId)) actor.movies.push(movieId);

    return movie;
  }

  public listActorsByMovie(movieId: number) {
    const movie = this.movieRepository.findById(movieId);
    if (!movie) return undefined;

    return movie.actors.map(actorId => this.actorService.getById(actorId)).filter(Boolean);
  }
}
