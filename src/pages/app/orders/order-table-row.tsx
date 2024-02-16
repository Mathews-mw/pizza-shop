import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ArrowRight, Search, X } from 'lucide-react';
import { useState } from 'react';

import { OrderStatus } from '@/components/order-status';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { TableCell, TableRow } from '@/components/ui/table';

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
				<Button variant="outline" size="xs">
					<ArrowRight className="mr-2 h-3 w-3" />
					Aprovar
				</Button>
			</TableCell>
			<TableCell>
				<Button variant="ghost" size="xs">
					<X className="mr-2 h-3 w-3" />
					Cancelar
				</Button>
			</TableCell>
		</TableRow>
	);
}
