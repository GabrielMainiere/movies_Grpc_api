import { ActorRepository } from "./actor.repository";
import { IActor } from "../interfaces/IActor";

export class ActorService {
  private actorRepository: ActorRepository;

  constructor() {
    this.actorRepository = new ActorRepository();
  }

  public list(): IActor[] {
    const actors = this.actorRepository.findAll();

    if(!actors || actors.length === 0) {
      throw new Error("No actors found in database.");
    }
    return actors
  }

  public getById(id: number): IActor | undefined {
    const actor = this.actorRepository.findById(id);

    if (!actor) {
      throw new Error(`Actor with ${id} not found in database.`);
    }
    return actor
  }

  public create(actor: Omit<IActor, "id">): IActor {
    return this.actorRepository.create(actor);
  }

  public update(id: number, actorData: Partial<Omit<IActor, "id">>): IActor | undefined {
    const actor = this.actorRepository.findById(id);

    if (!actor) {
      throw new Error(`Actor with ${id} not found in database. Unable to update.`);
    }
    return this.actorRepository.update(id, actorData);
  }

  public delete(id: number): void {
    const actor = this.actorRepository.findById(id);

    if (!actor) {
      throw new Error(`Actor with ${id} not found in database. Unable to delete.`);
    }
    this.actorRepository.delete(id);
  }
}
