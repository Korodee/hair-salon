import api from "./api"
import { ErrorResponse } from "./authService";

export const fetchGallery = async () => {
    try {
        const response = await api.get("/gallery");
        return response.data
    } catch (error) {
        throw error as ErrorResponse;
    }
}