import { api } from "@/lib/axios";

export interface GetOrderDetailsQuery {
  pageIndex?: number | null;
  orderId?: string | null;
  customerName?: string | null;
  status?: string | null;
}

export interface GetOrderDetailsResponse {
  status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
  id: string;
  createdAt: string | null;
  totalInCents: number;
  customer: {
    name: string;
    email: string;
    phone: string | null;
  };
  orderItems: {
    id: string;
    priceInCents: number;
    quantity: number;
    product: {
      name: string;
    };
  }[];
}

export async function getOrderDetails({
  pageIndex,
  orderId,
  customerName,
  status,
}: GetOrderDetailsQuery) {
  const response = await api.get<GetOrderDetailsResponse>(
    `/orders/${orderId}`,
    {
      params: {
        pageIndex,
        orderId,
        customerName,
        status,
      },
    },
  );

  return response.data;
}
