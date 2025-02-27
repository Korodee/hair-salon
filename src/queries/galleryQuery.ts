import { fetchGallery } from "@/services/galleryService"
import { useQuery } from "@tanstack/react-query"


export const useGetGallery = () => {
    return useQuery({
        queryKey: ["gallery"],
        queryFn: fetchGallery
    })
}