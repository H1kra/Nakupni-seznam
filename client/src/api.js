import axios from "axios";
import API_BASE_URL from "./config";

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const getLists = async () => {
    const response = await api.get("/list/lists");
    return response.data;
};

export const createList = async (data) => {
    const response = await api.post("/list/create", data);
    return response.data;
};

export const updateList = async (id, data) => {
    const response = await api.put(`/list/update/${id}`, data);
    return response.data;
};

export const deleteList = async (id) => {
    const response = await api.delete(`/list/delete/${id}`);
    return response.data;
};