import { api } from '@/lib/axios';

interface IGetMonthOrdersAmountResponse {
	amount: number;
	diffFromLastMonth: number;
}

export async function getMonthOrdersAmount() {
	const { data } = await api.get<IGetMonthOrdersAmountResponse>('/metrics/month-orders-amount');

	return data;
}
