import { http, HttpResponse } from 'msw';

import { IGetPopularProductseResponse } from '../get-popular-products';

export const getPopularProductsMock = http.get<never, never, IGetPopularProductseResponse>(
	'/metrics/popular-products',
	() => {
		return HttpResponse.json([
			{ product: 'Pizza 01', amount: 25 },
			{ product: 'Pizza 02', amount: 15 },
			{ product: 'Pizza 03', amount: 8 },
			{ product: 'Pizza 04', amount: 11 },
			{ product: 'Pizza 05', amount: 7 },
		]);
	}
);
