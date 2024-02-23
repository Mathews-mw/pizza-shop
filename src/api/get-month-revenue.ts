import { api } from '@/lib/axios';

export interface IGetMonthRevenueResponse {
	receipt: number;
	diffFromLastMonth: number;
}

export async function getMonthRevenue() {
	const { data } = await api.get<IGetMonthRevenueResponse>('/metrics/month-receipt');

	return data;
}
