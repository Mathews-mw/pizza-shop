import { useMutation } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ArrowRight, Search, X } from 'lucide-react';
import { useState } from 'react';

import { approveOrder } from '@/api/approve-order';
import { cancelOrder } from '@/api/cancel-order';
import { deliverOrder } from '@/api/deliver-order';
import { dispatchOrder } from '@/api/dispatch-order';
import { OrderStatusType } from '@/api/get-order-details';
import { IGetOrdersResponse } from '@/api/get-orders';
import { OrderStatus } from '@/components/order-status';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { TableCell, TableRow } from '@/components/ui/table';
import { queryClient } from '@/lib/query-client';

import { OrderDetails } from './order-details';

interface IOrderTableRowProps {
	order: {
		orderId: string;
		createdAt: string;
		status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered';
		customerName: string;
		total: number;
	};
}

export function OrderTableRow({ order }: IOrderTableRowProps) {
	const [isDetailsOpen, setIsDetailsOpen] = useState(false);

	const totalOrderFormatted = (order.total / 100).toLocaleString('pt-BR', {
		currency: 'BRL',
		style: 'currency',
	});

	const orderCreatedAtFormatted = formatDistanceToNow(order.createdAt, {
		locale: ptBR,
		addSuffix: true,
	});

	function updateOrderStatusOnCache(orderId: string, status: OrderStatusType) {
		const ordersListCached = queryClient.getQueriesData<IGetOrdersResponse>({
			queryKey: ['orders'],
		});

		ordersListCached.forEach(([cacheKey, cacheData]) => {
			if (!cacheData) {
				return;
			}

			queryClient.setQueryData<IGetOrdersResponse>(cacheKey, {
				...cacheData,
				orders: cacheData.orders.map((order) => {
					if (order.orderId === orderId) {
						return { ...order, status };
					}

					return order;
				}),
			});
		});
	}

	const { mutateAsync: cancelOrderFn, isPending: isCanceligOrder } = useMutation({
		mutationFn: cancelOrder,
		async onSuccess(_, { orderId }) {
			updateOrderStatusOnCache(orderId, 'canceled');
		},
	});

	const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } = useMutation({
		mutationFn: approveOrder,
		async onSuccess(_, { orderId }) {
			updateOrderStatusOnCache(orderId, 'processing');
		},
	});

	const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } = useMutation({
		mutationFn: dispatchOrder,
		async onSuccess(_, { orderId }) {
			updateOrderStatusOnCache(orderId, 'delivering');
		},
	});

	const { mutateAsync: deliverOrderFn, isPending: IsDeliveringOrder } = useMutation({
		mutationFn: deliverOrder,
		async onSuccess(_, { orderId }) {
			updateOrderStatusOnCache(orderId, 'delivered');
		},
	});

	return (
		<TableRow>
			<TableCell>
				<Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
					<DialogTrigger asChild>
						<Button variant="outline" size="xs">
							<Search className="h-3 w-3" />
							<span className="sr-only">Detalhes do pedido</span>
						</Button>
					</DialogTrigger>

					<OrderDetails open={isDetailsOpen} orderId={order.orderId} />
				</Dialog>
			</TableCell>
			<TableCell className="font-mono text-xs font-medium">{order.orderId}</TableCell>
			<TableCell className="text-muted-foreground">{orderCreatedAtFormatted}</TableCell>
			<TableCell>
				<OrderStatus status={order.status} />
			</TableCell>
			<TableCell className="font-medium">{order.customerName}</TableCell>
			<TableCell className="font-medium">{totalOrderFormatted}</TableCell>
			<TableCell>
				{order.status === 'pending' && (
					<Button
						variant="outline"
						size="xs"
						disabled={isApprovingOrder}
						onClick={() => approveOrderFn({ orderId: order.orderId })}
					>
						<ArrowRight className="mr-2 h-3 w-3" />
						Aprovar
					</Button>
				)}

				{order.status === 'processing' && (
					<Button
						variant="outline"
						size="xs"
						disabled={isDispatchingOrder}
						onClick={() => dispatchOrderFn({ orderId: order.orderId })}
					>
						<ArrowRight className="mr-2 h-3 w-3" />
						Em entrega
					</Button>
				)}

				{order.status === 'delivering' && (
					<Button
						variant="outline"
						size="xs"
						disabled={IsDeliveringOrder}
						onClick={() => deliverOrderFn({ orderId: order.orderId })}
					>
						<ArrowRight className="mr-2 h-3 w-3" />
						Entregue
					</Button>
				)}
			</TableCell>
			<TableCell>
				<Button
					variant="ghost"
					size="xs"
					disabled={!['pending', 'processing'].includes(order.status) || isCanceligOrder}
					onClick={() => cancelOrderFn({ orderId: order.orderId })}
				>
					<X className="mr-2 h-3 w-3" />
					Cancelar
				</Button>
			</TableCell>
		</TableRow>
	);
}
