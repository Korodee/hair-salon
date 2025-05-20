import { useQuery } from "@tanstack/react-query";
import { getNews } from "@/services/newsService";


export const useGetNews = () => {
    return useQuery({
        queryKey: ["news"],
        queryFn: getNews,
    });
}

