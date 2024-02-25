import { http, HttpResponse } from 'msw';

import { IcancelOrderParams } from '../cancel-order';

export const canceledOrdersMock = http.patch<IcancelOrderParams, never, never>(
	'orders/:orderId/canceled',
	async ({ params }) => {
		if (params.orderId === 'error-order-id') {
			return new HttpResponse(null, { status: 400 });
		}

		return new HttpResponse(null, { status: 204 });
	}
);
