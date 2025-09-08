import { ActorRepository } from "./actor.repository";
import { IActor } from "../interfaces/IActor";

export class ActorService {
  private actorRepository: ActorRepository;

  constructor() {
    this.actorRepository = new ActorRepository();
  }

  public list(): IActor[] {
    return this.actorRepository.findAll();
  }

  public getById(id: number): IActor | undefined {
    return this.actorRepository.findById(id);
  }

  public create(actor: Omit<IActor, "id">): IActor {
    return this.actorRepository.create(actor);
  }

  public update(id: number, actorData: Partial<Omit<IActor, "id">>): IActor | undefined {
    return this.actorRepository.update(id, actorData);
  }

  public delete(id: number): void {
    this.actorRepository.delete(id);
  }
}
