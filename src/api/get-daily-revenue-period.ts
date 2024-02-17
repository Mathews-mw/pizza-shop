import { api } from '@/lib/axios';

export interface IIGetDailyRevenuePeriodQuery {
	from?: Date;
	to?: Date;
}

export type IGetDailyRevenuePeriodResponse = {
	date: string;
	receipt: number;
}[];

export async function getDailyRevenuePeriod({ from, to }: IIGetDailyRevenuePeriodQuery) {
	const { data } = await api.get<IGetDailyRevenuePeriodResponse>(
		'/metrics/daily-receipt-in-period',
		{
			params: {
				from,
				to,
			},
		}
	);

	return data;
}
