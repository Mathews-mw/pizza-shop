import { setupWorker } from 'msw/browser';

import { env } from '@/env';

import { getdailyRevenuePeriodMock } from './get-daily-revenue-period-mock';
import { getDayOrdersAmountMock } from './get-day-orders-amount-mock';
import { getMonthCanceledOrdersAmountMock } from './get-month-canceled-orders-amount-mock';
import { getMonthOrdersAmountMock } from './get-month-orders-amount-mock';
import { getMonthRevenueMock } from './get-month-revenue-mock';
import { getPopularProductsMock } from './get-popular-products-mock';
import { registerRestaurantMock } from './register-restaurant-mock';
import { signInMock } from './sign-in-mock';

export const worker = setupWorker(
	signInMock,
	registerRestaurantMock,
	getMonthRevenueMock,
	getDayOrdersAmountMock,
	getMonthOrdersAmountMock,
	getMonthCanceledOrdersAmountMock,
	getdailyRevenuePeriodMock,
	getPopularProductsMock
);

export async function enableMSW() {
	if (env.MODE !== 'test') {
		return;
	}

	await worker.start();
}
