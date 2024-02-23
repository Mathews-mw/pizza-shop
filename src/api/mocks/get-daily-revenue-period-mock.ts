import { http, HttpResponse } from 'msw';

import { IGetDailyRevenuePeriodResponse } from '../get-daily-revenue-period';

export const getdailyRevenuePeriodMock = http.get<never, never, IGetDailyRevenuePeriodResponse>(
	'/metrics/daily-receipt-in-period',
	() => {
		return HttpResponse.json([
			{ date: '15/02/2024', receipt: 2000 },
			{ date: '16/02/2024', receipt: 1850 },
			{ date: '17/02/2024', receipt: 1497 },
			{ date: '18/02/2024', receipt: 2252 },
			{ date: '19/02/2024', receipt: 1357 },
			{ date: '20/02/2024', receipt: 1698 },
			{ date: '21/02/2024', receipt: 2174 },
		]);
	}
);
