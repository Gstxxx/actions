import { Hono } from "hono";
import { cors } from 'hono/cors'
import { serve } from "@hono/node-server";
import { authApp } from "./Routes/Auth";
import { quotesApp } from "./Routes/Quotes";

const mainApp = new Hono();

mainApp.use('/*', cors())
const routes = mainApp
  .route("/", authApp)
  .route("/",quotesApp);


export type AppType = typeof routes;
const port = 3005;
console.log(`Server is running on port ${port}`);

serve({
  fetch: mainApp.fetch,
  port,
});