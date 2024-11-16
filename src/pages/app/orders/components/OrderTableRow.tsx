import { approverOrder } from "@/api/approve-order";
import { cancelOrder } from "@/api/cancel-order";
import { deliverOrder } from "@/api/deliver-order";
import { dispatchOrder } from "@/api/dispatch-order";
import type { GetOrdersResponse } from "@/api/get-orders";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { queryCliente } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowRight, Search, X } from "lucide-react";
import { useState } from "react";
import { OrderDetails } from "./OrderDetails";
import { OrderStatus } from "./OrderStatus";

export interface OrderTableRowProps {
  order: {
    orderId: string;
    createdAt: string;
    status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
    customerName: string;
    total: number;
  };
}

function updateOrderStatusOnCache(orderId: string, status: OrderStatus) {
  const ordersListCache = queryCliente.getQueriesData<GetOrdersResponse>({
    queryKey: ["orders"],
  });
  ordersListCache.forEach(([cachedKey, cachedData]) => {
    if (!cachedData) {
      return;
    }
    queryCliente.setQueryData<GetOrdersResponse>(cachedKey, {
      ...cachedData,
      orders: cachedData.orders.map((order) => {
        if (order.orderId === orderId) {
          return { ...order, status };
        }
        return order;
      }),
    });
  });
}

export function OrderTableRow({ order }: OrderTableRowProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } =
    useMutation({
      mutationFn: approverOrder,
      onSuccess: (_, { orderId }) => {
        updateOrderStatusOnCache(orderId, "processing");
      },
    });
  const { mutateAsync: cancelOrderFn, isPending: isCancellingOrder } =
    useMutation({
      mutationFn: cancelOrder,
      onSuccess: (_, { orderId }) => {
        updateOrderStatusOnCache(orderId, "canceled");
      },
    });
  const { mutateAsync: dispatchOrderFn, isPending: isDeliveringOrder } =
    useMutation({
      mutationFn: dispatchOrder,
      onSuccess: (_, { orderId }) => {
        updateOrderStatusOnCache(orderId, "delivering");
      },
    });
  const { mutateAsync: deliverOrderFn, isPending: isDeliveredOrder } =
    useMutation({
      mutationFn: deliverOrder,
      onSuccess: (_, { orderId }) => {
        updateOrderStatusOnCache(orderId, "delivered");
      },
    });

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogTrigger asChild>
            <Button variant={"outline"} size={"xs"}>
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>

          <OrderDetails orderId={order.orderId} isOpen={isDetailOpen} />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {order.orderId}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(order.createdAt, {
          locale: ptBR,
          addSuffix: true,
        })}
      </TableCell>
      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>
      <TableCell className="font-medium">{order.customerName}</TableCell>
      <TableCell className="font-medium">
        {(order.total / 100).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </TableCell>
      <TableCell>
        {order.status === "pending" && (
          <Button
            disabled={isApprovingOrder}
            variant={"outline"}
            size={"xs"}
            onClick={() => approveOrderFn({ orderId: order.orderId })}
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            Aprovar
          </Button>
        )}
        {order.status === "processing" && (
          <Button
            disabled={isDeliveringOrder}
            variant={"outline"}
            size={"xs"}
            onClick={() => dispatchOrderFn({ orderId: order.orderId })}
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            Em entrega
          </Button>
        )}
        {order.status === "delivering" && (
          <Button
            disabled={isDeliveredOrder}
            variant={"outline"}
            size={"xs"}
            onClick={() => deliverOrderFn({ orderId: order.orderId })}
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            Entregue
          </Button>
        )}
      </TableCell>
      <TableCell>
        <Button
          variant={"ghost"}
          size={"xs"}
          disabled={
            !["pending", "processing"].includes(order.status) ||
            isCancellingOrder
          }
          onClick={() => cancelOrderFn({ orderId: order.orderId })}
        >
          <X className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  );
}
