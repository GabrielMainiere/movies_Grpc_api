import { ActorService } from "./actor.service";
import { IActor } from "../interfaces/IActor";

const actorService = new ActorService();

export const ActorHandler = {
  ListActors(call: any, callback: any) {
    callback(null, { actors: actorService.list() });
  },

  GetActorById(call: any, callback: any) {
    callback(null, actorService.getById(call.request.id));
  },

  CreateActor(call: any, callback: any) {
    const { name, birthdate } = call.request;
    const newActor = actorService.create({ name, birthdate, movies: [] });
    callback(null, newActor);
  },

  UpdateActor(call: any, callback: any) {
    const { id, name, birthdate, movies } = call.request;
    const updated = actorService.update(id, { name, birthdate, movies });
    callback(null, updated);
  },

  DeleteActor(call: any, callback: any) {
    actorService.delete(call.request.id);
    callback(null, {});
  }
};

export { actorService };
