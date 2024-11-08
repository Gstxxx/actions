import { InferRequestType } from "hono/client";
import { getApiClient } from "../ApiService.";

const action = getApiClient().quote.create.$post;

type Request = InferRequestType<typeof action>["json"];
export async function submit(data: Request) {
    return await action({
        json: data
    });
}