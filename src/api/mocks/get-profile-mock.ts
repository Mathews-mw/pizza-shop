import { http, HttpResponse } from 'msw';

import { IProfileResponse } from '../get-profile';

export const getProfileMock = http.get<never, never, IProfileResponse>('/me', () => {
	return HttpResponse.json({
		id: 'custom-user-id',
		name: 'Dominic Stanley',
		email: 'sazogpo@tel.kw',
		phone: '(259) 454-6561',
		role: 'manager',
		createdAt: new Date(),
		updatedAt: null,
	});
});
