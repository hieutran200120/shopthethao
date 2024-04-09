import createApiService from "../../../createApiService";
const api = createApiService();
const get = () => {
    return api.makeAuthRequest({
        url: `/api/Color`,
        method: "GET",
        // params: params
    });
};
const create = (data) => {
    return api.makeAuthRequest({
        url: "/api/Color",
        method: "POST",
        data: data,
    });
};
export const colorServices = {
    get,
    create,
};
