import { IGenre } from "../interfaces/IGenre";

let genres: IGenre[] = [];

export class GenreRepository {
  public findAll(): IGenre[] {
    return genres;
  }

  public findById(id: number): IGenre | undefined {
    return genres.find(g => g.id === id);
  }

  public create(genre: Omit<IGenre, "id">): IGenre {
    const newGenre: IGenre = { ...genre, id: genres.length + 1 };
    genres.push(newGenre);
    return newGenre;
  }

  public update(genre: IGenre): IGenre {
    const index = genres.findIndex(g => g.id === genre.id);
    if (index !== -1) {
      genres[index] = genre;
    }
    return genre;
  }

  public delete(id: number): void {
    genres = genres.filter(g => g.id !== id);
  }
}
