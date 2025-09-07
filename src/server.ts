import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";

import { GenreHandler } from "./genre/genre.handler";
import path from "path";

const PROTO_PATH = path.join(__dirname, "../proto/movies.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition) as any;
const moviesPackage = protoDescriptor.movies;

const server = new grpc.Server();

server.addService(moviesPackage.GenreService.service, GenreHandler);

const port = "50051";
server.bindAsync(
  `0.0.0.0:${port}`,
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log(`🚀 gRPC Server running at http://localhost:${port}`);
    server.start();
  }
);
