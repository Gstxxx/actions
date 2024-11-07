import { Hono } from "hono";
import { registerApp } from '../Controllers/Auth/Signup';
import { loginApp } from '../Controllers/Auth/Login';
import { refreshTokenApp } from "../Controllers/Auth/Refresh";

const authApp = new Hono()
    .basePath("/auth")
    .route("/signup", registerApp)
    .route("/login", loginApp)
    .route("/refresh-token", refreshTokenApp);

export { authApp };
