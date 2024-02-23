import { api } from '@/lib/axios';

export type IGetPopularProductseResponse = {
	product: string;
	amount: number;
}[];

export async function getPopularProducts() {
	const { data } = await api.get<IGetPopularProductseResponse>('/metrics/popular-products');

	return data;
}
