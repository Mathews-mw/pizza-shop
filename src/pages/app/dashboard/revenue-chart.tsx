import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';
import { useMemo, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import colors from 'tailwindcss/colors';

import { getDailyRevenuePeriod } from '@/api/get-daily-revenue-period';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { DateRangePincker } from '@/components/ui/date-ranger-picker';
import { Label } from '@/components/ui/label';

export function RevenueChart() {
	const [dateRange, setDateRange] = useState<DateRange | undefined>({
		from: subDays(new Date(), 7),
		to: new Date(),
	});

	const { data: dailyRevenue } = useQuery({
		queryKey: ['metrics', 'daily-revenue-period', dateRange],
		queryFn: () =>
			getDailyRevenuePeriod({
				from: dateRange?.from,
				to: dateRange?.to,
			}),
	});

	const chartData = useMemo(() => {
		return dailyRevenue?.map((item) => {
			return {
				date: item.date,
				receipt: item.receipt / 100,
			};
		});
	}, [dailyRevenue]);

	return (
		<Card className="col-span-6">
			<CardHeader className="flex-row items-center justify-between pb-8">
				<div className="space-y-1">
					<CardTitle className="text-base font-medium">Receita no período</CardTitle>
					<CardDescription>Receita diária no período</CardDescription>
				</div>

				<div className="flex items-center gap-3">
					<Label>Período</Label>
					<DateRangePincker date={dateRange} onDateChange={setDateRange} />
				</div>
			</CardHeader>
			<CardContent>
				{chartData && (
					<ResponsiveContainer width="100%" height={240}>
						<LineChart data={chartData} style={{ fontSize: 12 }}>
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

							<Line
								type="linear"
								strokeWidth={2}
								dataKey="receipt"
								stroke={colors.violet[500]}
							/>
						</LineChart>
					</ResponsiveContainer>
				)}
			</CardContent>
		</Card>
	);
}
