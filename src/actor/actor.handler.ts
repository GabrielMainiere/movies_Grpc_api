import { ActorService } from "./actor.service";
import { IActor } from "../interfaces/IActor";

const actorService = new ActorService();

export const ActorHandler = {
  ListActors(call: any, callback: any): void {
    callback(null, { actors: actorService.list() });
  },

  GetActorById(call: any, callback: any): void {
    callback(null, actorService.getById(call.request.id));
  },

  CreateActor(call: any, callback: any): void {
    const { name, birthdate } = call.request;

    const newActor = actorService.create({
      name,
      birthdate: birthdate,
      movies: []
    });

    callback(null, newActor);
  },

  UpdateActor(call: any, callback: any): void {
    const { id, name, birthDate, movies } = call.request;
    const actorData: Partial<Omit<IActor, "id">> = {
      name,
      birthdate: birthDate,
      movies
    };

    const updated = actorService.update(id, actorData);
    if (updated) callback(null, updated);
  },

  DeleteActor(call: any, callback: any): void {
    actorService.delete(call.request.id);
    callback(null, {});
  }
};
