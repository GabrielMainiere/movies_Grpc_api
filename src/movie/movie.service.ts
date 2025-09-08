import { IMovie } from "../interfaces/IMovie";
import { MovieRepository } from "./movie.repository";

export class MovieService{
    private movieRepository : MovieRepository

    constructor(){
        this.movieRepository = new MovieRepository
    }

    public list(): IMovie[]{
        return this.movieRepository.findAll();
    } 

    public getById(id : number): IMovie | undefined{
        return this.movieRepository.findById(id);
    }

    public create(movie: Omit<IMovie, "id">): IMovie {
        return this.movieRepository.create(movie);
    }

    public update(id: number, movieData: Partial<Omit<IMovie, "id">>): IMovie | undefined {
        return this.movieRepository.update(id, movieData);
    }

    public delete(id : number): void{
        this.movieRepository.delete(id);
    }
}