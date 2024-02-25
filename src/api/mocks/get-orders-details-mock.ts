import { http, HttpResponse } from 'msw';

import { IGetOrderDetailResponse, IGetOrderDetailsParams } from '../get-order-details';

export const getOrdersDetailsMock = http.get<
	IGetOrderDetailsParams,
	never,
	IGetOrderDetailResponse
>('/orders/:orderId', ({ params }) => {
	return HttpResponse.json({
		id: params.orderId,
		customer: {
			name: 'John Doe',
			email: 'johndoe@example.com',
			phone: '(342) 328-5118',
		},
		status: 'pending',
		createdAt: new Date().toISOString(),
		totalInCents: 5000,
		orderItems: [
			{
				id: 'order-item-1',
				priceInCents: 1000,
				product: { name: 'Pizza Pepperoni' },
				quantity: 1,
			},
			{
				id: 'order-item-2',
				priceInCents: 2000,
				product: { name: 'Pizza 4 queijos' },
				quantity: 2,
			},
		],
	});
});
