import createApiService from "../../../createApiService";
const api = createApiService();
const get = () => {
    return api.makeAuthRequest({
        url: `/api/Category`,
        method: "GET",
        // params: params
    });
};
const create = (data) => {
    return api.makeAuthRequest({
        url: "/api/Category",
        method: "POST",
        data: data,
    });
};
export const categoryServices = {
    get,
    create,
};
