import createApiService from "../../../createApiService";
const api = createApiService();
const get = (params) => {
    return api.makeAuthRequest({
        url: `/api/ProductDetail`,
        method: "GET",
        params: params
    });
};
const create = (data) => {
    return api.makeAuthRequest({
        url: "/api/ProductDetail",
        method: "POST",
        data: data,
    });
};
const deleteProductDetail = (params) => {
    return api.makeAuthRequest({
        url: `/api/ProductDetail`,
        method: "DELETE",
        params: params
    });
};
const updateProductDetail = (Id, data) => {
    return api.makeAuthRequest({
        url: `/api/ProductDetail?Id=${Id}`,
        method: "PUT",
        data: data
    });
};
export const productDetailServices = {
    get,
    create,
    updateProductDetail,
    deleteProductDetail
};
