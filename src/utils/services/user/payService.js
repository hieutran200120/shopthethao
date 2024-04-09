import createApiService from "../../../createApiService";
const api = createApiService();
const get = () => {
    return api.makeAuthRequest({
        url: `/api/Pay/PaymentCallback`,
        method: "GET",
    });
};
const create = (data) => {
    return api.makeAuthRequest({
        url: "/api/Pay/create-payment-url",
        method: "POST",
        data: data,
    });
};
export const payServices = {
    get,
    create

};
