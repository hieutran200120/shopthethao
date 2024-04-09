import createApiService from "../../../createApiService";
const api = createApiService();
const get = () => {
    return api.makeAuthRequest({
        url: `/api/ProductType`,
        method: "GET",
        // params: params
    });
};
const create = (data) => {
    return api.makeAuthRequest({
        url: "/api/ProductType",
        method: "POST",
        data: data,
    });
};
export const producTypeServices = {
    get,
    create,
};
