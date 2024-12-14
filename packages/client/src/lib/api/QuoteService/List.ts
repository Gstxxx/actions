import { getApiClient } from "../ApiService.";

const action = getApiClient().quote.list.$get;

export async function submit() {
    return await action();
}