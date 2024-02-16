import { api } from '@/lib/axios';

export interface IGetOrderDetailsParams {
	orderId: string;
}

export interface IGetOrderDetailResponse {
	id: string;
	createdAt: string;
	status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered';
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
