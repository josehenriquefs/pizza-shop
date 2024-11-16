import { api } from "@/lib/axios";

export interface GetDailyRevenueInPeriodQuery {
  from?: Date;
  to?: Date;
}

export type GetDailyRevenueInPeriodResponse = {
  date: string;
  receipt: number;
}[];

export async function getDailyRevenueInPeriod(
  params?: GetDailyRevenueInPeriodQuery,
) {
  const response = await api.get<GetDailyRevenueInPeriodResponse>(
    `/metrics/daily-receipt-in-period`,
    {
      params,
    },
  );

  return response.data;
}
