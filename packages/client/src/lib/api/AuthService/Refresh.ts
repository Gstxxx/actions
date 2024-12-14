import { getApiClientRefresh } from "../ApiService.";

const action = getApiClientRefresh().auth["refresh-token"].$post;


export async function submit() {
    return await action();
}
