import {
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

export function OrderDetails() {
	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Pedido: 13548-adwq5478asd-qw54q65e74</DialogTitle>
				<DialogDescription>Detalhes do pedido</DialogDescription>
			</DialogHeader>

			<div className="space-y-6">
				<Table>
					<TableBody>
						<TableRow>
							<TableCell className="text-muted-foreground">Status</TableCell>
							<TableCell className="flex justify-end">
								<div className="flex items-center gap-2">
									<span className="h-2 w-2 rounded-full bg-slate-400" />
									<span className="font-medium text-muted-foreground">Pendente</span>
								</div>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="text-muted-foreground">Cliente</TableCell>
							<TableCell className="flex justify-end">Mathews Araújo</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="text-muted-foreground">Telefone</TableCell>
							<TableCell className="flex justify-end">(92) 988889898</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="text-muted-foreground">E-mail</TableCell>
							<TableCell className="flex justify-end">mathews.mw@gmail.com</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="text-muted-foreground">Realizado</TableCell>
							<TableCell className="flex justify-end">há 15 minutos</TableCell>
						</TableRow>
					</TableBody>
				</Table>

				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Produto</TableHead>
							<TableHead className="text-right">Qtd.</TableHead>
							<TableHead className="text-right">Preço</TableHead>
							<TableHead className="text-right">Subtotal</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell>Pizza Portuguesa Família</TableCell>
							<TableCell className="text-right">2</TableCell>
							<TableCell className="text-right">R$ 69,90</TableCell>
							<TableCell className="text-right">R$ 139,80</TableCell>
						</TableRow>
					</TableBody>
					<TableFooter>
						<TableCell colSpan={3}>Total do pedido</TableCell>
						<TableCell className="text-right font-medium">R$ 139,80</TableCell>
					</TableFooter>
				</Table>
			</div>
		</DialogContent>
	);
}
