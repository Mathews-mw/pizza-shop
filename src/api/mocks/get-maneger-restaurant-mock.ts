import { http, HttpResponse } from 'msw';

import { IManagerRestaurantResponse } from '../get-manager-restaurant';

export const getManagerRestaurantMock = http.get<never, never, IManagerRestaurantResponse>(
	'/managed-restaurant',
	() => {
		return HttpResponse.json({
			id: 'custom-restaurant-id',
			name: 'Pizza Shop',
			description: 'Custom restaurant description',
			managerId: 'custom-user-id',
			createdAt: new Date(),
			updatedAt: null,
		});
	}
);
