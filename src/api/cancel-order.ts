import { api } from '@/lib/axios';

export interface IcancelOrderParams {
	orderId: string;
}

export async function cancelOrder({ orderId }: IcancelOrderParams) {
	await api.patch(`/orders/${orderId}/cancel`);
}
