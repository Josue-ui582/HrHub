import swaggerJSDoc from "swagger-jsdoc";
import type { Options } from "swagger-jsdoc";

const options: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "HrHub API",
      version: "1.0.0",
    },
  },
  apis: ["./src/routes/*.ts"], 
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;