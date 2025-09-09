import { IMovie } from "../interfaces/IMovie";

export class MovieRepository {
  private movies: IMovie[] = [];
  private currentId: number = 1;

  public findAll(): IMovie[] {
    return this.movies;
  }

  public findById(id: number): IMovie | undefined {
    return this.movies.find(m => m.id === id);
  }

  public create(movie: Omit<IMovie, "id">): IMovie {
    const newMovie: IMovie = {
      id: this.currentId++,
      ...movie
    };
    this.movies.push(newMovie);
    return newMovie;
  }

  public update(id: number, movieData: Partial<Omit<IMovie, "id">>): IMovie | undefined {
    const movie = this.findById(id);
    if (!movie) return undefined;
    Object.assign(movie, movieData);
    return movie;
  }

  public delete(id: number): boolean {
    const index = this.movies.findIndex(m => m.id === id);
    if (index === -1) return false;
    this.movies.splice(index, 1);
    return true;
  }
}
