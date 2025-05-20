import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import { Service } from "../types";

export default function Home() {
  const {
    data: services,
    isLoading,
    error,
  } = useQuery<Service[]>({
    queryKey: ["services"],
    queryFn: async () => {
      const response = await api.get("/services");
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Error loading services. Please try again later.
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-8">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services?.map((service) => (
          <div
            key={service._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            {service.imageUrl && (
              <img
                src={service.imageUrl}
                alt={service.name}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{service.name}</h2>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">${service.price}</span>
                <span className="text-gray-500">{service.duration} min</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
