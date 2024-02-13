import { api } from '@/lib/axios';

export interface IProfileResponse {
	id: string;
	name: string;
	email: string;
	phone: string | null;
	role: 'manager' | 'customer';
	createdAt: Date | null;
	updatedAt: Date | null;
}

export async function getProfile(): Promise<IProfileResponse> {
	const { data } = await api.get<IProfileResponse>('/me');

	return data;
}
