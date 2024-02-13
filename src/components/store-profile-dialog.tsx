import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { getManagerRestaurant, IManagerRestaurantResponse } from '@/api/get-manager-restaurant';
import { updateProfile } from '@/api/update-profile';
import { queryClient } from '@/lib/query-client';

import { Button } from './ui/button';
import {
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

const storeProfileForm = z.object({
	name: z.string().min(1),
	description: z.string().nullable(),
});

type StoreProfileForm = z.infer<typeof storeProfileForm>;

export function StoreProfileDialog() {
	const { data: managerProfile } = useQuery({
		queryKey: ['manager-profile'],
		queryFn: getManagerRestaurant,
		staleTime: Infinity,
	});

	const {
		handleSubmit,
		register,
		formState: { isSubmitting },
	} = useForm<StoreProfileForm>({
		resolver: zodResolver(storeProfileForm),
		values: {
			name: managerProfile?.name ?? '',
			description: managerProfile?.description ?? '',
		},
	});

	function updateManageRestaurantCache({ name, description }: StoreProfileForm) {
		const cached = queryClient.getQueryData<IManagerRestaurantResponse>(['manager-profile']);

		if (cached) {
			queryClient.setQueryData<IManagerRestaurantResponse>(['manager-profile'], {
				...cached,
				name,
				description,
			});
		}

		return { cached };
	}

	const { mutateAsync: updateProfileFn } = useMutation({
		mutationFn: updateProfile,
		onMutate({ name, description }) {
			const { cached } = updateManageRestaurantCache({ name, description });

			return { previousProfile: cached };
		},
		onError(_, __, context) {
			if (context?.previousProfile) {
				updateManageRestaurantCache(context.previousProfile);
			}
		},
	});

	async function handleProfileFormSubmit(data: StoreProfileForm) {
		try {
			await updateProfileFn({ name: data.name, description: data.description });

			toast.success('Perfil atualizado com sucesso.');
		} catch (error) {
			toast.error('Erro ao tentar atualizar perfil.');
		}
	}

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Perfil da loja</DialogTitle>
				<DialogDescription>
					Atualize as informações do seu estabelecimento visíveis ao seu cliente
				</DialogDescription>
			</DialogHeader>

			<form onSubmit={handleSubmit(handleProfileFormSubmit)}>
				<div className="space-y-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label className="text-right" htmlFor="name">
							Nome
						</Label>
						<Input id="name" className="col-span-3" {...register('name')} />
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label className="text-right" htmlFor="description">
							Descrição
						</Label>
						<Textarea id="description" className="col-span-3" {...register('description')} />
					</div>
				</div>

				<DialogFooter>
					<DialogClose asChild>
						<Button type="button" variant="ghost" disabled={isSubmitting}>
							Cancelar
						</Button>
					</DialogClose>
					<Button type="submit" variant="sucess" disabled={isSubmitting}>
						Salvar
					</Button>
				</DialogFooter>
			</form>
		</DialogContent>
	);
}
