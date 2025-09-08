import { IActor } from "../interfaces/IActor";

export class ActorRepository {
  private actors: IActor[] = [];
  private currentId: number = 1;

  public findAll(): IActor[] {
    return this.actors;
  }

  public findById(id: number): IActor | undefined {
    return this.actors.find(a => a.id === id);
  }

  public create(actor: Omit<IActor, "id">): IActor {
    const newActor: IActor = {
      id: this.currentId++,
      name: actor.name,
      birthdate: actor.birthdate,
      movies: actor.movies || []
    };
    this.actors.push(newActor);
    return newActor;
  }

  public update(id: number, actorData: Partial<Omit<IActor, "id">>): IActor | undefined {
    const actor = this.findById(id);
    if (!actor) return undefined;
    if (actorData.name !== undefined) actor.name = actorData.name;
    if (actorData.birthdate !== undefined) actor.birthdate = actorData.birthdate;
    if (actorData.movies !== undefined) actor.movies = actorData.movies;
    return actor;
  }

  public delete(id: number): boolean {
    const index = this.actors.findIndex(a => a.id === id);
    if (index === -1) return false;
    this.actors.splice(index, 1);
    return true;
  }
}
