import { api } from '@/lib/axios';

export interface IManagerRestaurantResponse {
	id: string;
	name: string;
	createdAt: Date | null;
	updatedAt: Date | null;
	description: string | null;
	managerId: string | null;
}

export async function getManagerRestaurant(): Promise<IManagerRestaurantResponse> {
	const { data } = await api.get<IManagerRestaurantResponse>('/managed-restaurant');

	return data;
}
