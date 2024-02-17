import { api } from '@/lib/axios';

export interface IGetOrderDetailsParams {
	orderId: string;
}

export type OrderStatusType =
	| 'pending'
	| 'canceled'
	| 'processing'
	| 'delivering'
	| 'delivered';

export interface IGetOrderDetailResponse {
	id: string;
	createdAt: string;
	status: OrderStatusType;
	totalInCents: number;
	customer: {
		name: string;
		email: string;
		phone: string;
	};
	orderItems: Array<{
		id: string;
		priceInCents: number;
		quantity: number;
		product: {
			name: string;
		};
	}>;
}

export async function getOrderDetails({ orderId }: IGetOrderDetailsParams) {
	const { data } = await api.get<IGetOrderDetailResponse>(`/orders/${orderId}`);

	return data;
}
