import { api } from '@/lib/axios';

export interface IdispatchOrderParams {
	orderId: string;
}

export async function dispatchOrder({ orderId }: IdispatchOrderParams) {
	await api.patch(`/orders/${orderId}/dispatch`);
}
