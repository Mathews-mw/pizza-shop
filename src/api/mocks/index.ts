import { setupWorker } from 'msw/browser';

import { env } from '@/env';

import { approveOrdersMock } from './approve-orders-mock';
import { canceledOrdersMock } from './canceled-order-mock';
import { deliverOrdersMock } from './deliver-order-mock';
import { dispatchOrdersMock } from './dispatch-order-mock';
import { getdailyRevenuePeriodMock } from './get-daily-revenue-period-mock';
import { getDayOrdersAmountMock } from './get-day-orders-amount-mock';
import { getManagerRestaurantMock } from './get-maneger-restaurant-mock';
import { getMonthCanceledOrdersAmountMock } from './get-month-canceled-orders-amount-mock';
import { getMonthOrdersAmountMock } from './get-month-orders-amount-mock';
import { getMonthRevenueMock } from './get-month-revenue-mock';
import { getOrdersDetailsMock } from './get-orders-details-mock';
import { getOrdersMock } from './get-orders-mock';
import { getPopularProductsMock } from './get-popular-products-mock';
import { getProfileMock } from './get-profile-mock';
import { registerRestaurantMock } from './register-restaurant-mock';
import { signInMock } from './sign-in-mock';
import { updateProfileMock } from './update-profile-mock';

export const worker = setupWorker(
	signInMock,
	registerRestaurantMock,
	getMonthRevenueMock,
	getDayOrdersAmountMock,
	getMonthOrdersAmountMock,
	getMonthCanceledOrdersAmountMock,
	getdailyRevenuePeriodMock,
	getPopularProductsMock,
	getOrdersMock,
	getOrdersDetailsMock,
	approveOrdersMock,
	canceledOrdersMock,
	deliverOrdersMock,
	dispatchOrdersMock,
	getProfileMock,
	getManagerRestaurantMock,
	updateProfileMock
);

export async function enableMSW() {
	if (env.MODE !== 'test') {
		return;
	}

	await worker.start();
}
