import { cn } from "@/lib/utils";

export type OrderStatus =
  | "pending"
  | "canceled"
  | "processing"
  | "delivering"
  | "delivered";

interface OrderStatusProps {
  status: OrderStatus;
}

const orderStatusMap: Record<OrderStatus, string> = {
  pending: "Pendente",
  canceled: "Cancelado",
  processing: "Em preparo",
  delivering: "Em entrega",
  delivered: "Entregue",
};

export function OrderStatus({ status }: OrderStatusProps) {
  return (
    <div className="flex items-center gap-2">
      <span
        data-testid="badge"
        className={cn(
          "h-2 w-2 rounded-full bg-slate-400",
          status === "delivered" && "bg-emerald-500",
          status === "pending" && "bg-foreground",
          status === "canceled" && "bg-rose-500",
          status === "processing" && "bg-amber-500",
          status === "delivering" && "bg-blue-500",
        )}
      />
      <span className="font-medium capitalize text-muted-foreground">
        {orderStatusMap[status]}
      </span>
    </div>
  );
}
