import { api } from '@/lib/axios';

export interface IGetDayOrdersAmountResponse {
	amount: number;
	diffFromYesterdat: number;
}

export async function getDayOrdersAmount() {
	const { data } = await api.get<IGetDayOrdersAmountResponse>('/metrics/day-orders-amount');

	return data;
}
