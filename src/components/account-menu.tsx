import { useMutation, useQuery } from '@tanstack/react-query';
import { Building, ChevronDown, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { getManagerRestaurant } from '@/api/get-manager-restaurant';
import { getProfile } from '@/api/get-profile';
import { signOut } from '@/api/sign-out';

import { StoreProfileDialog } from './store-profile-dialog';
import { Button } from './ui/button';
import { Dialog, DialogTrigger } from './ui/dialog';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Skeleton } from './ui/skeleton';

export function AccountMenu() {
	const navigate = useNavigate();

	const { data: profile, isLoading: isLoadingProfile } = useQuery({
		queryKey: ['profile'],
		queryFn: getProfile,
		staleTime: Infinity,
	});

	const { data: managerProfile, isLoading: isLoadingManagerProfile } = useQuery({
		queryKey: ['manager-profile'],
		queryFn: getManagerRestaurant,
		staleTime: Infinity,
	});

	const { mutateAsync: signOutFn, isPending: isPendingSignOut } = useMutation({
		mutationFn: signOut,
		onSuccess: () => {
			navigate('/sign-in', { replace: true }); // Quando o usuário for redirecionado para a rota de sign-in, isso fará com que a rota atual seja substuida e não adicionada uma nova no histórico. Assim, o usuário não conseguirá voltar para a página anterior mesmo que ele aperte no botão de voltar do navegador.
		},
	});

	return (
		<Dialog>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" className="flex select-none items-center gap-2">
						{isLoadingManagerProfile ? <Skeleton className="h-4 w-40" /> : managerProfile?.name}
						<ChevronDown className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent align="end" className="w-56">
					<DropdownMenuLabel className="flex flex-col">
						{isLoadingProfile ? (
							<div className="space-y-1.5">
								<Skeleton className="h-4 w-32" />
								<Skeleton className="h-3 w-24" />
							</div>
						) : (
							<>
								<span>{profile?.name}</span>
								<span>{profile?.email}</span>
							</>
						)}
					</DropdownMenuLabel>

					<DropdownMenuSeparator />

					<DialogTrigger asChild>
						<DropdownMenuItem>
							<Building className="mr-2 h-4 w-4" />
							<span>Perfil da loja</span>
						</DropdownMenuItem>
					</DialogTrigger>
					<DropdownMenuItem
						asChild
						className="text-rose-500 dark:text-rose-400"
						disabled={isPendingSignOut}
					>
						<button onClick={() => signOutFn()} className="w-full">
							<LogOut className="mr-2 h-4 w-4" />
							<span>Sair</span>
						</button>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<StoreProfileDialog />
		</Dialog>
	);
}
