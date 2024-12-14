import { Hono } from "hono";
import { registerApp } from '../Controllers/Auth/Signup';
import { loginApp } from '../Controllers/Auth/Login';
import { refreshTokenApp } from "../Controllers/Auth/Refresh";

const authApp = new Hono()
    .basePath("/")
    .route("/", registerApp)
    .route("/", loginApp)
    .route("/", refreshTokenApp);

export { authApp };
