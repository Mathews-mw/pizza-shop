import axios from 'axios';

import { env } from '@/env';

export const api = axios.create({
	baseURL: env.VITE_API_URL,
	withCredentials: true, // Isso faz com que os cookies armazenados no front-end sejam automáticamente enviados para o back-end
});

if (env.VITE_ENABLE_API_DELAY) {
	api.interceptors.request.use(async (config) => {
		await new Promise((resolve) => setTimeout(resolve, 2000));

		return config;
	});
}
