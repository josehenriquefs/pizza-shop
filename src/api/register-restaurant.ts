import { api } from "@/lib/axios";

export interface RegisterRestaurantRequest {
  restaurantName: string;
  managerName: string;
  email: string;
  phone: string;
}

export async function registerRestaurant(body: RegisterRestaurantRequest) {
  await api.post("/restaurants", body);
}
