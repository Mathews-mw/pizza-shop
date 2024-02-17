import { api } from '@/lib/axios';

export interface IdeliverOrderParams {
	orderId: string;
}

export async function deliverOrder({ orderId }: IdeliverOrderParams) {
	await api.patch(`/orders/${orderId}/deliver`);
}
