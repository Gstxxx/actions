import { getApiClient, getToken } from "../ApiService.";

const action = getApiClient().auth["refresh-token"].$post;


export async function submit() {
    return await action({
        headers: {
            "x-refresh-token": getToken()
        }
    });
}
