import axiosClient from "./axiosClient";

const productApi = {
    getAll: () => {
        const url = "/product/all";
        return axiosClient.get(url);
    },
    delete: (id) => {
        const url = `/product/${id}`;
        return axiosClient.delete(url)
    },
    update: (id, data) => {
        const url = `/product/${id}`;
        return axiosClient.put(url, data);
    },
    create: (data) => {
        const url = `/product`;
        return axiosClient.post(url, data);
    }
}

export default productApi;