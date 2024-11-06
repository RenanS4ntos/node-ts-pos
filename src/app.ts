import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyCors from "@fastify/cors";
import { env } from "./env";
import { appRoutes } from "./http/routes";

export const app = fastify();

const swaggerOptions = {
  swagger: {
    info: {
      title: "API Documentation",
      description: "API documentation for the Fastify application",
      version: "1.0.0",
    },
    host: `localhost:${env.PORT}`,
    schemes: ["http", "https"],
    consumes: ["application/json"],
    produces: ["application/json"],
  },
};

const swaggerUiOptions = {
  routePrefix: "/docs",
  exposeRoute: true,
};

app.register(fastifySwagger, swaggerOptions);
app.register(fastifySwaggerUi, swaggerUiOptions);

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(fastifyCors, {
  origin: "*", // Permitir todas as origens. Ajuste conforme necessário.
});

app.register(appRoutes);
