import { api } from "@/lib/axios";

export interface ApproverOrderRequest {
  orderId: string;
}

export async function approverOrder({ orderId }: ApproverOrderRequest) {
  await api.patch(`/orders/${orderId}/approve`);
}
