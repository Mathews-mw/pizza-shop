import { api } from '@/lib/axios';

export interface IapproveOrderParams {
	orderId: string;
}

export async function approveOrder({ orderId }: IapproveOrderParams) {
	await api.patch(`/orders/${orderId}/approve`);
}
