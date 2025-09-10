import { GenreRepository } from "./genre.repository";
import { IGenre } from "../interfaces/IGenre";

export class GenreService {
  private genreRepository: GenreRepository;

  constructor() {
    this.genreRepository = new GenreRepository();
  }

  public list(): IGenre[] {
    const genres = this.genreRepository.findAll()

    if (!genres || genres.length === 0) {
      throw new Error("No genres found in database.");
    }
    return genres;
  }

  public getById(id: number): IGenre | undefined {
    const genre = this.genreRepository.findById(id);
    if (!genre) {
      throw new Error(`Genre with ${id} not found in database.`);
    }
    return genre;
  }

  public create(name: string): IGenre {
    return this.genreRepository.create({ name });
  }

  public update(genre: IGenre): IGenre {
    const genreUpdate = this.genreRepository.findById(genre.id);
    if (!genreUpdate) {
      throw new Error(`Genre not found in database. Unable to update.`)
    }
    return this.genreRepository.update(genre);
  }

  public delete(id: number): void {
    const genre = this.genreRepository.findById(id);

    if (!genre) {
      throw new Error(`Genre with ${id} not found in database. Unable to delete.`);
    }
    this.genreRepository.delete(id);
  }
}
