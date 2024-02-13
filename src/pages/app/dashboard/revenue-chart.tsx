import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import colors from 'tailwindcss/colors';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

const data = [
	{ date: '12/02', revenue: 1200 },
	{ date: '13/02', revenue: 457 },
	{ date: '14/02', revenue: 2547 },
	{ date: '15/02', revenue: 1854 },
	{ date: '16/02', revenue: 880 },
	{ date: '17/02', revenue: 860 },
	{ date: '18/02', revenue: 1452 },
];

export function RevenueChart() {
	return (
		<Card className="col-span-6">
			<CardHeader className="flex-row items-center justify-between pb-8">
				<div className="space-y-1">
					<CardTitle className="text-base font-medium">Receita no período</CardTitle>
					<CardDescription>Receita diária no período</CardDescription>
				</div>
			</CardHeader>
			<CardContent>
				<ResponsiveContainer width="100%" height={240}>
					<LineChart data={data} style={{ fontSize: 12 }}>
						<XAxis dataKey="date" axisLine={false} tickLine={false} dy={16} />

						<YAxis
							stroke="#888"
							axisLine={false}
							tickLine={false}
							width={80}
							tickFormatter={(value: number) =>
								value.toLocaleString('pt-BR', {
									style: 'currency',
									currency: 'BRL',
								})
							}
						/>

						<CartesianGrid
							vertical={false}
							className="stroke-muted-foreground dark:stroke-muted"
						/>

						<Line type="linear" strokeWidth={2} dataKey="revenue" stroke={colors.violet[500]} />
					</LineChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
}
