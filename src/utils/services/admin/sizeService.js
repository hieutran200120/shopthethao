import createApiService from "../../../createApiService";
const api = createApiService();
const get = () => {
    return api.makeAuthRequest({
        url: `/api/Size`,
        method: "GET",
        // params: params
    });
};
const create = (data) => {
    return api.makeAuthRequest({
        url: "/api/Size",
        method: "POST",
        data: data,
    });
};
export const sizeServices = {
    get,
    create,
};
