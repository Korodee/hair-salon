import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  description: string;
  category: string;
}

export const getGalleryImages = async () => {
  try {
    const response = await axios.get(`${API_URL}/gallery`);
    return response.data;
  } catch (error) {
    console.error("Error fetching gallery images:", error);
    throw error;
  }
}; 