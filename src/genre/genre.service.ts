import { GenreRepository } from "./genre.repository";
import { IGenre } from "../interfaces/IGenre";

export class GenreService {
  private genreRepository: GenreRepository;

  constructor() {
    this.genreRepository = new GenreRepository();
  }

  public list(): IGenre[] {
    return this.genreRepository.findAll();
  }

  public getById(id: number): IGenre | undefined {
    return this.genreRepository.findById(id);
  }

  public create(name: string): IGenre {
    return this.genreRepository.create({ name });
  }

  public update(genre: IGenre): IGenre {
    return this.genreRepository.update(genre);
  }

  public delete(id: number): void {
    this.genreRepository.delete(id);
  }
}
