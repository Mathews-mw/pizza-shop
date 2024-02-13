import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { getManagerRestaurant } from '@/api/get-manager-restaurant';

import { Button } from './ui/button';
import {
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
	description: z.string(),
});

type StoreProfileForm = z.infer<typeof storeProfileForm>;

export function StoreProfileDialog() {
	const { data: managerProfile, isLoading } = useQuery({
		queryKey: ['manager-profile'],
		queryFn: getManagerRestaurant,
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

	async function handleProfileFormSubmit(data: StoreProfileForm) {}

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
					<Button type="button" variant="ghost">
						Cancelar
					</Button>
					<Button type="submit" variant="sucess">
						Salvar
					</Button>
				</DialogFooter>
			</form>
		</DialogContent>
	);
}
