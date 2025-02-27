import { ErrorResponse } from "./authService";
import api from "./api";

export const getNews = async () => {
    try {
        const response = await api.get("/news");
        return response.data;
    } catch (error) {
        throw error as ErrorResponse;
    }
}
